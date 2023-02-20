const express = require('express')
const Upload = require("express-fileupload")
const authenticateToken = require('./Auth')
const jwt = require("jsonwebtoken")
const cors = require('cors')
const fs = require("fs")
const uuid = require("uuid")
const ExcelJs = require("exceljs")
require('dotenv').config()
const app = express()

app.use(Upload())
app.use(cors())

/* login */
app.post('/login', (req, res) => {
  const AdminsJson = JSON.parse(fs.readFileSync("./data/Admins.json", "utf-8"))
  const reqNickname = req.body.nickname
  const password = req.body.password
  const accessToken = jwt.sign(reqNickname, process.env.ACCESS_TOKEN_SECRET)
  var loginCheck = false
  AdminsJson.map(item => {
    if (item.nickname === reqNickname && item.password === password) {
      loginCheck = true
    }
  })
  if (loginCheck) {
    res.status(200).send(accessToken)
  } else {
    res.status(503).send("Password or Name Error")
  }
})


/* admins */
app.get("/admins", (req, res) => {
  const AdminsJson = JSON.parse(fs.readFileSync("./data/Admins.json", "utf-8"))
  res.status(200).send(AdminsJson)
})
app.post("/admins", (req, res) => {
  const AdminsJson = JSON.parse(fs.readFileSync("./data/Admins.json", "utf-8"))
  const name = req.body.name
  const password = req.body.password
  const surname = req.body.surname
  const date = req.body.date
  const passport = req.body.passport
  const nickname = req.body.nickname
  const Id = uuid.v4()

  const newObj = {
    Id: Id,
    name: name,
    surname: surname,
    date: date,
    passport: passport,
    nickname: nickname,
    password: password,
    category: req.body.category
  }
  AdminsJson.push(newObj)
  if (name === "" || password === "" || surname === "" || nickname === "") {
    res.status(401).send("Data is Incomplete")
  } else {
    fs.writeFileSync("./data/Admins.json", JSON.stringify(AdminsJson, null, 2))
    res.status(201).send("Admin Created")
  }
})
app.delete("/admins/:id", (req, res) => {
  const AdminsJson = JSON.parse(fs.readFileSync("./data/Admins.json", "utf-8"))
  const ReqId = req.params.id
  let del = false

  AdminsJson.map(item => {
    if (item.Id === ReqId) {
      del = true
    }
  })

  if (del === true) {
    const filterJson = AdminsJson.filter(o => o.Id !== ReqId)
    fs.writeFileSync("./data/Admins.json", JSON.stringify(filterJson, null, 2))
    res.status(200).send("The Administrator Has Been Removed")
  } else {
    res.status(400).send("Id Not Found")
  }
})
app.put("/admins/:id", (req, res) => {
  const AdminsJson = JSON.parse(fs.readFileSync("./data/Admins.json", "utf-8"))
  const ReqId = req.params.id
  var edit = false

  AdminsJson.map(item => {
    if (item.Id == ReqId) {
      edit = true
      req.body.name === "" ? item.name = item.name : item.name = req.body.name
      req.body.surname === "" ? item.surname = item.surname : item.surname = req.body.surname
      req.body.date === "" ? item.date = item.date : item.date = req.body.date
      req.body.passport === "" ? item.passport = item.passport : item.passport = req.body.passport
      req.body.nickname === "" ? item.nickname = item.nickname : item.nickname = req.body.nickname
      req.body.password === "" ? item.password = item.password : item.password = req.body.password
      req.body.category === "" ? item.category = item.category : item.category = req.body.category
    }
  })

  if (edit) {
    res.status(200).send("The Admins Has Been Edited")
    fs.writeFileSync("./data/Admins.json", JSON.stringify(AdminsJson, null, 2))
  } else {
    res.status(400).send("Id Not Found")
  }
})

