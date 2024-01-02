import cookie from 'cookie'
const jwt = require('jsonwebtoken');

const createToken = (userToken, secretWord, expiresIn) => {
    // console.log(userToken);
    const { id, email, account, name, lastname } = userToken;
    // console.log(email);
    return jwt.sign({ id, email, name, account, lastname }, secretWord, { expiresIn });
  }
  
export default async function handler(req, res) {

    const { name, account, sitioname, lastname, id, email } = req.query;

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const ftch = await fetch("https://prod-30.brazilsouth.logic.azure.com:443/workflows/6f3e56ee6f3e43b5bb454621bf93961b/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=xpLfVK0e7kzGdjg5xHK2_UwIrF60eqKu3XEhpz-XksQ",
        {
            method: "POST",
            body: JSON.stringify({
                account: account,
                name: name,
                lastname: lastname,
                name_site: sitioname,
                id_account: id
            }),
            headers: myHeaders
        });
    const data = await ftch.json();

    const dt = {
        id: id,
        name: name,
        account: account,
        lastname: lastname,
        email:email
    }

    const token = createToken(dt, process.env.secretWord, '24h');
    res.status(200).setHeader('Set-Cookie', cookie.serialize('Token', token, {
        httpOnly: true,
        secure: process.env.MODE == 'prod',
        maxAge: 60 * 60,
        sameSite: 'strict',
        path: '/'
    })).json({ token: token, success: true });

    // res.json({success:true});
}