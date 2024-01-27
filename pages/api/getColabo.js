
export default async function handler(req, res) {

    const {idSite} = req.query;

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let ftc = await fetch("https://prod-21.brazilsouth.logic.azure.com:443/workflows/6f8e7492709049188415b0af2d22f33f/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=DdTRr7bx_LnpNRBFxmjq1u853P2avDnPGcOdI7meuys",
        {
            method: "POST",
            body: JSON.stringify({
                id: idSite
            }),
            headers: myHeaders
        });

    let data = await ftc.json();
    // console.log(data);

    res.json({list: data.list})
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1000mb',
        },
    },
    // Specifies the maximum allowed duration for this function to execute (in seconds)
    maxDuration: 5,
}