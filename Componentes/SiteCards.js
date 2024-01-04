import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import { useState, useEffect } from "react";

export default function SiteCard () {

    const [list, setList] = useState([]);

    const GetImage = () => {
        fetch('/api/getImageProfile')
          .then(res => res.json())
          .then(data => {
            // console.log(data.file);
            setImage(data.file);
            setFileBase(data.file);
          })
      }

    const getAccount = async () => {
        const ftch = await fetch('/api/getAccount')
        const data = await ftch.json();
        // console.log(data)
        setName(data.dt.name);
        setLastName(data.dt.lastname);
        setAccount(data.dt.account);
        setNameSite(data.nameSite);
        setId(data.dt.id);
        setEmail(data.dt.email);
    }

    useEffect(() =>{

    },[])

    return (
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
          {list.map((item, index) => (
            <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={item.title}
                  className="w-full object-cover h-[140px]"
                  src={item.img}
                />
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>{item.title}</b>
              </CardFooter>
            </Card>
          ))}
        </div>
      );
}