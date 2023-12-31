import cookie from 'cookie';
const jwt = require('jsonwebtoken');

export default async function handler(req, res) {
    const token = req.cookies.Token

    try{
        const tokenVerify = jwt.verify(token, process.env.secretWord);
    
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json")
        const ftch = await fetch('https://prod-27.brazilsouth.logic.azure.com:443/workflows/03864385a5cf4040895ff34f80083ec4/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=O6cL7INIsaZ7TIylzyUpTfoAklr0tfBNUCxfIGNYW_E',
        {
            method: "POST",
            body: JSON.stringify({
                id: tokenVerify.id
            }),
            headers: myHeaders
        });
    
        const data = await ftch.json();
        // console.log(data);
        
        let dataInfo = { nameSite: data.sitename, dt: tokenVerify }
        res.json(dataInfo)
    }
    catch(err){
        res.json({ file:'',nameSite: "", dt: [] })
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
