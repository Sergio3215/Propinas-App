export default async function handler(req, res) {

    const { value, accountId } = req.body;

    const { name, method, lastname } = req.query;

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const ftch = await fetch('https://prod-01.brazilsouth.logic.azure.com:443/workflows/a73296064fd047fd815ab2d516e84d01/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=UKQNRPOfA3q9pIlYKcd9DtcUqwECVlv6aA-vsFEBkOk',
        {
            method: "POST",
            body: JSON.stringify({
                accountId: accountId,
                value: value,
                lastNameColaborator: lastname,
                nameColaborator: name,
                payMethod: method
            }),
            headers: myHeaders
        })
    const data = await ftch.json();

    res.json({ status: true });
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
