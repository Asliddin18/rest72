const express = require('express')
const Upload = require("express-fileupload")
const connection = require("./Connection")
const cors = require('cors')
const fs = require("fs")
const uuid = require("uuid")
const app = express()

app.use(Upload())
app.use(cors())



app.get("/admins", (req, res) => {
 var adminsGet = "SELECT * FROM admins"
 connection.query(adminsGet, (err, result) => {
  if (!err) {
   res.status(200).send(result)
  } else {
   res.status(400).send("Admins was not get")
  }
 })
})
app.post("/admins", (req, res) => {
 var name = req.body.name
 var password = req.body.password
 var surname = req.body.surname
 var date = req.body.date
 var passport = req.body.passport
 var nickname = req.body.nickname

 var Id = uuid.v4()
 connection.query("INSERT INTO admins values(?, ?, ?, ?, ?, ?, ?, ?)", [Id, name, password, "admin", surname, date, passport, nickname], (err, result) => {
  if (!err) {
   res.status(201).send("Product Added Successfully")
  } else {
   res.status(400).send("Product was not added")
  }
 })
})
app.delete("/admins/:id", (req, res) => {
 const id = req.params.id
 connection.query("DELETE FROM admins WHERE id=?", [id], (err, result) => {

   if (!err) {
     if (result.affectedRows == 0) {
       res.status(404).send('Admin id does not found')
     }
     res.status(200).send("Admin Delete Successfully")
   } else {
     res.status(500).send(err)
   }
 })
})
app.put("/admins/:id", (req, res) => {
 const id = req.params.id
 const ReqBody = req.body

 connection.query("UPDATE admins SET name=?, password=?, category=?, surname=?, date=?, passport=?, nickname=? WHERE id=?", [ReqBody.name, ReqBody.password, "admin", ReqBody.surname, ReqBody.date, ReqBody.passport, ReqBody.nickname, id], (err, result) => {
   if (!err) {
     if (result.affectedRows == 0) {
       res.status(404).send('Admin is does not found')
     }
     res.status(200).send("Admin Updated Successfully")
   } else {
     res.status(500).send(err)
   }
 })

})

app.get("/users", (req, res) => {
  var userGet = "SELECT * FROM users"
  connection.query(userGet, (err, result) => {
    if(!err) {
      res.status(200).send(result)
    } else {
      res.status(400).send("Users was not get")
    }
  })
})



app.listen(6060, (err) => {
 if (!err) {
  console.log("Server Run");
 } else {
  console.log("Server Error");
 }
})