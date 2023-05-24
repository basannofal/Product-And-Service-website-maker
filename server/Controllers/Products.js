const conn = require("../db/conn")
const multer = require("multer");

var imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, `image-${Date.now()}.${file.originalname}`);
    },
});


var upload = multer({
    storage: imgconfig,
});







const getCategory = async (req, res) => {
    const q = 'select * from category';
    conn.query(q, (err, data) => {
        if (err) return res.json(err)
        console.log(data);
        return res.json(data);
    })
}

const addCategory = async (req, res) => {
    const q = "insert into category (`categoryTitle`, `categoryDesc`) values (?)";

    const values = [
        req.body.categoryName,
        req.body.categoryDesc,
    ]

    conn.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
}


///*******************DELETE TTEAM ************************** */
const deleteCategory = async (req, res) => {
    const id = req.params.id
    const q = "delete from category where id = ?"

    conn.query(q, [id], (err, data) => {
        if (err) return res.json({ error: 1 })
        return res.json(data)
    })
}


// ///*******************ADD PRODUCT ************************** */
// const addProduct = async (req, res) => {

//     const { productName, productDesc, productRealPrice, productSellPrice, productDate, cid } = req.body;
//     var image = '';
//     const checkFile = req.file;
//     if (checkFile) {
//         image = req.file.filename
//     }
//     console.log(req.body);
//     console.log(image);

//     const q = "INSERT INTO product (`productName`, `productDesc`, `productRealPrice`, `productSellPrice`, `productDate`, `productPhoto`, `catId`) VALUES (?) "

//     const data = [
//          productName,
//          productDesc,
//          productRealPrice,
//          productSellPrice,
//          productDate,
//          image,
//          cid,
//     ]
//     conn.query(q, [data], (err, data) => {
//         if (err) return res.json({ error: err })
//         return res.json(data)
//     })
// }



///*******************ADD PRODUCT ************************** */
const addProduct = async (req, res) => {

    const { productName, productDesc, productRealPrice, productSellPrice, productMetaDesc,productMetaTag,bid, cid } = req.body;


    // var image = '';
    // const checkFile = req.file;
    // if (checkFile) {
    //     image = req.file.filename
    // }
    console.log(req.body);

    let arr = req.files;
    let imageArr = [];
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i].filename);
        imageArr = [...imageArr, arr[i].filename]
    }
    console.log(imageArr);
    imageArr = JSON.stringify(imageArr);
    console.log(imageArr);

    var p_date = new Date()
    var day = ("0" + p_date.getDate()).slice(-2);
    var month = ("0" + (p_date.getMonth() + 1)).slice(-2);
    var year = p_date.getFullYear();
    var date = year + "-" + month + "-" + day;

    console.log(date);

    const q = "INSERT INTO product (`productName`, `productDesc`, `productRealPrice`, `productSellPrice`, `productDate`, `productPhoto`, `productMetaDesc`, `productMetaTag`, `branId`, `catId`) VALUES (?) "

    const data = [
        productName,
        productDesc,
        productRealPrice,
        productSellPrice,
        date,
        imageArr,
        productMetaDesc,
        productMetaTag,
        bid,
        cid,
    ]
    conn.query(q, [data], (err, data) => {
        if (err) return res.json({ error: err })
        return res.json(data)
    })
}


//****************************GET PRODUCTS ************** */

const getProduct = async (req, res) => {
    const q = 'select * from product';
    conn.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data);
    })
}




/// ************************************* DELETE PRODUCT ************

const deleteproduct = async (req, res) => {
    const id = req.params.id
    const q = "delete from product where id = ?"

    conn.query(q, [id], (err, data) => {
        if (err) return res.json({ error: 1 })
        return res.json(data)
    })
}


//*****************************GET PER PRODUCT ********************* */

const getperproduct = async (req, res) => {
    const id = req.params.id;
    const obid = req.params.obid;
    const q = 'select * from product where id = ?';
    conn.query(q, [obid], (err, data) => {
        if (err) return res.json(err)
        return res.json(data);
    })
}

/// ************************************* UPDATE PRODUCT ************

const updateproduct = async (req, res) => {
    const obid = req.params.obid;



    const { productName, productDesc, productRealPrice, productSellPrice, productDate, productMetaDesc,productMetaTag,bid, cid } = req.body;
    // var image = '';
    // const checkFile = req.file;
    // if (checkFile) {
    //     image = req.file.filename
    // }
    console.log(req.body);

    let arr = req.files;
    let imageArr = [];
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i].filename);
        imageArr = [...imageArr, arr[i].filename]
    }
    console.log(imageArr);
    imageArr = JSON.stringify(imageArr);
    console.log(imageArr);



    const q = "UPDATE product SET `productName`= ?,`productDesc`=?, `productRealPrice`=?, `productSellPrice`=?, `productDate`=?, `productPhoto`= ?, `productMetaDesc` = ?, `productMetaTag` = ?, `branId` = ?, `catId`=?  WHERE id = ?"

    const data = [
        productName,
        productDesc,
        productRealPrice,
        productSellPrice,
        productDate,
        imageArr,
        productMetaDesc,
        productMetaTag,
        bid,
        cid,
        obid
    ]
    conn.query(q, data, (err, data) => {
        if (err) return res.json({ error: err })
        return res.json(data)
    })

}

module.exports = { getCategory, addCategory, deleteCategory, addProduct, getProduct, deleteproduct, updateproduct, getperproduct }