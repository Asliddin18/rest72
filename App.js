const express = require('express')
const Upload = require("express-fileupload")
const connection = require("./Connection")
const authenticateToken = require('./Auth')
const jwt = require("jsonwebtoken")
const cors = require('cors')
const fs = require("fs")
const uuid = require("uuid")
require('dotenv').config()
const app = express()

app.use(Upload())
app.use(cors())

/* login */
app.post('/login', (req, res) => {
  const reqUsername = req.body.name
  const password = req.body.password
  const accessToken = jwt.sign(reqUsername, process.env.ACCESS_TOKEN_SECRET)
  var admins = "SELECT * FROM Admins"
  connection.query(admins, (err, result) => {
    var loginCheck = false
    result.map(item => {
      if (item.name === reqUsername && item.password === password) {
        loginCheck = true
      }
    })
    if (loginCheck) {
      res.status(200).send(accessToken)
    } else {
      res.status(503).send("Password or Name Error")
    }
  })
}) 


/* admins */
app.get("/admins", (req, res) => {
  var adminsGet = "SELECT * FROM Admins"
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

  connection.query("INSERT INTO Admins values(?, ?, ?, ?, ?, ?, ?, ?)", [Id, name, password, "admin", surname, date, passport, nickname], (err, result) => {
    if (!err) {
      res.status(201).send("User Added Successfully")
    } else {
      res.status(400).send("User was not added")
    }
  })
})
app.delete("/admins/:id", (req, res) => {
  const id = req.params.id
  connection.query("DELETE FROM Admins WHERE id=?", [id], (err, result) => {

    if (!err) {
      if (result.affectedRows == 0) {
        res.status(400).send('Admin id does not found')
      } else {
        res.status(200).send("Admin Delete Successfully")
      }
    } else {
      res.status(500).send(err)
    }
  })
})
app.put("/admins/:id", (req, res) => {
  const id = req.params.id
  const ReqBody = req.body

  connection.query("UPDATE Admins SET name=?, password=?, category=?, surname=?, date=?, passport=?, nickname=? WHERE id=?", [ReqBody.name, ReqBody.password, "admin", ReqBody.surname, ReqBody.date, ReqBody.passport, ReqBody.nickname, id], (err, result) => {
    if (!err) {
      if (result.affectedRows == 0) {
        res.status(400).send('Admin is does not found')
      } else {
        res.status(200).send("Admin Updated Successfully")
      }
    } else {
      res.status(500).send(err)
    }
  })
})


