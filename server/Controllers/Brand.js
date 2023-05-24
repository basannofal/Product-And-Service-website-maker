const conn = require("../db/conn")




const getBrand = async (req, res) => {
    const q = 'select * from brand';
    conn.query(q, (err, data) => {
        if (err) return res.json(err)
        console.log(data);
        return res.json(data);
    })
}





const addBrand = async (req,res) => {
    
    const q = "INSERT INTO brand (`brandName`, `brandDesc`) VALUES (?)";

    const values = [
        req.body.brandName,
        req.body.brandDesc,
    ]

    conn.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
}


///*******************DELETE TTEAM ************************** */
const deleteBrand = async (req, res) => {
        const id = req.params.id
        const q = "delete from brand where id = ?"

        conn.query(q, [id], (err, data) => {
            if (err) return res.json({ error: 1 })
            return res.json(data)
        })
}



module.exports = {addBrand, deleteBrand, getBrand}