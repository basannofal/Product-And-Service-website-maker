const express = require('express')
const app = express()
const conn = require('./db/conn')
const Products_route = require("./Routes/Products")
const Middelware_route = require("./Routes/Middelware")
const Service_route = require("./Routes/Services")
const Brand_route = require("./Routes/Brand")
const Slider_route = require("./Routes/Slider")
const Gellary_route = require("./Routes/Gellary")
const bodyparser = require('body-parser');
const path = require('path')
const cors = require('cors')
// var fileupload = require("express-fileupload");

// app.use(fileupload());
app.use(express.json())
app.use(cors())
app.use(express.static(__dirname + '/server/uploads'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));




app.use("/", Products_route);
app.use("/", Middelware_route);
app.use("/", Service_route)
app.use("/", Brand_route)
app.use("/", Gellary_route)
app.use("/", Slider_route)



app.listen(8000, () => {
    console.log("Server Created");
})