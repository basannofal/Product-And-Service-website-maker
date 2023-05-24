const conn = require("../db/conn")


const login = async(req,res) => {
    const email = req.body.r_email;
    const password = req.body.r_password;

    const q = "select * from admin where adminEmail = ? and password = ?";
    conn.query(q,[email,password], (err, data) => {
        if(err){
            res.send(err);
        }

        if(data.length > 0){
            res.send(data);
        }else{
            res.send({ message: "Wrong email / password !" });
        }
    })

}



const adminData = (req,res) => {
    const id = req.params.id;
    const q = 'select * from admin where id = ?';
    conn.query(q, [id], (err,data) => {
        if(err) return res.json(err)
        return res.json(data);
    })
}

module.exports = {login, adminData}