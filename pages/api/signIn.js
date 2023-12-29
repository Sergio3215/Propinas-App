import { getFirestore, collection, getDocs, getDoc, addDoc, updateDoc, doc, deleteDoc, query, where } from "firebase/firestore";
import { db, firebase, app } from '../../db/firebase'
const bcrypt = require('bcryptjs');


export default async function handler(req, res) {
    const { email, password, account, name, lastname, sitioname } = req.query;
    // console.log(password)
    try {
        //hash the password
        const salt = await bcrypt.genSalt(10);
        let passwordHash = await bcrypt.hash(password, salt);

        
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json")

        let ftch = await fetch("https://prod-08.brazilsouth.logic.azure.com:443/workflows/d712c8d5b02e46e7870bc2f699a85821/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Cmfgr2XSSlwKLTVugiHeEJCndEda9IN9TFy28WSzgTs",
            {
                method: "POST",
                body: JSON.stringify({
                    account: account,
                    email: email.toLowerCase(),
                    password: passwordHash,
                    name: name,
                    lastname: lastname,
                    sitio_name: sitioname
                }),
                headers: myHeaders
            });

            let data = await ftch.json();

            // .then(res => res.json())
            // .then(data =>{ 
            //     console.log(data)
            // })

        res.status(200).json({ success: data.status, error: data.error});

    } catch (error) {
        res.status(200).json({ success: false, error: error + "" });
    }

}