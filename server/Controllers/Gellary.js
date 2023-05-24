const conn = require("../db/conn")




// ///*******************ADD IMAGE ************************** */

const AddImage =async (req,res) => {
    console.log("REched");
    const { imgAlt, imgDesc, } = req.body;
    var image = '';
    const checkFile = req.file;
    if (checkFile) {
        image = req.file.filename
    }
    console.log(req.body);
    console.log(image);

    const q = "INSERT INTO gellary (`img_path`, `img_alt`, `img_desc`) VALUES (?) "

    const data = [
        image,
        imgAlt,
        imgDesc,
    ]
    conn.query(q, [data], (err, data) => {
        if (err) return res.json({ error: err })
        return res.json(data)
    })
}



// ///*******************GET IMAGES ************************** */

const getGellaryImages = async(req, res) => {
    const q = 'select * from gellary';
    conn.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data);
    })
}




/// ************************************* DELETE SERVICE ************

const deleteGellaryimgae = async (req, res) => {
    const id = req.params.obid
    const q = "delete from gellary where id = ?"

    conn.query(q, [id], (err, data) => {
        if (err) return res.json({ error: 1 })
        return res.json(data)
    })
}

//*****************************GET PER PRODUCT ********************* */

const getperservice = async(req, res) => {
    const id = req.params.id;
    const obid = req.params.obid;
    const q = 'select * from service where id = ?';
    conn.query(q,[obid], (err, data) => {
        if (err) return res.json(err)
        return res.json(data);
    })
}




/// ************************************* UPDATE SERVICE ************

const updateService = async (req, res) => {
    const obid = req.params.obid;
    
    
    
    const { serviceName, serviceDesc } = req.body;
    var image = '';
    const checkFile = req.file;
    if (checkFile) {
        image = req.file.filename
    }
    console.log(req.body);
    console.log(image);


    const q = "UPDATE service SET `serviceName`= ?,`serviceDesc`=?, `serviceImage`=?  WHERE id = ?"

    const data = [
         serviceName,
         serviceDesc,
         image,
         obid
    ]
    conn.query(q, data, (err, data) => {
        if (err) return res.json({ error: err })
        return res.json(data)
    })

}


module.exports = {AddImage, getGellaryImages, deleteGellaryimgae}
