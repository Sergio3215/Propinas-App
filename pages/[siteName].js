import { useRouter } from "next/router";
import Navigator from "../Componentes/Navigator";
import { useEffect, useState } from "react";

export default function siteName() {

    const [height, setHeight] = useState(0);
    const router = useRouter();

    const { siteName } = router.query;
    
    useEffect(() => {
        setHeight(innerHeight);
        window.addEventListener('resize', () => {
            setHeight(innerHeight);
        })
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
                {siteName}
            </div>
        </>
    )

}