import { getFirestore, collection, getDocs, getDoc, addDoc, updateDoc, doc, deleteDoc, query, where } from "firebase/firestore";
import { db, firebase, app } from '../../db/firebase'
import cookie from 'cookie'
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const createToken = (userToken, secretWord, expiresIn) => {
  // console.log(userToken);
  const { id, email, account, name, lastname } = userToken;
  return jwt.sign({ id, email, name, account, lastname }, secretWord, { expiresIn });
}

export default async function handler(req, res) {
  const { email, password } = req.query;
  // console.log(email)
  // console.log(password)

  try {
    let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json")

        let ftch = await fetch("https://prod-22.brazilsouth.logic.azure.com:443/workflows/f42a6067640e408aab78c4fd09204787/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=jLkZClXkvOj41w9pC5N4uePTu_qadmbMtKySKG7gwAc",
            {
                method: "POST",
                body: JSON.stringify({
                    email: email.toLowerCase(),
                    password: password
                }),
                headers: myHeaders
            });

            let data = await ftch.json();
            // console.log(data);
  
    const passwordUser = await bcrypt.compare(password, data.pwd);
    
    if(data.error != ''){
      throw new Error(data.error);
    }

    if (passwordUser) {
      const token = createToken(data, process.env.secretWord, '24h');
      res.status(200).setHeader('Set-Cookie',cookie.serialize('Token',token,{
        httpOnly:true,
        secure: process.env.MODE == 'prod',
        maxAge: 60*60,
        sameSite:'strict',
        path:'/'
      })).json({ token:  token, success: data.status})
      // res.status(200).json(userList)
    }
    else {
      res.status(400).json({ error: "La contraseña es incorrecta" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

}