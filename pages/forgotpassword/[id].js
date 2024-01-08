import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navigator from "../../Componentes/Navigator";
import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Input } from "@nextui-org/react";
import ImageSuccess from "../../Componentes/imageSuccess";
import LoadSpinner from "../../Componentes/Spinner";

export default function ForgotByID() {

    const [check, setCheck] = useState('');
    const [height, setHeight] = useState(0);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [changeSuccess, setChangeSuccess] = useState(false);
    const [load, setLoad] = useState(false);

    const router = useRouter();

    const { id } = router.query;

    const checkForgotId = async () => {
        
        setLoad(true);
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json")

        const ftch = await fetch("https://prod-09.brazilsouth.logic.azure.com:443/workflows/ec499155f6b3400f99caec85d9ed0daf/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=xF4nd38KsDW9v53fYV172QBF1Uvsj_BME2C1ARSHwlM",
            {
                method: "POST",
                body: JSON.stringify({
                    id: id
                }),
                headers: myHeaders
            }
        );

        const data = await ftch.json();

        console.log(data);

        setCheck(data.status)
        
        setTimeout(() => {
            setLoad(false);
        }, 2000);
    }

    useEffect(() => {
        setHeight(innerHeight);
        window.addEventListener('resize', () => {
            setHeight(innerHeight);
        })
    }, []);

    useEffect(() => {
        checkForgotId();
    }, [router]);

    const setPassword = async () => {
        
        setLoad(true);

        let errorMSG = ''


        try {

            let passworCharSpecial = false;
            let uppercase = false;

            newPassword.split('').map(charSpe => {
                if (charSpe == '@' || charSpe == '?' || charSpe == '!' || charSpe == '-' || charSpe == '_') {
                    passworCharSpecial = true;
                }

                if (newPassword[0]) {
                    uppercase = true;
                }

                try {
                    let numtest = parseInt(charSpe);
                    number = true;
                } catch (error) {

                }
            })

            if (newPassword.length < 6 || !passworCharSpecial || !uppercase) {
                throw new Error("La contraseña tiene que tener mas de 6 caracteres e incluir mayuscula y caracteres especiales como: @ ? ! - _");
            }

            const ftch = await fetch(`${location.origin}/api/ChangePassword?id=${id}&password=${newPassword}&forgot=${true}`);
            const data = await ftch.json();
            
            setLoad(false);

            setChangeSuccess(data.success);

            setTimeout(() => {
                location.href = location.origin;
            }, 2000);
        }
        catch (err) {
            errorMSG = err.message
        }


        setErrorMessage(errorMSG);
    }


    const Style = {
        input: {
            fontSize: "14px"
        }
    }

    return (
        <>
            {/* <div>
                <Navigator />
            </div> */}
            {
                (!load) ?
                    (check) ?
                        (!changeSuccess) ?
                            <div style={
                                {
                                    height: height,
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
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            type="password" label="Contraseña Nueva"
                                            style={
                                                Style.input
                                            }
                                            errorMessage={errorMessage}
                                        />
                                        <Input
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            type="password" label="Repetir Contraseña"
                                            className="mt-5"
                                            style={
                                                Style.input
                                            }
                                        />
                                    </CardBody>
                                    <Divider />
                                    <CardFooter style={{ display: "block" }}>
                                        <div style={{
                                            fontSize: "12px"
                                        }}>
                                            <b style={{ color: "red" }}>*</b>
                                            <b>Se habilitara el boton si ambas contraseñas son iguales</b>
                                        </div>
                                        {
                                            (newPassword == "" && confirmPassword == "") ?
                                                <Button color="default" isDisabled >
                                                    Cambiar Contraseña
                                                </Button>
                                                :
                                                (newPassword == confirmPassword) ?

                                                    <Button color="default" onPress={() => { setPassword(); }}>
                                                        Cambiar Contraseña
                                                    </Button>
                                                    :
                                                    <Button color="default" isDisabled >
                                                        Cambiar Contraseña
                                                    </Button>
                                        }
                                    </CardFooter>
                                </Card>
                            </div>
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
                                        Se ha cambiado la contraseña exitosamente!
                                    </CardBody>
                                    <CardFooter>
                                    </CardFooter>
                                </Card>
                            </div>
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
                                <CardHeader className="flex gap-3">
                                    <div className="flex flex-col">
                                        <p className="text-md">Recuperacion de Contraseña</p>
                                    </div>
                                </CardHeader>
                                <Divider />
                                <CardBody>
                                    Se ha vencido el tiempo de recuperacion o el link es invalido.
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