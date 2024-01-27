import { useEffect, useState } from "react";
import { Button, useDisclosure, Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import CreateColaborator from "./CreateColaborator";
import LoadSpinner from "./Spinner";

export default function BodySiteName({ idAccount, idSite }) {


    const [data, setData] = useState([]);
    const [account, setAccount] = useState('');
    const [load, setLoad] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const getData = async () => {

        let ftc = await fetch("/api/getColabo?idSite=" + idSite);

        let res = await ftc.json();

        if (res.list != "[]" && res.list != undefined) {
            // console.log(res.list);

            res.list = JSON.parse(res.list);


            res.list.map(dt => {
                let img = "data:image/jpeg;base64," + dt.Image;
                dt.Image = img;
            })

            // console.log(res.list);

            setData(res.list);
        }

        getUser();
    }

    let getUser = async () => {
        new Promise(resolve => setTimeout(() => {
            let userId = sessionStorage.getItem("idUser");
            // console.log(userId);
            if (userId != null) {
                setAccount(userId);
            }

            setLoad(false);

            resolve();
        }, 1000))
    }

    const ResetData = () => {
        setLoad(true);
        setTimeout(() => {
            getData();
        }, 5000);
    }

    useEffect(() => {

        if (idAccount != '') {
            setLoad(true);
            getData();
        }

    }, [idAccount]);

    useEffect(() => {

    }, []);

    return (
        <>
            {
                (load) ?
                    <div style={
                        {
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
                    :
                    <>
                        {
                            (account != '') ?
                                (account == idAccount) ?
                                    <Button onPress={onOpen} shadow color="secondary"
                                        className="max-w-fit mb-24">
                                        Crear Colaborador
                                    </Button>
                                    :
                                    <></>
                                :
                                <></>
                        }
                        {
                            (data.length == 0) ?
                                <div className="flex justify-center">
                                    <h1>No hay colaborador agregado</h1>
                                </div>
                                :
                                <>
                                    <div className="flex">
                                        {
                                            data.map(dt => {
                                                return (
                                                    <Card className="py-4" style={{
                                                        width: '40%',
                                                        margin:"10px",
                                                        paddingTop: '3px'
                                                    }}>
                                                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                                            {/* <p className="text-tiny uppercase font-bold">Daily Mix</p> */}
                                                            <h4 className="font-bold text-large">{dt.full_name}</h4>
                                                            <small className="text-default-500">CVU/Alias: {dt.method}</small>
                                                        </CardHeader>
                                                        <CardBody className="overflow-visible py-2">
                                                            <Image
                                                                alt={dt.name}
                                                                className="object-cover rounded-xl"
                                                                src={dt.Image}
                                                                width={270}
                                                            />
                                                        </CardBody>
                                                    </Card>
                                                )
                                            })
                                        }
                                    </div>
                                </>
                        }
                        <CreateColaborator
                            isOpen={isOpen} onOpenChange={onOpenChange}
                            ResetData={ResetData} idAccount={idAccount} />
                    </>

            }
        </>
    )
}