const bcrypt = require('bcryptjs');


export default async function handler(req, res) {
    const { forgot, password, id } = req.query;
    // console.log(password)
    try {
        //hash the password
        const salt = await bcrypt.genSalt(10)
        let passwordHash = await bcrypt.hash(password, salt);

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json")

        let ftch = await fetch("https://prod-02.brazilsouth.logic.azure.com:443/workflows/bcb880fce2314e2493451d95a3d3aea7/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Tlh4ZkXzM5x2VZSeFAHVFNeUW4IpX1rTtV5kP6u2vAc",
            {
                method: "POST",
                body: JSON.stringify({
                    forgot: forgot.includes('true'),
                    id: id,
                    password: passwordHash
                }),
                headers: myHeaders
            });

            let data = await ftch.json();

        res.status(200).json({ success: true});

    } catch (error) {
        console.log(error);
        res.status(200).json({ success: false});
    }

}