import { useEffect, useState } from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import CreateColaborator from "./CreateColaborator";
import LoadSpinner from "./Spinner";

export default function BodySiteName({ idAccount, idSite }) {


    const [data, setData] = useState([]);
    const [load, setLoad] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const getData = async () => {

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let ftc = await fetch("https://prod-21.brazilsouth.logic.azure.com:443/workflows/6f8e7492709049188415b0af2d22f33f/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=DdTRr7bx_LnpNRBFxmjq1u853P2avDnPGcOdI7meuys",
            {
                method: "POST",
                body: JSON.stringify({
                    id: idSite
                }),
                headers: myHeaders
            });

        let res = await ftc.json();


        if (res.list != "[]") {
            console.log(res.list);

            res.list = JSON.parse(res.list);

            console.log(res.list);

            setData(res.list);
        }

        setLoad(false);
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
            // console.log(idAccount, idSite);
            getData();
        }

    }, [idAccount]);


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

                        <Button onPress={onOpen} shadow color="secondary" className="max-w-fit">Crear Colaborador</Button>
                        {
                            (data.length == 0) ?
                                <div className="flex justify-center">
                                    <h1>No hay colaborador agregado</h1>
                                </div>
                                :
                                <>
                                    {
                                        data.map(dt => {
                                            return (
                                                <div>
                                                    {dt.name}
                                                </div>
                                            )
                                        })
                                    }
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