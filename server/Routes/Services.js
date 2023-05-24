const express = require('express');
const router = express.Router();
const Service = require("../Controllers/Services")
const multer = require("multer")


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

router.post("/addservice", upload.single("serviceImage"), Service.AddService )
router.route("/getservices").get(Service.getServices);
router.route("/deleteservice/:obid").delete(Service.deleteService)
router.route("/getperservice/:id/:obid").get(Service.getperservice)
router.patch("/updateservice/:obid", upload.single("serviceImage"), Service.updateService)
router.route("/deleteservicecategory/:id").delete(Service.deleteServiceCategory);
router.route("/getservicecategory").get(Service.getServiceCategory);
router.route("/addservicecategory").post(Service.addServiceCategory);

module.exports = router;