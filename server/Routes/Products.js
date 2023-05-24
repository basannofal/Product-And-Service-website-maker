const express = require('express');
const router = express.Router();
const multer = require("multer");

const Products = require("../Controllers/Products")



var imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "../client/src/Assets/upload");
    },
    filename: (req, file, cb) => {
        cb(null, `image-${Date.now()}.${file.originalname}`);
    },
});


var upload = multer({
    storage: imgconfig,
});



router.route("/getcategory").get(Products.getCategory);
router.route("/addcategory").post(Products.addCategory);
router.route("/deletecategory/:id").delete(Products.deleteCategory)
router.route("/getproduct").get(Products.getProduct)

// router.post("/addproduct", upload.single("productImages"), Products.addProduct )
router.post("/addproduct", upload.array("productImages", 5), Products.addProduct )
router.route("/deleteproduct/:id").delete(Products.deleteproduct);
router.route("/getperproduct/:id/:obid").get(Products.getperproduct);
router.patch("/updateproduct/:obid", upload.array("productImages",5), Products.updateproduct)


module.exports = router;