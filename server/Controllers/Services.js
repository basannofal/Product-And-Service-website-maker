const conn = require("../db/conn")




// ///*******************ADD PRODUCT ************************** */

const AddService =async (req,res) => {
    
    const { serviceName, serviceDesc, catId } = req.body;
    var image = '';
    const checkFile = req.file;
    if (checkFile) {
        image = req.file.filename
    }
    console.log(req.body);
    console.log(image);

    const q = "INSERT INTO service (`serviceName`, `serviceDesc`, `serviceImage`, `catId`) VALUES (?) "

    const data = [
       serviceName,
       serviceDesc,
       image,
       catId
    ]
    conn.query(q, [data], (err, data) => {
        if (err) return res.json({ error: err })
        return res.json(data)
    })
}



// ///*******************ADD PRODUCT ************************** */

const getServices = async(req, res) => {
    const q = 'select * from service';
    conn.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data);
    })
}




/// ************************************* DELETE SERVICE ************

const deleteService = async (req, res) => {
    const id = req.params.obid
    const q = "delete from service where id = ?"

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




/// ************************************* GET CATEGORY ************
const getServiceCategory = async (req, res) => {
    const q = 'select * from service_category';
    conn.query(q, (err, data) => {
        if (err) return res.json(err)
        console.log(data);
        return res.json(data);
    })
}

/// ************************************* DELETE CATEGORY ************
const deleteServiceCategory = async (req, res) => {
    const id = req.params.id
    const q = "delete from service_category where id = ?"

    conn.query(q, [id], (err, data) => {
        if (err) return res.json({ error: 1 })
        return res.json(data)
    })
}

/// ************************************* ADD CATEGORY ************

const addServiceCategory = async (req, res) => {
    console.log("REACHED");
    const q = "insert into service_category (`categoryName`, `categoryDesc`, `metaDesc`, `metaTag`) values (?)";

    const values = [
        req.body.categoryName,
        req.body.categoryDesc,
        req.body.categoryMetaDesc,
        req.body.categoryMetaTag,
    ]

    conn.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
}

module.exports = {AddService, getServices, deleteService, getperservice, updateService, getServiceCategory, deleteServiceCategory, addServiceCategory}
