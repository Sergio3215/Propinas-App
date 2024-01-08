import {useEffect, useState} from "react";
import {Spinner} from "@nextui-org/react";

export default function LoadSpinner({color}) {

    const [dots,setDots]= useState('');
    const [animation,setAnimation]= useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
          setDots((prevDots) => (prevDots.length < 3 ? prevDots + '.' : ''));
        }, 500);
    
        return () => clearInterval(interval);
      }, []);
       

  return (
    <Spinner label={"Loading"+dots} color={color} size="lg" />
  );
}