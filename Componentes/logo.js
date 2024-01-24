import React, { useEffect, useState } from "react";
import { Image } from "@nextui-org/react";
export const Logo = () => {

  const [urlOrigin, setUrlOrigin] = useState("");

  useEffect(() => {
    setUrlOrigin(location.origin+"/logo.png")
  }, [])

  return (
    <Image alt={"Propinas App Logo"} width={"50px"} height={"50px"} style={{ marginRight: 20 + "px" }} src="/logo.svg" />
  );
}
