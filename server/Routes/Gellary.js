const express = require('express');
const router = express.Router();
const Gellary = require("../Controllers/Gellary")
const multer = require("multer")


var imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "../client/src/Assets/images/gellary");
    },
    filename: (req, file, cb) => {
        cb(null, `image-${Date.now()}.${file.originalname}`);
    },
});


var upload = multer({
    storage: imgconfig,
});

router.post("/addgellaryimage", upload.single("imgPath"), Gellary.AddImage )
router.route("/getgellaryimages").get(Gellary.getGellaryImages);
router.route("/deletegallaryimage/:obid").delete(Gellary.deleteGellaryimgae)
// router.route("/getperservice/:id/:obid").get(Service.getperservice)
// router.patch("/updateservice/:obid", upload.single("serviceImage"), Service.updateService)


module.exports = router;