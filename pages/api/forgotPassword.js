export default async function (req, res) {

    const { email, originURL } = req.query;
    // console.log(email, originURL);
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json")
    const ftch = await fetch("https://prod-07.brazilsouth.logic.azure.com:443/workflows/a396d2b0049e4840a845a227b602fdd6/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=PA3qBzcqoLsdcSoK2ajJGFrZHRxh4lOeChBo6fFyQUc",
        {
            method: "POST",
            body: JSON.stringify({
                email: email,
                url: originURL,
                due_date: new Date()
            }),
            headers: myHeaders
        });
    const dt = await ftch.json();

    res.json({ dt: dt });
}