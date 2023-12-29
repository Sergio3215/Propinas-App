const { useState, useEffect } = require('react');
// import Link from 'next/link'
import {useRouter} from 'next/router'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import {MailIcon} from './MailIcon.js';
import {LockIcon} from './LockIcon.js';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [sectionWidth, setSectionWidth] = useState(30);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const SubmitHandler = async() => {
        // e.preventDefault();

        try {
            let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
            //Se muestra un texto a modo de ejemplo, luego va a ser un icono
            if(email == "" || password == ""){
                throw new Error("El campo de email o contraseña esta vacio.");
            }
            if (!emailRegex.test(email)) {
                throw new Error("El email ingresado, no tiene formato de email");
            }
            else{
                setErrorMessage("")
            }

            let ftch = await fetch(`/api/login?email=${email}&password=${password}`);
            let data = await ftch.json();

            console.log(data)

            if(ftch.status == 200){
                // localStorage.setItem('token',data.token)
                // console.log(data);
                router.push('/');
                location.reload(true);
            }
            else{
                setErrorMessage(data.error)
            }
        }
        catch (e) {
            setErrorMessage(e+"")
        }

    }

    return (
        <>
        <Button onPress={onOpen} color="primary">Iniciar Sesion</Button>
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
                    endContent={
                      <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Email"
                    placeholder="Ingresa tu email"
                    variant="bordered"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    endContent={
                      <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Password"
                    placeholder="Ingresa tu contraseña"
                    type="password"
                    variant="bordered"
                    onChange={(e) => setPassword(e.target.value)} 
                  />
                  <div className="flex py-2 px-1 justify-between">
                    <Link color="primary" href="#" size="sm">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                </ModalBody>
                <ModalFooter>
                <div>{errorMessage}</div>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button color="primary" onPress={()=>{onClose;SubmitHandler()}}>
                  Iniciar Sesion
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        </>
    );
}
module.exports = Login;