/* works */
app.get("/works", (req, res) => {
  const WorkJson = JSON.parse(fs.readFileSync("./data/Works.json", "utf-8"))
  res.status(200).send(WorkJson)
})
app.post("/works", (req, res) => {
  const WorkJson = JSON.parse(fs.readFileSync("./data/Works.json", "utf-8"))
  const R = req.body
  var Id = uuid.v4()

  const newObj = {
    WorkId: Id,
    JinoyatVaqti: R.JinoyatVaqti,
    JinoyatHudud: R.JinoyatHudud,
    JinoyatJoyi: R.JinoyatJoyi,
    AybElonFIO: R.AybElonFIO,
    AyblovProkLavozim: R.AyblovProkLavozim,
    AyblovProkFIO: R.AyblovProkFIO,
    IshProk: R.IshProk,
    IshPorkFIO: R.IshPorkFIO,
    SSudHukmSana: R.SSudHukmSana,
    SSudyaFIO: R.SSudyaFIO,
    TumanXul: R.TumanXul,
    ShaharXul: R.ShaharXul,
    BoshXul: R.BoshXul,
    person: []
  }

  WorkJson.push(newObj)
  if (R.UserId === "") {
    res.status(401).send("Data is Incomplete")
  } else {
    fs.writeFileSync("./data/Works.json", JSON.stringify(WorkJson, null, 2))
    res.status(201).send("Works Created")
  }
})
app.delete("/works/:id", (req, res) => {
  const WorkJson = JSON.parse(fs.readFileSync("./data/Works.json", "utf-8"))
  const ReqId = req.params.id
  let del = false

  WorkJson.map(item => {
    if (item.WorkId === ReqId) {
      del = true
    }
  })

  if (del === true) {
    const filterJson = WorkJson.filter(o => o.WorkId !== ReqId)
    fs.writeFileSync("./data/Works.json", JSON.stringify(filterJson, null, 2))
    res.status(200).send("The Work Has Been Removed")
  } else {
    res.status(400).send("Id Not Found")
  }
})
app.put("/works/:id", (req, res) => {
  const WorkJson = JSON.parse(fs.readFileSync("./data/Works.json", "utf-8"))
  const ReqId = req.params.id
  var edit = false

  WorkJson.map(item => {
    if (item.WorkId == ReqId) {
      edit = true
      req.body.JinoyatVaqti === "" ? item.JinoyatVaqti = item.JinoyatVaqti : item.JinoyatVaqti = req.body.JinoyatVaqti
      req.body.JinoyatHudud === "" ? item.JinoyatHudud = item.JinoyatHudud : item.JinoyatHudud = req.body.JinoyatHudud
      req.body.JinoyatJoyi === "" ? item.JinoyatJoyi = item.JinoyatJoyi : item.JinoyatJoyi = req.body.JinoyatJoyi
      req.body.AybElonFIO === "" ? item.AybElonFIO = item.AybElonFIO : item.AybElonFIO = req.body.AybElonFIO
      req.body.AyblovProkLavozim === "" ? item.AyblovProkLavozim = item.AyblovProkLavozim : item.AyblovProkLavozim = req.body.AyblovProkLavozim
      req.body.AyblovProkFIO === "" ? item.AyblovProkFIO = item.AyblovProkFIO : item.AyblovProkFIO = req.body.AyblovProkFIO
      req.body.IshProk === "" ? item.IshProk = item.IshProk : item.IshProk = req.body.IshProk
      req.body.IshPorkFIO === "" ? item.IshPorkFIO = item.IshPorkFIO : item.IshPorkFIO = req.body.IshPorkFIO
      req.body.SSudHukmSana === "" ? item.SSudHukmSana = item.SSudHukmSana : item.SSudHukmSana = req.body.SSudHukmSana
      req.body.SSudyaFIO === "" ? item.SSudyaFIO = item.SSudyaFIO : item.SSudyaFIO = req.body.SSudyaFIO
      req.body.TumanXul === "" ? item.TumanXul = item.TumanXul : item.TumanXul = req.body.TumanXul
      req.body.ShaharXul === "" ? item.ShaharXul = item.ShaharXul : item.ShaharXul = req.body.ShaharXul
      req.body.BoshXul === "" ? item.BoshXul = item.BoshXul : item.BoshXul = req.body.BoshXul
    }
  })

  if (edit) {
    res.status(200).send("The Work Has Been Edited")
    fs.writeFileSync("./data/Works.json", JSON.stringify(WorkJson, null, 2))
  } else {
    res.status(400).send("Id Not Found")
  }
})

