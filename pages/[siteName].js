import { useRouter } from "next/router";
import Navigator from "../Componentes/Navigator";
import { useEffect, useState } from "react";
import { Avatar, Divider, Spacer } from "@nextui-org/react";
import LoadSpinner from "../Componentes/Spinner";
import BodySiteName from "../Componentes/bodySiteName";

export default function siteName() {

    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [dataObj, setDataObj] = useState({});
    const [idAccount, setIdAccount] = useState("");
    const [idSite, setSite] = useState("");
    const [load, setLoad] = useState(false);

    const router = useRouter();

    const { siteName } = router.query;

    useEffect(() => {
        setLoad(true);
        setHeight(innerHeight);
        setWidth(innerWidth);
        window.addEventListener('resize', () => {
            setHeight(innerHeight);
        });
    }, []);

    const getProfile = async () => {

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json")

        const fetchStr = await fetch('https://prod-22.brazilsouth.logic.azure.com:443/workflows/d44fe65e0ec14bfe9fd5773168d242a1/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=IMQ-B6NZYk653rZ97ZKN7ojmE0yV_wTQRnUP4STJZzo',
            {
                method: "POST",
                body: JSON.stringify({
                    name: siteName
                }),
                headers: myHeaders
            });

        const data = await fetchStr.json();

        setSite(data.id_site);

        if (data.id != "") {
            const ftch = await fetch('https://prod-18.brazilsouth.logic.azure.com:443/workflows/6528524e7c7549929f31b9653005494e/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=9RkA6KFqDC9kdXo1FLYW4jWMq8UlL6Dc8lq8ESoqtVA',
                {
                    method: "POST",
                    body: JSON.stringify({
                        id: data.id,
                    }),
                    headers: myHeaders
                });

            const dt = await ftch.json();
            console.log(dt);
            setDataObj(dt);
            setIdAccount(data.id);
        }

        setLoad(false);
    }

    useEffect(() => {
        if (siteName != undefined) {
            console.log(siteName);
            getProfile();
        }
    }, [siteName]);

    return (
        <>
            {
                (load) ?
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
                    :
                    <>
                        <div>
                            <Navigator />
                        </div>

                        <div style={{
                            height: height - 95,
                            color: 'white',
                        }} className=" w-10/12 relative max-w-screen-sm min-w-unit-5xl xlg:left-1/3 md:left-1/4 sm:left-1/4 lmb:left-unit-xl cmb:left-9">
                            <Spacer y="30px" />
                            <div style={{
                                display: 'flex',
                                alignContent: 'center',
                                justifyContent: 'center',
                            }}>
                                <Avatar
                                    // isBordered
                                    // as="button"
                                    className="transition-transform"
                                    color="secondary"
                                    size="lg"
                                    style={{
                                        width: "180px",
                                        height: '180px',
                                        // marginLeft: "145px"
                                    }}
                                    src={(dataObj.image != "") ? dataObj.image : "/No Image Full.png"}
                                    id="img---profile"
                                />
                                <Spacer x="20px" />
                                <div style={{
                                    display: 'flex',
                                    flexDirection: "column",
                                    justifyContent: "center"
                                }}>
                                    {
                                        (siteName != undefined && width <= 500) ?
                                            <>
                                                <div style={{
                                                    fontSize: (siteName.length < 10) ? "25px" : "1.2rem"
                                                }}>
                                                    {
                                                        // dataObj.account
                                                        siteName
                                                    }
                                                </div>
                                                <div style={{
                                                    fontSize: (siteName.length < 10) ? "15px" : "13.5px"
                                                }}>
                                                    {dataObj.name + " " + dataObj.lastname}
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div style={{
                                                    fontSize: "25px"
                                                }}>
                                                    {
                                                        // dataObj.account
                                                        siteName
                                                    }
                                                </div>
                                                <div style={{
                                                    fontSize: "15px"
                                                }}>
                                                    {dataObj.name + " " + dataObj.lastname}
                                                </div>
                                            </>
                                    }
                                </div>
                            </div>
                            <Spacer y="20px" />
                            {/* 416 px */}
                            <div className="">
                                <Divider className="my-4" />
                                <BodySiteName idAccount={idAccount} idSite={idSite} />
                            </div>
                        </div>
                    </>
            }
        </>
    )

}