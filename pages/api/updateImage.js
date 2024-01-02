export default async function handler(req, res) {

    const {key, value, id} = req.body;

    // console.log(key, value);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const ftch = await fetch('https://prod-04.brazilsouth.logic.azure.com:443/workflows/2d71d72ec51c456aa53349d9e1f457fe/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=6s02zIKTSuDxXZ3qEYWymVp74H_TiIn7K9Nl50kfFCg',
    {
        method: "POST",
        body: JSON.stringify({
            id: id,
            key:key,
            value:value
        }),
        headers: myHeaders
    })
    const data = await ftch.json();

    res.json({status:true});
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
