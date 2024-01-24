const { useState, useEffect } = require('react');
// import Link from 'next/link'
import { useRouter } from 'next/router'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { MailIcon } from './MailIcon.js';
import { LockIcon } from './LockIcon.js';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sectionWidth, setSectionWidth] = useState(30);
  const [errorMessage, setErrorMessage] = useState("");
  const [blur, setBlur] = useState("");
  const router = useRouter();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    setBlurFunc();
    window.addEventListener("resize", setBlurFunc());
  }, []);

  const setBlurFunc = () => {
    let txtBlur = "";
    if (innerWidth > 500) {
      txtBlur = 'blur'
    }
    setBlur(txtBlur);
  }

  const SubmitHandler = async () => {
    // e.preventDefault();

    try {
      let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
      //Se muestra un texto a modo de ejemplo, luego va a ser un icono
      if (email == "" || password == "") {
        throw new Error("El campo de email o contraseña esta vacio.");
      }
      if (!emailRegex.test(email)) {
        throw new Error("El email ingresado, no tiene formato de email");
      }
      else {
        setErrorMessage("")
      }

      let ftch = await fetch(`${location.origin}/api/login?email=${email}&password=${password}`);
      let data = await ftch.json();

      // console.log(data)

      if (ftch.status == 200) {
        // localStorage.setItem('token',data.token)
        // console.log(data);
        router.push('/');
        location.reload(true);
      }
      else {
        setErrorMessage(data.error)
      }
    }
    catch (e) {
      setErrorMessage(e + "")
    }

  }

  return (
    <>
      <Button onClick={onOpen} color="success" variant="ghost">Iniciar Sesion</Button>
      {
        (isOpen) ?
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="bottom-center"
            backdrop={blur}
            scrollBehavior="inside"
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
                      isInvalid={errorMessage != ''}
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
                      isInvalid={errorMessage != ''}
                    />
                    <div className="flex py-2 px-1 justify-between">
                      <Link color="primary" href={location.origin + "/forgotpassword"} size="sm">
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>
                    <div style={{ color: 'red' }}>{errorMessage}</div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={() => {
                      onClose();
                      setEmail('');
                      setPassword('');
                      setErrorMessage('');
                    }}>
                      Cerrar
                    </Button>
                    <Button color="success" onPress={() => {
                      onClose;
                      SubmitHandler();
                    }}>
                      Iniciar Sesion
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
          :
          <></>
      }
    </>
  );
}
module.exports = Login;