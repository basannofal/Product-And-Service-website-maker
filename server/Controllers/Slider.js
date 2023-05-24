const conn = require("../db/conn")




// ///*******************ADD IMAGE ************************** */

const AddSlider = async (req, res) => {
    const { headingText, subheadingText, descText, link1, link2 } = req.body;
    var img1 = '';
    var img2 = '';
    var img3 = '';
    const checkFile = req.files;
    if (checkFile) {
        img1 = req.files.img1[0].filename
        img2 = req.files.img2[0].filename
        img3 = req.files.img3[0].filename

    }
    console.log(req.body);
    console.log(img1);
    console.log(img2);
    console.log(img3);


    const q = "INSERT INTO slider (`img1`, `img2`, `img3`, `heading_text`, `subheading_text`, `desc_text`, `link_1`, `link_2`)  VALUES (?) "

    const data = [
        img1,
        img2,
        img3,
        headingText,
        subheadingText,
        descText,
        link1,
        link2
    ]
    conn.query(q, [data], (err, data) => {
        if (err) return res.json({ error: err })
        return res.json(data)
    })
}



// ///*******************GET IMAGES ************************** */

const getSlider = async (req, res) => {
    const q = 'select * from slider';
    conn.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data);
    })
}




/// ************************************* DELETE SERVICE ************

const deleteSlider = async (req, res) => {
    const id = req.params.obid
    const q = "delete from gellary where id = ?"

    conn.query(q, [id], (err, data) => {
        if (err) return res.json({ error: 1 })
        return res.json(data)
    })
}

//*****************************GET PER PRODUCT ********************* */

// const getperservice = async(req, res) => {
//     const id = req.params.id;
//     const obid = req.params.obid;
//     const q = 'select * from service where id = ?';
//     conn.query(q,[obid], (err, data) => {
//         if (err) return res.json(err)
//         return res.json(data);
//     })
// }




// /// ************************************* UPDATE SERVICE ************

const updateSlider = async (req, res) => {
    const obid = req.params.obid;
    const { headingText, subheadingText, descText, link1, link2, demoimg1, demoimg2, demoimg3 } = req.body;
    var img1 = '';
    var img2 = '';
    var img3 = '';
    const checkFile = req.files;
   
    if (checkFile) {
        if (req.files.img1 === undefined) {
            img1 = demoimg1
        }
        else {
            img1 = req.files.img1[0].filename
        }
        if (req.files.img2 === undefined) {
            img2 = demoimg2
        }
        else {
            img2 = req.files.img2[0].filename
        }
        if (req.files.img3 === undefined) {
            img3 = demoimg3
        }
        else {
            img3 = req.files.img3[0].filename
        }
    }
    console.log(img1);
    console.log(img2);
    console.log(img3);
    console.log(req.body);
    console.log(req.files);

    const q = "UPDATE slider SET `img1`= ?,`img2`= ?,`img3`= ?,`heading_text`= ?,`subheading_text`= ?,`desc_text`= ?,`link_1`= ?,`link_2`= ? WHERE id = ?"

    const data = [
         img1,
         img2,
         img3,
         headingText,
         subheadingText,
         descText,
         link1,
         link2,
         obid
    ]
    conn.query(q, data, (err, data) => {
        if (err) return res.json({ error: err })
        return res.json(data)
    })

}



/ /// ************************************* UPDATE SERVICE ************

const updateStatus = async (req, res) => {
    const obid = req.params.obid;



    const { status } = req.body;

    console.log(status);
    console.log(obid);

    const q = "UPDATE  slider SET `status`= ?  WHERE id = ?"

    const data = [
        status,
        obid
    ]
    conn.query(q, data, (err, data) => {
        if (err) return res.json({ error: err })
        return res.json(data)
    })

}

module.exports = { AddSlider, getSlider, deleteSlider, updateStatus, updateSlider }
