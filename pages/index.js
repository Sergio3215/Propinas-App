import Navigator from "../Componentes/Navigator";
import{useEffect, useState} from 'react';

export default function App(){

    const [height, setHeight] = useState(0)

    useEffect(() => {
        setHeight(innerHeight);
        window.addEventListener('resize', () => {
            setHeight(innerHeight);
        })
    }, []);


    return(
        <>
            <div> <Navigator/> </div>
            <div style={
                {
                    height: height - 65
                }
            }>
                Hola
            </div>
        </>
    );
}