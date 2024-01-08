import cookie from 'cookie';
const jwt = require('jsonwebtoken');

export default async function handler (req, res) {
    const token = req.cookies.Token

    try{
        const tokenVerify = jwt.verify(token, process.env.secretWord);
    
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json")
        const ftch = await fetch('https://prod-29.brazilsouth.logic.azure.com:443/workflows/e4dc9d1d9a06407e8bcd409e2883c9c9/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=hAzn9jRuA94czqqTH9q_C0JDzVVTzu9jiKn6eqpSgD0',
        {
            method: "POST",
            body: JSON.stringify({
                id: tokenVerify.id
            }),
            headers: myHeaders
        });
    
        const data = await ftch.json();
    
        res.json({ file:data.file})
    }
    catch(err){
        res.json({ file:''})
    }
}


export const config = {
    api: {
        bodyParser: {
            sizeLimit: '21mb',
        },
    },
    // Specifies the maximum allowed duration for this function to execute (in seconds)
    maxDuration: 5,
}