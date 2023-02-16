const express = require('express')
const Upload = require("express-fileupload")
const connection = require("./Connection")
const cors = require('cors')
const app = express()

app.use(Upload())
app.use(cors())



app.listen(6060, (err) => {
 if(!err) {
  console.log("Server Run");
 } else {
  console.log("Server Error");
 }
})