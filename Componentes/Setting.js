import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Image, Input, Avatar } from "@nextui-org/react";
import { useState, useEffect } from "react";
import InputCustomFile from "./inputCustom";

export default function Setting({ isOpen, onOpenChange, profileImage, dataAccount }) {

    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [account, setAccount] = useState("");
    const [nameSite, setNameSite] = useState("");
    const [Id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [myFile, setFile] = useState({});
    const [FileBase, setFileBase] = useState("");


    // const GetImage = () => {
    //     fetch('/api/getImageProfile')
    //       .then(res => res.json())
    //       .then(data => {
    //         // console.log(data.file);
    //         setImage(data.file);
    //         setFileBase(data.file);
    //       })
    //   }

    const getAccount = async () => {
        // const ftch = await fetch('/api/getAccount')
        // const data = await ftch.json();
        // console.log(data)

        // console.log(dataAccount);
        if (dataAccount.dt !== undefined) {
            let data = dataAccount;
            setName(data.dt.name);
            setLastName(data.dt.lastname);
            setAccount(data.dt.account);
            setNameSite(data.nameSite);
            setId(data.dt.id);
            setEmail(data.dt.email);
        }

        // if(data.file !== ""){
        //     setFileBase(data.file);
        //     setImage(data.file);
        // }
    }

    useEffect(() => {
        // GetImage();
        getAccount();
    }, [dataAccount]);

    // console.log(profileImage);

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

    const UpdateAccount = async () => {

        try {
            if (myFile != undefined) {
                let myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                const form = new FormData();
                form.append('my-file', FileBase);

                form.forEach(async function (value, key) {
                    let ftch_1 = await fetch(`/api/updateImage`,
                        {
                            method: "POST",
                            body: JSON.stringify({
                                id: Id,
                                key: key,
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

        let ftch = await fetch('/api/logout');
        let data = await ftch.json();

        let ftch2 = await fetch(`/api/updateAccount?id=${Id}&email=${email}&account=${account}&name=${name}&lastname=${lastName}&sitioname=${nameSite}`);
        let dt = await ftch2.json();

        location.reload(true);
    }

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            scrollBehavior="inside"
            backdrop="blur"

            style={{
                display: "flex",
                alignItems: "center",
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Configuración
                        </ModalHeader>
                        <ModalBody>
                            <Avatar
                                // isBordered
                                // as="button"
                                className="transition-transform"
                                color="secondary"
                                name={name.substring(0, 1).toUpperCase() + lastName.substring(0, 1).toUpperCase()}
                                size="lg"
                                style={{
                                    width: "67%",
                                    height: '187px',
                                    fontSize: "480%",
                                    marginLeft: "45px"
                                }}
                                src={(FileBase == '') ? profileImage : FileBase}
                                id="img---profile"
                            // src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                            />
                            <InputCustomFile
                                type="file"
                                onChange={(e) => {
                                    setFile(e.target.files[0]);
                                    getBase64(e.target.files[0]);
                                }}
                                isInvalid={myFile == undefined}
                                errorMessage={(myFile == undefined) ? "No se cargo la imagen correctamente, vuelva a cargarla otra vez" : ""}
                                name="my-file"
                            />
                            <Input
                                label="Nombre"
                                placeholder="Ingresa tu nombre"
                                type="text"
                                variant="bordered"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                            <Input
                                label="Apellidos"
                                placeholder="Ingresa tu apellido"
                                type="text"
                                variant="bordered"
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}
                            />
                            <Input
                                label="Cuenta"
                                placeholder="Ingresa tu cuenta"
                                type="text"
                                variant="bordered"
                                onChange={(e) => setAccount(e.target.value)}
                                value={account}
                            />
                            <Input
                                label="Nombre Local"
                                placeholder="Ingresa tu nombre del local"
                                type="text"
                                variant="bordered"
                                onChange={(e) => setNameSite(e.target.value)}
                                value={nameSite}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Cancelar
                            </Button>
                            <Button color="success" onPress={() => { onClose(); UpdateAccount(); }}>
                                Guardar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}