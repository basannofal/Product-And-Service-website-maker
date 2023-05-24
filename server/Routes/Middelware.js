const express = require('express');
const router = express.Router();

const {login, adminData} = require("../Controllers/Middelware")

router.route("/login").post(login);

router.route("/admin/:id").get(adminData);


module.exports = router;