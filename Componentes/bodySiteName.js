import { useEffect, useState } from "react";

export default function BodySiteName({idAccount, idSite}){
    

    const [data, setData] = useState([]);

    useEffect(()=>{

        if(idAccount != ''){
            console.log(idAccount, idSite);
        }

    },[idAccount])

    return(
        <>
            
        </>
    )
}