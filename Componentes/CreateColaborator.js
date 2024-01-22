import { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import InputCustomFile from "./inputCustom.jsx";

export default function CreateColaborator({ isOpen, onOpenChange, ResetData, idAccount }) {

    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [method, setMethod] = useState('');
    const [myFile, setFile] = useState({});
    const [FileBase, setFileBase] = useState("");

    const getBase64 = (file) => {
        if (file != undefined) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                setFileBase(reader.result);
            };
            reader.onerror = function (error) {
                // console.log('Error: ', error);
            };
        }
        else {
            setFileBase('');
        }
    }


    const saveImageData = () => {
        try {
            if (myFile != undefined) {
                let myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                const form = new FormData();
                form.append('my-file', FileBase);

                form.forEach(async function (value, key) {
                    let ftch_1 = await fetch(`/api/setDataColaborator?name=${name}&lastname=${lastname}&method=${method}`,
                        {
                            method: "POST",
                            body: JSON.stringify({
                                accountId: idAccount,
                                value: value
                            }),
                            headers: myHeaders
                        });
                    let dt = await ftch_1.json();
                });
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Modal
            isOpen={isOpen}
            placement="bottom-center"
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Agregar Colaborador</ModalHeader>
                        <ModalBody>
                            <div>
                                <Input type="text" label="Nombre" onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div>
                                <Input type="text" label="Apellido" onChange={(e) => setLastName(e.target.value)} />
                            </div>
                            <div>
                                <Input type="text" label="CVU/Alias" onChange={(e) => setMethod(e.target.value)} />
                            </div>
                            <div>
                                <InputCustomFile
                                    label="Imagen"
                                    name="my-file"
                                    isInvalid={myFile == undefined}
                                    errorMessage={(myFile == undefined) ? "No se cargo la imagen correctamente, vuelva a cargarla otra vez" : ""}
                                    onChange={(e) => {
                                        setFile(e.target.files[0]);
                                        getBase64(e.target.files[0]);
                                    }}
                                />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="success" onPress={() => {
                                saveImageData();
                                ResetData();
                                onClose();
                            }} isDisabled={
                                (name != "")?
                                    (lastname != "")?
                                        (method != "")?
                                        myFile == undefined
                                        :
                                        true
                                    :
                                    true
                                :
                                true
                            }>
                                Guardar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}