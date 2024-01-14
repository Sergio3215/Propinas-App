import cookie from 'cookie';
const jwt = require('jsonwebtoken');

export default async function handler (req, res) {
    const token = req.cookies.Token

    try{
        // const tokenVerify = jwt.verify(token, process.env.secretWord);
    
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json")
        const ftch = await fetch('https://prod-27.brazilsouth.logic.azure.com:443/workflows/c476291928f6487c981b1a08285ddcc4/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=18_osx9vOfxLZNt1r0Z2Tk-VfDXHtPn4FWgnYtiJig8',
        {
            method: "POST",
            // body: JSON.stringify({
            //     id: tokenVerify.id
            // }),
            headers: myHeaders
        });
    
        const data = await ftch.json();
        
        let myData = JSON.parse(data.list);

    
        res.json({ list:myData})
    }
    catch(err){
        console.log(err);
        res.json({ file:''})
    }
}


export const config = {
    api: {
        bodyParser: {
            sizeLimit: '50mb',
        },
    }
}