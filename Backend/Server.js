const express = require("express");
const app = express();
const bodyParser = require('body-parser')

const {formController} = require("./controllers/createForm");
const dbconnect = require("./config/dbConnect");
dbconnect();
app.use(express.json());
app.use(bodyParser.json())

app.post('/api/v1/create-form',formController);

app.listen(4000,()=>{
    console.log("Server started at 4000 port");
})

app.get('/',(req,res)=>{
    res.send("Hii")
})