/* persons */
app.get("/works/person", (req, res) => {
  const WorkJson = JSON.parse(fs.readFileSync("./data/Works.json", "utf-8"))
  var arr = []
  for (let i = 0; i < WorkJson.length; i++) {
    for (let j = 0; j < WorkJson[i].person.length; j++) {
      arr.push(WorkJson[i].person[j])
    }
  }
  res.status(200).send(arr)
})
app.post("/works/person/:id", (req, res) => {
  const WorkJson = JSON.parse(fs.readFileSync("./data/Works.json", "utf-8"))
  let post = false
  const ReqId = req.params.id
  const R = req.body

  WorkJson.map(item => {
    const newObj = {
      UserId: uuid.v4(),
      UserName: R.UserName,
      Date: R.Date,
      Jinsi: R.Jinsi,
      Nogironligi: R.Nogironligi,
      RuxiyHolat: R.RuxiyHolat,
      Ishjoyi: R.Ishjoyi,
      lavozimi: R.lavozimi,
      OilaAxvoli: R.OilaAxvoli,
      VoyYetmaganFarzandi: R.VoyYetmaganFarzandi,
      MuqaddamSud: R.MuqaddamSud,
      MuqaddamVaqti: R.MuqaddamVaqti,
      AyblovQisqa: R.AyblovQisqa,
      UshlanganSana: R.UshlanganSana,
      AybElon: R.AybElon,
      AybModda: R.AybModda,
      AybModdaQism: R.AybModdaQism,
      AybModdaBandi: R.AybModdaBandi,
      AybOrgani: R.AybOrgani,
      QamoqBolmagan: R.QamoqBolmagan,
      QamoqExtiyot: R.QamoqExtiyot,
      QamoqUy: R.QamoqUy,
      JinoyatZarar: R.JinoyatZarar,
      ZararQoplanish: R.ZararQoplanish,
      MolMulQoplanish: R.MolMulQoplanish,
      QoplanishFoiz: R.QoplanishFoiz,
      AybTopish: R.AybTopish,
      Moddasi: R.Moddasi,
      Qismi: R.Qismi,
      Bandi: R.Bandi,
      AyblovVozKech: R.AyblovVozKech,
      JazoTur: R.JazoTur,
      JazoMiqdori: R.JazoMiqdori,
      ShartliHukm: R.ShartliHukm,
      Modda57: R.Modda57,
      Modda96: R.Modda96,
      MuddatOtib: R.MuddatOtib,
      XavfYoqot: R.XavfYoqot,
      Pushaymon: R.Pushaymon,
      Yarashgan: R.Yarashgan,
      Kasallik: R.Kasallik,
      AktiTufay: R.AktiTufay,
      userscol: R.userscol,
      IjYoq: R.IjYoq,
      AmaldaPushay: R.AmaldaPushay,
      SAybliModda: R.SAybliModda,
      SAybliQismi: R.SAybliQismi,
      SAybliBandi: R.SAybliBandi,
      SAydanVoz: R.SAydanVoz,
      SJazoTuri: R.SJazoTuri,
      SJazoMiq: R.SJazoMiq,
      SShartli: R.SShartli,
      S57Modda: R.S57Modda,
      S96Modda: R.S96Modda,
      SOtibket: R.SOtibket,
      SIjXavf: R.SIjXavf,
      SAmaldaPush: R.SAmaldaPush,
      SYarshMun: R.SYarshMun,
      SKasallik: R.SKasallik,
      SAktAs: R.SAktAs,
      SYoq: R.SYoq,
      SAmal: R.SAmal,
      Ijkattabol: R.Ijkattabol,
      Unchaogir: R.Unchaogir,
      Ogir: R.Ogir,
      OtaOgir: R.OtaOgir,
    }
    if (item.WorkId === ReqId) {
      item.person.push(newObj)
      post = true
    }
  })

  if (post === false || R.UserName === "" || R.Date === "" || R.Jinsi === "") {
    res.status(401).send("Data is Incomplete or Id not found")
  } else {
    fs.writeFileSync("./data/Works.json", JSON.stringify(WorkJson, null, 2))
    res.status(201).send("Works Created")
  }

})
app.delete("/works/person/:id", (req, res) => {
  const WorkJson = JSON.parse(fs.readFileSync("./data/Works.json", "utf-8"))
  const ReqId = req.params.id
  let del = false


  for (let i = 0; i < WorkJson.length; i++) {
    for (let j = 0; j < WorkJson[i].person.length; j++) {
      if (WorkJson[i].person[j].UserId === ReqId) {
        del = true
        WorkJson[i].person.splice(j, 1)
      }
    }
  }

  if (del === true) {
    res.status(200).send("The Work Has Been Removed")
    fs.writeFileSync("./data/Works.json", JSON.stringify(WorkJson, null, 2))
  } else {
    res.status(400).send("Id Not Found")
  }
})
app.put("/works/person/:id", (req, res) => {
  const WorkJson = JSON.parse(fs.readFileSync("./data/Works.json", "utf-8"))
  const ReqId = req.params.id
  let del = false


  for (let i = 0; i < WorkJson.length; i++) {
    for (let j = 0; j < WorkJson[i].person.length; j++) {
      if (WorkJson[i].person[j].UserId === ReqId) {
        req.body.UserName = "" ? WorkJson[i].person[j].UserName = WorkJson[i].person[j].UserName : WorkJson[i].person[j].UserName = req.body.UserName
        req.body.Date = "" ? WorkJson[i].person[j].Date = WorkJson[i].person[j].Date : WorkJson[i].person[j].Date = req.body.Date
        req.body.Jinsi = "" ? WorkJson[i].person[j].Jinsi = WorkJson[i].person[j].Jinsi : WorkJson[i].person[j].Jinsi = req.body.Jinsi
        req.body.Nogironligi = "" ? WorkJson[i].person[j].Nogironligi = WorkJson[i].person[j].Nogironligi : WorkJson[i].person[j].Nogironligi = req.body.Nogironligi
        req.body.RuxiyHolat = "" ? WorkJson[i].person[j].RuxiyHolat = WorkJson[i].person[j].RuxiyHolat : WorkJson[i].person[j].RuxiyHolat = req.body.RuxiyHolat
        req.body.Ishjoyi = "" ? WorkJson[i].person[j].Ishjoyi = WorkJson[i].person[j].Ishjoyi : WorkJson[i].person[j].Ishjoyi = req.body.Ishjoyi
        req.body.lavozimi = "" ? WorkJson[i].person[j].lavozimi = WorkJson[i].person[j].lavozimi : WorkJson[i].person[j].lavozimi = req.body.lavozimi
        req.body.OilaAxvoli = "" ? WorkJson[i].person[j].OilaAxvoli = WorkJson[i].person[j].OilaAxvoli : WorkJson[i].person[j].OilaAxvoli = req.body.OilaAxvoli
        req.body.VoyYetmaganFarzandi = "" ? WorkJson[i].person[j].VoyYetmaganFarzandi = WorkJson[i].person[j].VoyYetmaganFarzandi : WorkJson[i].person[j].VoyYetmaganFarzandi = req.body.VoyYetmaganFarzandi
        req.body.MuqaddamSud = "" ? WorkJson[i].person[j].MuqaddamSud = WorkJson[i].person[j].MuqaddamSud : WorkJson[i].person[j].MuqaddamSud = req.body.MuqaddamSud
        req.body.MuqaddamVaqti = "" ? WorkJson[i].person[j].MuqaddamVaqti = WorkJson[i].person[j].MuqaddamVaqti : WorkJson[i].person[j].MuqaddamVaqti = req.body.MuqaddamVaqti
        req.body.AyblovQisqa = "" ? WorkJson[i].person[j].AyblovQisqa = WorkJson[i].person[j].AyblovQisqa : WorkJson[i].person[j].AyblovQisqa = req.body.AyblovQisqa
        req.body.UshlanganSana = "" ? WorkJson[i].person[j].UshlanganSana = WorkJson[i].person[j].UshlanganSana : WorkJson[i].person[j].UshlanganSana = req.body.UshlanganSana
        req.body.AybElon = "" ? WorkJson[i].person[j].AybElon = WorkJson[i].person[j].AybElon : WorkJson[i].person[j].AybElon = req.body.AybElon
        req.body.AybModda = "" ? WorkJson[i].person[j].AybModda = WorkJson[i].person[j].AybModda : WorkJson[i].person[j].AybModda = req.body.AybModda
        req.body.AybModdaQism = "" ? WorkJson[i].person[j].AybModdaQism = WorkJson[i].person[j].AybModdaQism : WorkJson[i].person[j].AybModdaQism = req.body.AybModdaQism
        req.body.AybModdaBandi = "" ? WorkJson[i].person[j].AybModdaBandi = WorkJson[i].person[j].AybModdaBandi : WorkJson[i].person[j].AybModdaBandi = req.body.AybModdaBandi
        req.body.AybOrgani = "" ? WorkJson[i].person[j].AybOrgani = WorkJson[i].person[j].AybOrgani : WorkJson[i].person[j].AybOrgani = req.body.AybOrgani
        req.body.QamoqBolmagan = "" ? WorkJson[i].person[j].QamoqBolmagan = WorkJson[i].person[j].QamoqBolmagan : WorkJson[i].person[j].QamoqBolmagan = req.body.QamoqBolmagan
        req.body.QamoqExtiyot = "" ? WorkJson[i].person[j].QamoqExtiyot = WorkJson[i].person[j].QamoqExtiyot : WorkJson[i].person[j].QamoqExtiyot = req.body.QamoqExtiyot
        req.body.QamoqUy = "" ? WorkJson[i].person[j].QamoqUy = WorkJson[i].person[j].QamoqUy : WorkJson[i].person[j].QamoqUy = req.body.QamoqUy
        req.body.JinoyatZarar = "" ? WorkJson[i].person[j].JinoyatZarar = WorkJson[i].person[j].JinoyatZarar : WorkJson[i].person[j].JinoyatZarar = req.body.JinoyatZarar
        req.body.ZararQoplanish = "" ? WorkJson[i].person[j].ZararQoplanish = WorkJson[i].person[j].ZararQoplanish : WorkJson[i].person[j].ZararQoplanish = req.body.ZararQoplanish
        req.body.MolMulQoplanish = "" ? WorkJson[i].person[j].MolMulQoplanish = WorkJson[i].person[j].MolMulQoplanish : WorkJson[i].person[j].MolMulQoplanish = req.body.MolMulQoplanish
        req.body.QoplanishFoiz = "" ? WorkJson[i].person[j].QoplanishFoiz = WorkJson[i].person[j].QoplanishFoiz : WorkJson[i].person[j].QoplanishFoiz = req.body.QoplanishFoiz
        req.body.AybTopish = "" ? WorkJson[i].person[j].AybTopish = WorkJson[i].person[j].AybTopish : WorkJson[i].person[j].AybTopish = req.body.AybTopish
        req.body.Moddasi = "" ? WorkJson[i].person[j].Moddasi = WorkJson[i].person[j].Moddasi : WorkJson[i].person[j].Moddasi = req.body.Moddasi
        req.body.Qismi = "" ? WorkJson[i].person[j].Qismi = WorkJson[i].person[j].Qismi : WorkJson[i].person[j].Qismi = req.body.Qismi
        req.body.Bandi = "" ? WorkJson[i].person[j].Bandi = WorkJson[i].person[j].Bandi : WorkJson[i].person[j].Bandi = req.body.Bandi
        req.body.AyblovVozKech = "" ? WorkJson[i].person[j].AyblovVozKech = WorkJson[i].person[j].AyblovVozKech : WorkJson[i].person[j].AyblovVozKech = req.body.AyblovVozKech
        req.body.JazoTur = "" ? WorkJson[i].person[j].JazoTur = WorkJson[i].person[j].JazoTur : WorkJson[i].person[j].JazoTur = req.body.JazoTur
        req.body.JazoMiqdori = "" ? WorkJson[i].person[j].JazoMiqdori = WorkJson[i].person[j].JazoMiqdori : WorkJson[i].person[j].JazoMiqdori = req.body.JazoMiqdori
        req.body.ShartliHukm = "" ? WorkJson[i].person[j].ShartliHukm = WorkJson[i].person[j].ShartliHukm : WorkJson[i].person[j].ShartliHukm = req.body.ShartliHukm
        req.body.Modda57 = "" ? WorkJson[i].person[j].Modda57 = WorkJson[i].person[j].Modda57 : WorkJson[i].person[j].Modda57 = req.body.Modda57
        req.body.Modda96 = "" ? WorkJson[i].person[j].Modda96 = WorkJson[i].person[j].Modda96 : WorkJson[i].person[j].Modda96 = req.body.Modda96
        req.body.MuddatOtib = "" ? WorkJson[i].person[j].MuddatOtib = WorkJson[i].person[j].MuddatOtib : WorkJson[i].person[j].MuddatOtib = req.body.MuddatOtib
        req.body.XavfYoqot = "" ? WorkJson[i].person[j].XavfYoqot = WorkJson[i].person[j].XavfYoqot : WorkJson[i].person[j].XavfYoqot = req.body.XavfYoqot
        req.body.Pushaymon = "" ? WorkJson[i].person[j].Pushaymon = WorkJson[i].person[j].Pushaymon : WorkJson[i].person[j].Pushaymon = req.body.Pushaymon
        req.body.Yarashgan = "" ? WorkJson[i].person[j].Yarashgan = WorkJson[i].person[j].Yarashgan : WorkJson[i].person[j].Yarashgan = req.body.Yarashgan
        req.body.Kasallik = "" ? WorkJson[i].person[j].Kasallik = WorkJson[i].person[j].Kasallik : WorkJson[i].person[j].Kasallik = req.body.Kasallik
        req.body.AktiTufay = "" ? WorkJson[i].person[j].AktiTufay = WorkJson[i].person[j].AktiTufay : WorkJson[i].person[j].AktiTufay = req.body.AktiTufay
        req.body.userscol = "" ? WorkJson[i].person[j].userscol = WorkJson[i].person[j].userscol : WorkJson[i].person[j].userscol = req.body.userscol
        req.body.IjYoq = "" ? WorkJson[i].person[j].IjYoq = WorkJson[i].person[j].IjYoq : WorkJson[i].person[j].IjYoq = req.body.IjYoq
        req.body.AmaldaPushay = "" ? WorkJson[i].person[j].AmaldaPushay = WorkJson[i].person[j].AmaldaPushay : WorkJson[i].person[j].AmaldaPushay = req.body.AmaldaPushay
        req.body.SAybliModda = "" ? WorkJson[i].person[j].SAybliModda = WorkJson[i].person[j].SAybliModda : WorkJson[i].person[j].SAybliModda = req.body.SAybliModda
        req.body.SAybliQismi = "" ? WorkJson[i].person[j].SAybliQismi = WorkJson[i].person[j].SAybliQismi : WorkJson[i].person[j].SAybliQismi = req.body.SAybliQismi
        req.body.SAybliBandi = "" ? WorkJson[i].person[j].SAybliBandi = WorkJson[i].person[j].SAybliBandi : WorkJson[i].person[j].SAybliBandi = req.body.SAybliBandi
        req.body.SAydanVoz = "" ? WorkJson[i].person[j].SAydanVoz = WorkJson[i].person[j].SAydanVoz : WorkJson[i].person[j].SAydanVoz = req.body.SAydanVoz
        req.body.SJazoTuri = "" ? WorkJson[i].person[j].SJazoTuri = WorkJson[i].person[j].SJazoTuri : WorkJson[i].person[j].SJazoTuri = req.body.SJazoTuri
        req.body.SJazoMiq = "" ? WorkJson[i].person[j].SJazoMiq = WorkJson[i].person[j].SJazoMiq : WorkJson[i].person[j].SJazoMiq = req.body.SJazoMiq
        req.body.SShartli = "" ? WorkJson[i].person[j].SShartli = WorkJson[i].person[j].SShartli : WorkJson[i].person[j].SShartli = req.body.SShartli
        req.body.S57Modda = "" ? WorkJson[i].person[j].S57Modda = WorkJson[i].person[j].S57Modda : WorkJson[i].person[j].S57Modda = req.body.S57Modda
        req.body.S96Modda = "" ? WorkJson[i].person[j].S96Modda = WorkJson[i].person[j].S96Modda : WorkJson[i].person[j].S96Modda = req.body.S96Modda
        req.body.SOtibket = "" ? WorkJson[i].person[j].SOtibket = WorkJson[i].person[j].SOtibket : WorkJson[i].person[j].SOtibket = req.body.SOtibket
        req.body.SIjXavf = "" ? WorkJson[i].person[j].SIjXavf = WorkJson[i].person[j].SIjXavf : WorkJson[i].person[j].SIjXavf = req.body.SIjXavf
        req.body.SAmaldaPush = "" ? WorkJson[i].person[j].SAmaldaPush = WorkJson[i].person[j].SAmaldaPush : WorkJson[i].person[j].SAmaldaPush = req.body.SAmaldaPush
        req.body.SYarshMun = "" ? WorkJson[i].person[j].SYarshMun = WorkJson[i].person[j].SYarshMun : WorkJson[i].person[j].SYarshMun = req.body.SYarshMun
        req.body.SKasallik = "" ? WorkJson[i].person[j].SKasallik = WorkJson[i].person[j].SKasallik : WorkJson[i].person[j].SKasallik = req.body.SKasallik
        req.body.SAktAs = "" ? WorkJson[i].person[j].SAktAs = WorkJson[i].person[j].SAktAs : WorkJson[i].person[j].SAktAs = req.body.SAktAs
        req.body.SYoq = "" ? WorkJson[i].person[j].SYoq = WorkJson[i].person[j].SYoq : WorkJson[i].person[j].SYoq = req.body.SYoq
        req.body.SAmal = "" ? WorkJson[i].person[j].SAmal = WorkJson[i].person[j].SAmal : WorkJson[i].person[j].SAmal = req.body.SAmal
        req.body.Ijkattabol = "" ? WorkJson[i].person[j].Ijkattabol = WorkJson[i].person[j].Ijkattabol : WorkJson[i].person[j].Ijkattabol = req.body.Ijkattabol
        req.body.Unchaogir = "" ? WorkJson[i].person[j].Unchaogir = WorkJson[i].person[j].Unchaogir : WorkJson[i].person[j].Unchaogir = req.body.Unchaogir
        req.body.Ogir = "" ? WorkJson[i].person[j].Ogir = WorkJson[i].person[j].Ogir : WorkJson[i].person[j].Ogir = req.body.Ogir
        req.body.OtaOgir = "" ? WorkJson[i].person[j].OtaOgir = WorkJson[i].person[j].OtaOgir : WorkJson[i].person[j].OtaOgir = req.body.OtaOgir
        del = true
      }
    }
  }

  if (del === true) {
    res.status(200).send("The User Has Been Edited")
    fs.writeFileSync("./data/Works.json", JSON.stringify(WorkJson, null, 2))
  } else {
    res.status(400).send("Id Not Found")
  }
})
app.post("/categoryPost/:id", (req, res) => {
  const CategoryJson = JSON.parse(fs.readFileSync("./data/Category.json", "utf-8"))
  let post = false
  CategoryJson.map(item => {
    if (item.Id === req.params.id) {
      var newObj = {
        UserId: req.body.UserId,
        UserName: req.body.UserName,
        surname: req.body.surname
      }
      item.Object.push(newObj)
      post = true
      fs.writeFileSync("./data/Category.json", JSON.stringify(CategoryJson, null, 2))
    }
  })
  if (post === false) {
    res.status(400).send("Id Not Found")
  } else {
    res.status(200).send("Posted in Category")
  }
})
app.delete("/categoryPost/:id", (req, res) => {
  const CategoryJson = JSON.parse(fs.readFileSync("./data/Category.json", "utf-8"))
  const ReqId = req.params.id
  let del = false

  for (let i = 0; i < CategoryJson.length; i++) {
    for (let j = 0; j < CategoryJson[i].Object.length; j++) {
      if (CategoryJson[i].Object[j].UserId === ReqId) {
        del = true
        CategoryJson[i].Object.splice(j, 1)
      }
    }
  }

  if (del === true) {
    res.status(200).send("The UserId Has Been Removed")
    fs.writeFileSync("./data/Category.json", JSON.stringify(CategoryJson, null, 2))
  } else {
    res.status(400).send("Id Not Found")
  }
})

