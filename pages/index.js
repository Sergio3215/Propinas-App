import Navigator from "../Componentes/Navigator";
import { useEffect, useState } from 'react';
import { Card, CardBody, CardFooter, Image, Link } from "@nextui-org/react";
import NoImage from "../Componentes/noImage";
import LoadSpinner from "../Componentes/Spinner";

export default function App() {

    const [height, setHeight] = useState(0);
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(false);

    const getAllUser = async () => {
        setLoad(true);
        const ftch = await fetch("/api/getAllUsers");
        const res = await ftch.json();

        let data = res.list;

        setData(data);
        setLoad(false);

    }

    useEffect(() => {
        setHeight(innerHeight);
        window.addEventListener('resize', () => {
            setHeight(innerHeight);
        })
        getAllUser();
    }, []);


    return (
        <>
            <div> <Navigator /> </div>

            <div style={
                {
                    height: height - 65,
                    color: 'white',
                    // display: 'flex',
                    // flexDirection: 'column',
                    // flexWrap: 'nowrap',
                }
            }>
                {
                    (load) ?
                        <div style={
                            {
                                height: height - 65,
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
                                data.map((dt, index) => {
                                    return (
                                        <>
                                            <Link href={location.origin + "/" + dt.nameSite} className="mr-2 ml-4 mt-4 mb-2">
                                                <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}
                                                    style={{
                                                        width: "200px",
                                                    }}
                                                >
                                                    <CardBody className="overflow-visible p-0">
                                                        {
                                                            (dt.image != "") ?
                                                                <Image
                                                                    shadow="sm"
                                                                    radius="lg"
                                                                    width="100%"
                                                                    alt={dt.nameSite}
                                                                    className="w-full object-cover h-[140px]"
                                                                    src={dt.image}
                                                                    height={"100px"}
                                                                    style={{
                                                                        width: "200px",
                                                                        height: "206px"
                                                                    }}
                                                                />
                                                                :
                                                                <>
                                                                    <NoImage
                                                                        height={"100px"}
                                                                        style={{
                                                                            width: "200px",
                                                                        }}
                                                                        alt={dt.nameSite} />
                                                                </>
                                                        }
                                                    </CardBody>
                                                    <CardFooter className="text-small justify-between text-center">
                                                        <b>{dt.nameSite}</b>

                                                    </CardFooter>
                                                </Card>
                                            </Link>
                                        </>
                                    )
                                })
                            }
                        </>
                }

            </div>
        </>
    );
}