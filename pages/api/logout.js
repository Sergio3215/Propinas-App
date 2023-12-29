import cookie from 'cookie';
const jwt = require('jsonwebtoken');

export default async function handler(req, res) {

    try {
        const token = req.cookies.Token
        
        const tokenVerify = jwt.verify(token,process.env.secretWord);

        res.setHeader('Set-Cookie', cookie.serialize('Token', null, {
            httpOnly: true,
            secure: process.env.MODE == 'prod',
            maxAge: 0,
            sameSite: 'strict',
            path: '/'
        }));
        res.status(200).json({success:true})

    } catch (error) {
    }
}