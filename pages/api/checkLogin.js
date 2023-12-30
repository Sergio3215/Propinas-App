import cookie from 'cookie';
const jwt = require('jsonwebtoken');

export default function handler(req, res) {
    let login = false;
    try{
        const token = req.cookies.Token
            
        const tokenVerify = jwt.verify(token,process.env.secretWord);
        // console.log(tokenVerify);
        login = true;
    }
    catch(e){

    }

    res.json({login:login})
}