import React, { useEffect, useState } from "react";
import { Image } from "@nextui-org/react";
export const Logo = () => {

  const [urlOrigin, setUrlOrigin] = useState("");

  useEffect(()=>{
    setUrlOrigin(location. origin)
  },[])

  return (
    <Image alt={"Propinas App Logo"} width={"50px"} height={"50px"} style={{ marginRight: 20 + "px" }} src={(urlOrigin.includes("localhost"))?"/logo.png":urlOrigin+"/logo.png"} />

    // <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
    //   <path
    //     clipRule="evenodd"
    //     d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
    //     fill="currentColor"
    //     fillRule="evenodd"
    //   />
    // </svg>
  );
}
