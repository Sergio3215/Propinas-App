import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Input } from "@nextui-org/react";
import { useState, useEffect } from "react";
import Navigator from "../../Componentes/Navigator";
import ImageSuccess from "../../Componentes/imageSuccess";
import LoadSpinner from "../../Componentes/Spinner";

export default function ForgotPassword(req, res, next) {

    const [email, setEmail] = useState('');
    const [originURL, setOriginURL] = useState('');
    const [height, setHeight] = useState(0);
    const [sendEmail, setSendEmail] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [load, setLoad] = useState(false);

    useEffect(() => {
        setHeight(innerHeight);
        setOriginURL(location.origin);
        window.addEventListener('resize', () => {
            setHeight(innerHeight);
        })
    }, []);


    const sendEmailChangePassword = async () => {

        let errorMSG = ''


        try {

            setLoad(true)
            const ftch = await fetch(`${location.origin}/api/forgotPassword?email=${email}&originURL=${originURL}`)
            const dt = await ftch.json();
            console.log(dt);

            if (!dt.dt.exist) {
                throw new Error("El email ingresado es incorrecto");
            }

            setSendEmail(dt.dt.exist)

        } catch (error) {
            errorMSG = error.message;
        }
        setErrorMessage(errorMSG);
        
        setLoad(false)
    }


    return (
        <>
            {
                (!load) ?
                    (!sendEmail) ?

                        <>
                            <div>
                                <Navigator />
                            </div>
                            <div style={
                                {
                                    height: height - 65,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: "40px"
                                }
                            }>
                                <Card className="max-w-[900px]">
                                    <CardHeader className="flex gap-3">
                                        <div className="flex flex-col">
                                            <p className="text-md">Recuperacion de Contraseña</p>
                                        </div>
                                    </CardHeader>
                                    <Divider />
                                    <CardBody>
                                        <Input
                                            onChange={(e) => setEmail(e.target.value)}
                                            type="email" label="Email"
                                            errorMessage={errorMessage}
                                            style={
                                                {
                                                    fontSize: "18px"
                                                }
                                            }
                                        />
                                    </CardBody>
                                    <Divider />
                                    <CardFooter>
                                        {
                                            (email == "") ?

                                                <Button color="default" isDisabled>
                                                    Aceptar
                                                </Button>
                                                :

                                                <Button color="default" onPress={() => { sendEmailChangePassword(); }}>
                                                    Aceptar
                                                </Button>
                                        }
                                    </CardFooter>
                                </Card>
                            </div>

                        </>
                        :
                        <div style={
                            {
                                height: height,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: "20px"
                            }
                        }>
                            <Card className="max-w-[900px]">
                                <CardHeader className="flex items-center justify-center">
                                    <ImageSuccess />
                                </CardHeader>
                                {/* <Divider /> */}
                                <CardBody>
                                    Se ha enviado correctamente el Email.
                                </CardBody>
                                <CardFooter>
                                </CardFooter>
                            </Card>
                        </div>
                    :
                    <div style={
                        {
                            height: height,
                            color: 'white',
                            display: 'flex',
                            flexDirection: 'column',
                            flexWrap: 'nowrap',
                            justifyContent: 'center',
                            alignContent: 'center',
                        }
                    }>
                        <LoadSpinner color="danger" />
                    </div>
            }
        </>
    )
}