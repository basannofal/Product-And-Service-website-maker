const express = require('express');
const router = express.Router();
const multer = require("multer");

const Brand = require("../Controllers/Brand")

router.route("/addbrand").post(Brand.addBrand);
router.route("/getbrand").get(Brand.getBrand);
router.route("/deletebrand/:id").delete(Brand.deleteBrand);



module.exports = router;