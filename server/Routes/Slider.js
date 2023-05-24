const express = require('express');
const router = express.Router();
const Slider = require("../Controllers/Slider")
const multer = require("multer")


var imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "../client/src/Assets/images/Slider");
    },
    filename: (req, file, cb) => {
        cb(null, `image-${Date.now()}.${file.originalname}`);
    },
});


var upload = multer({
    storage: imgconfig,
});

router.post("/addslider", upload.fields([{name:'img1'},{name:'img2'},{name:'img3'}]), Slider.AddSlider )
router.route("/getslider").get(Slider.getSlider);
// router.route("/deletegallaryimage/:obid").delete(Gellary.deleteGellaryimgae)
router.route("/updatestatus/:obid").patch(Slider.updateStatus)
router.patch("/updateslider/:obid", upload.fields([{name:'img1'},{name:'img2'},{name:'img3'}]), Slider.updateSlider )


module.exports = router;