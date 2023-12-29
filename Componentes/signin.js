const { useState, useEffect } = require('react');
// import Link from 'next/link'
// import Nav from '../component/Navigator'
import { useRouter } from 'next/router'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
// import {MailIcon} from './MailIcon.js';
// import {LockIcon} from './LockIcon.js';

export default function SignIn() {
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [confirmemail, setConfirmEmail] = useState("");
    const [sitioName, setSitioName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        // let title = document.querySelector('head title').innerHTML;
        // document.querySelector('head title').innerHTML = `Registro - ${title}`;
    }, []);


    const SubmitHandler = async () => {

        try {
            let message = "";
            let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
            let passworCharSpecial = false;
            let uppercase = false;
            let number = false

            password.split('').map(charSpe => {
                if (charSpe == '@' || charSpe == '?' || charSpe == '!' || charSpe == '-' || charSpe == '_') {
                    passworCharSpecial = true;
                }

                if (password[0]) {
                    uppercase = true;
                }

                try {
                    let numtest = parseInt(charSpe);
                    number = true;
                } catch (error) {

                }
            })

            if (password.length < 6 || !passworCharSpecial || !uppercase) {
                message += "\n*La contraseña tiene que tener mas de 6 caracteres e incluir mayuscula y caracteres especiales como: @ ? ! - _";
            }

            if (password != confirmpassword) {
                message += "\n*La contraseña no coincide";
            }

            if (email == "") {
                message += "\n*El campo email vacio";
            }

            if (confirmemail == "") {
                message += "\n*El campo confirmar email vacio";
            }

            if (!emailRegex.test(email)) {
                message += "\n*El email ingresado, no tiene formato de email";
            }

            if (!emailRegex.test(confirmemail)) {
                message += "\n*El email de confirmacion ingresado, no tiene formato de email";
            }

            if (email != confirmemail) {
                message += "\n*El email no coincide";
            }

            if (name == "") {
                message += "\n*El Nombre no esta ingresado";
            }

            if (lastname == "") {
                message += "\n*El Apellido no esta ingresado";
            }

            if (account == "") {
                message += "\n*El Nombre de usuario no esta ingresado";
            }

            if (message != "") {
                throw new Error(message)
            }
            else {
                setErrorMessage("")
            }

            const ftch = await fetch(`/api/signIn?email=${email}&password=${password}&name=${name}&account=${account}&lastname=${lastname}&sitioname=${sitioName}`);
            const data = await ftch.json();

            if (data.success) {
                router.push('/')
            }
            else {
                message = data.error;
            }

            if (message != "") {
                throw new Error(message)
            }
            else {
                setErrorMessage("")
            }

        } catch (error) {
            console.log(error)
            setErrorMessage(error)
        }
    }
    // console.log(errorMessage)
    return (
        <>
            <Button onPress={onOpen} color="primary">Registrarse</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    label="Nombre"
                                    placeholder="Ingresa tu Nombre"
                                    variant="bordered"
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <Input
                                    label="Apellido"
                                    placeholder="Ingresa tu Apellido"
                                    variant="bordered"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                <Input
                                    label="Cuenta"
                                    placeholder="Ingresa tu Cuenta"
                                    variant="bordered"
                                    onChange={(e) => setAccount(e.target.value)}
                                />
                                <Input
                                    label="Contraseña"
                                    placeholder="Ingresa tu contraseña"
                                    variant="bordered"
                                    type='password'
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <label style={{ marginTop: "-10px" }}>6 caracteres o mas, incluir mayuscula y caracteres especiales @ ? ! - _</label>
                                <Input
                                    label="Confirmar Contraseña"
                                    placeholder="Ingresa tu contraseña de nuevo"
                                    variant="bordered"
                                    type='password'
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <Input
                                    label="Email"
                                    placeholder="Ingresa tu email"
                                    variant="bordered"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Input
                                    label="Confirmar Email"
                                    placeholder="Ingresa tu email de nuevo"
                                    variant="bordered"
                                    onChange={(e) => setConfirmEmail(e.target.value)} 
                                />
                                <Input
                                    label="Nombre del Sitio"
                                    placeholder="Ingresa tu nombre del sitio"
                                    variant="bordered"
                                    onChange={(e) => setSitioName(e.target.value)} 
                                />
                            </ModalBody>
                            <ModalFooter>
                                <>{(errorMessage.message != undefined) ? errorMessage.message.split('\n').map(msg => <div key="1">{msg}</div>) : <></>}</>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={()=>{onClose;SubmitHandler()}}>
                                    Registrarse
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
module.exports = SignIn;