/* category */
app.get("/category", (req, res) => {
  const CategoryJson = JSON.parse(fs.readFileSync("./data/Category.json", "utf-8"))
  res.status(200).send(CategoryJson)
})
app.post("/category", (req, res) => {
  const CategoryJson = JSON.parse(fs.readFileSync("./data/Category.json", "utf-8"))
  const CategoryName = req.body.CategoryName
  var Id = uuid.v4()

  const newObj = {
    Id: Id,
    CategoryName: CategoryName,
    Object: []
  }

  CategoryJson.push(newObj)
  if (CategoryName === "") {
    res.status(401).send("Data is Incomplete")
  } else {
    fs.writeFileSync("./data/Category.json", JSON.stringify(CategoryJson, null, 2))
    res.status(201).send("Category Created")
  }
})
app.delete("/category/:id", (req, res) => {
  const CategoryJson = JSON.parse(fs.readFileSync("./data/Category.json", "utf-8"))
  const ReqId = req.params.id
  let del = false

  CategoryJson.map(item => {
    if (item.Id === ReqId) {
      del = true
    }
  })

  if (del === true) {
    const filterJson = CategoryJson.filter(o => o.Id !== ReqId)
    fs.writeFileSync("./data/Category.json", JSON.stringify(filterJson, null, 2))
    res.status(200).send("The Category Has Been Removed")
  } else {
    res.status(400).send("Id Not Found")
  }
})
app.put("/category/:id", (req, res) => {
  const CateogryJson = JSON.parse(fs.readFileSync("./data/Category.json", "utf-8"))
  const ReqId = req.params.id
  var edit = false

  CateogryJson.map(item => {
    if (item.Id == ReqId) {
      edit = true
      req.body.CategoryName === "" ? item.CategoryName = item.CategoryName : item.CategoryName = req.body.CategoryName
    }
  })

  if (edit) {
    res.status(200).send("The Category Has Been Edited")
    fs.writeFileSync("./data/Category.json", JSON.stringify(CateogryJson, null, 2))
  } else {
    res.status(400).send("Id Not Found")
  }
})

