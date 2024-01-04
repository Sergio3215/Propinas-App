import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Input } from "@nextui-org/react";
import { useState, useEffect } from "react";
import Navigator from "../Componentes/Navigator";

export default function ForgotPassword() {

    const [email, setEmail] = useState('');
    const [height, setHeight] = useState(0);

    useEffect(() => {
        setHeight(innerHeight);
        window.addEventListener('resize', () => {
            setHeight(innerHeight);
        })
    }, []);


    const sendEmailChangePassword = ()=>{
        
    }


    return (
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
                    fontSize:"40px"
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
                            style={
                                {
                                    fontSize:"18px"
                                }
                            }
                        />
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <Button color="default"onPress={()=>sendEmailChangePassword()}>
                            Aceptar
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}