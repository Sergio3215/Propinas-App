import { Image } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function NoImage({ alt }) {

    const [imageNo, setImageNo] = useState('');

    useEffect(() => {
        let origin = window.location.origin+"/No Image.png" ;
        setImageNo(origin)
    }, [])

    return (
        <>
            <Image alt={alt} height={"150px"} width={"200px"} src={imageNo} />
        </>
    )
}