/* History */
app.get("/history", (req, res) => {
  const HistoryJson = JSON.parse(fs.readFileSync("./data/History.json", "utf-8"))
  res.status(200).send(HistoryJson)
})
app.post("/history", (req, res) => {
  const HistoryJson = JSON.parse(fs.readFileSync("./data/History.json", "utf-8"))
  const date = new Date()
  const presentDate = `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}-${date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()}-${date.getFullYear()}`
  const presentHour = `${date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`

  if (req.UserName !== "") {
    const newObj = {
      id: uuid.v4(),
      UserName: req.body.UserName,
      date: presentDate,
      hour: presentHour
    }
    HistoryJson.push(newObj)
    fs.writeFileSync("./data/History.json", JSON.stringify(HistoryJson, null, 2))
    res.status(201).send("History Created")
  } else {
    res.status(400).send("Username Incomplete")
  }
})
app.delete("/history/:id", (req, res) => {
  const HistoryJson = JSON.parse(fs.readFileSync("./data/History.json", "utf-8"))
  const ReqId = req.params.id
  let del = false

  HistoryJson.map(item => {
    if (item.id === ReqId) {
      del = true
    }
  })

  if (del === true) {
    const filterJson = HistoryJson.filter(o => o.id !== ReqId)
    fs.writeFileSync("./data/History.json", JSON.stringify(filterJson, null, 2))
    res.status(200).send("The History Has Been Removed")
  } else {
    res.status(400).send("Id Not Found")
  }
})

app.get("/dowloand", async (req, res) => {
  try { 
    let workbook = new ExcelJs.Workbook()

    const sheet = workbook.addWorksheet("books")
    sheet.columns = [
      { header: "ISBn", key: "isbn", width: 25 },
      { header: "Title", key: "title", width: 50 },
      { header: "Author", key: "author", width: 60 },
      { header: "Page count", key: "pages", width: 10 }
    ]

    var object = JSON.parse(fs.readFileSync("./data/Works.json", "utf-8"))

    await object.map(item => {
      sheet.addRow({
        isbn: item.WorkId,
        title: item.JinoyatVaqti,
        author: item.IshProk,
        pages: item.ShaharXul
      })
    })
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
    res.setHeader(
      "Content-Disposition",
      "attachment;filename-"+ "exportData.xlsx"
    )
    workbook.xlsx.write(res)
  } catch {

  }
})

app.listen(6060, (err) => {
  if (!err) {
    console.log("Server Run");
  } else {
    console.log("Server Error");
  }
})