/* users */
app.get("/users", (req, res) => {
  var userGet = "SELECT * FROM Persons"
  connection.query(userGet, (err, result) => {
    if (!err) {
      res.status(200).send(result)
    } else {
      res.status(400).send("Users was not get")
    }
  })
})
app.post("/users", (req, res) => {
  const Id = uuid.v4()
  const R = req.body

  connection.query("INSERT INTO Persons values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [Id, R.UserName, R.Date, R.Jinsi, R.Nogironligi, R.RuxiyHolat, R.Ishjoyi, R.lavozimi, R.OilaAxvoli, R.VoyYetmaganFarzandi, R.MuqaddamSud, R.MuqaddamVaqti, R.AyblovQisqa, R.JinoyatVaqti, R.JinoyatHudud, R.JinoyatJoyi, R.UshlanganSana, R.AybElon, R.AybModda, R.AybModdaQism, R.AybModdaBandi, R.AybOrgani, R.AybElonFIO, R.QamoqBolmagan, R.QamoqExtiyot, R.QamoqUy, R.AyblovProkLavozim, R.AyblovProkFIO, R.JinoyatZarar, R.ZararQoplanish,
      R.MolMulQoplanish, R.QoplanishFoiz, R.IshProk, R.IshPorkFIO, R.AybTopish, R.Moddasi, R.Qismi, R.Bandi, R.AyblovVozKech, R.JazoTur, R.JazoMiqdori, R.ShartliHukm, R.Modda57, R.Modda96, R.MuddatOtib, R.XavfYoqot, R.Pushaymon, R.Yarashgan, R.Kasallik, R.AktiTufay, R.userscol, R.IjYoq, R.AmaldaPushay, R.SSudHukmSana, R.SSudyaFIO, R.SAybliModda, R.SAybliQismi, R.SAybliBandi, R.SAydanVoz, R.SJazoTuri, R.SJazoMiq, R.SShartli, R.S57Modda, R.S96Modda, R.SOtibket, R.SIjXavf, R.SAmaldaPush, R.SYarshMun, R.SKasallik, R.SAktAs, R.SYoq, R.SAmal, R.Ijkattabol, R.Unchaogir, R.Ogir, R.OtaOgir, R.TumanXul, R.ShaharXul, R.BoshXul],
    (err, result) => {
      if (!err) {
        res.status(201).send("User Added Successfully")
      } else {
        res.status(400).send(err)
      }
    })
})
app.delete("/users/:id", (req, res) => {
  const ReqId = req.params.id
  const id = req.params.id
  connection.query("DELETE FROM users WHERE id=?", [id], (err, result) => {

    if (!err) {
      if (result.affectedRows == 0) {
        res.status(400).send('Users id does not found')
      } else {
        res.status(200).send("Users Delete Successfully")
      }
    } else {
      res.status(500).send(err)
    }
  })
})
app.put("/users/:id", (req, res) => {
  const Id = req.params.id
  const R = req.body

  connection.query("UPDATE Persons SET Username=?, Date=?, Jinsi=?, Nogironligi=?, ruxiyXolat=?, IshJoyi=?, Lavozimi=?, oilaviyAxvoli=?, voyFarzandi=?, muqaddamSud=?, MuqddamVaqti=?, AybloqQizqa=?, JinoyatVaqti=?, JinoyatHudud=?, JinoyatJoyi=?, UshlanganSana=?, AybElon=?, AybModda=?, AybModdaQism=?, AybModdaBandi=?, AybOrgani=?, AybElonFIO=?, QamoqBolmagan=?, QamoqExtiyot=?, QamoqUy=?, AyblovProkLavozim=?, AyblovProkFIO=?, JinoyatZarar=?, ZararQoplanish=?, MolMulQoplanish=?, QoplanishFoiz=?, IshProk=?, IshPorkFIO=?, AybTopish=?, Moddasi=?, Qismi=?, Bandi=?, AyblovVozKech=?, JazoTur=?, JazoMiqdori=?, ShartliHukm=?, Modda57=?, Modda96=?, MuddatOtib=?, XavfYoqot=?, Pushaymon=?, Yarashgan=?, Kasallik=?, AktiTufay=?, userscol=?, IjYoq=?, AmaldaPushay=?, SSudHukmSana=?, SSudyaFIO=?, SAybliModda=?, SAybliQismi=?, SAybliBandi=?, SAydanVoz=?, SJazoTuri=?, SJazoMiq=?, SShartli=?, S57Modda=?, S96Modda=?, SOtibket=?, SIjXavf=?, SAmaldaPush=?, SYarshMun=?, SKasallik=?, SAktAs=?, SYoq=?, SAmal=?, Ijkattabol=?, Unchaogir=?, Ogir=?, OtaOgir=?, TumanXul=?, ShaharXul=?, BoshXul=? WHERE UserId`=?", 
  [R.UserName, R.Date, R.Jinsi, R.Nogironligi, R.RuxiyHolat, R.Ishjoyi, R.lavozimi, R.OilaAxvoli, R.VoyYetmaganFarzandi, R.MuqaddamSud, R.MuqaddamVaqti, R.AyblovQisqa, R.JinoyatVaqti, R.JinoyatHudud, R.JinoyatJoyi, R.UshlanganSana, R.AybElon, R.AybModda, R.AybModdaQism, R.AybModdaBandi, R.AybOrgani, R.AybElonFIO, R.QamoqBolmagan, R.QamoqExtiyot, R.QamoqUy, R.AyblovProkLavozim, R.AyblovProkFIO, R.JinoyatZarar, R.ZararQoplanish, R.MolMulQoplanish, R.QoplanishFoiz, R.IshProk, R.IshPorkFIO, R.AybTopish, R.Moddasi, R.Qismi, R.Bandi, R.AyblovVozKech, R.JazoTur, R.JazoMiqdori, R.ShartliHukm, R.Modda57, R.Modda96, R.MuddatOtib, R.XavfYoqot, R.Pushaymon, R.Yarashgan, R.Kasallik, R.AktiTufay, R.userscol, R.IjYoq, R.AmaldaPushay, R.SSudHukmSana, R.SSudyaFIO, R.SAybliModda,R.SAybliQismi, R.SAybliBandi, R.SAydanVoz, R.SJazoTuri, R.SJazoMiq, R.SShartli, R.S57Modda, R.S96Modda, R.SOtibket, R.SIjXavf, R.SAmaldaPush, R.SYarshMun, R.SKasallik, R.SAktAs, R.SYoq, R.SAmal, R.Ijkattabol, R.Unchaogir, R.Ogir, R.OtaOgir, R.TumanXul, R.ShaharXul, R.BoshXul, Id], 
  (err, result) => {
    if (!err) {
      if (result.affectedRows === 0) {
        res.status(400).send('Users is does not found')
      } else {
        res.status(200).send("User Updated Successfully")
      }
    } else {
      res.status(500).send(err)
    }
  })
}) 

/* category */
app.get("/category", (req, res) => {
  var CategoryGet = "SELECT * FROM Category"
  connection.query(CategoryGet, (err, result) => {
    if (!err) {
      res.status(200).send(result)
    } else {
      res.status(400).send("Category was not get")
    }
  })
})
app.post("/category", (req, res) => {
  const CategoryName = req.body.CategoryName
  var Id = uuid.v4()

  connection.query("INSERT INTO Category values(?, ?, ?)", [Id, CategoryName, "[]"], (err, result) => {
    if (!err) {
      res.status(201).send("Category Added Successfully")
    } else {
      res.status(400).send("Category was not added")
    }
  })
})
app.delete("/category/:id", (req, res) => {
  const id = req.params.id
  connection.query("DELETE FROM Category WHERE CategoryId=?", [id], (err, result) => {

    if (!err) {
      if (result.affectedRows === 0) {
        res.status(400).send('Category id does not found')
      } else {
        res.status(200).send("Category Delete Successfully")
      }
    } else {
      res.status(500).send(err)
    }
  })
})
app.put("/category/:id", (req, res) => {
  const id = req.params.id
  const ReqBody = req.body

  connection.query("UPDATE Category SET CategoryName=? WHERE CategoryId=?", [ReqBody.CategoryName, id], (err, result) => {
    if (!err) {
      if (result.affectedRows == 0) {
        res.status(400).send('Category is does not found')
      } else {
        res.status(200).send("Category Updated Successfully")
      }
    } else {
      res.status(500).send(err)
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
