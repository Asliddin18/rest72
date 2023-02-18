const mysql = require("mysql2")

var connection = mysql.createConnection({
 host: "containers-us-west-83.railway.app",
 port: 7129,
 user: "root",
 password: "4zB51jfMFUUM45UKmWSm",
 database: "railway",
})

connection.connect((err) => {
 if(!err) {
  console.log("connect to MySQL")
 } else {
  console.log("Failed to Connect to MySQL")
 }
})

module.exports = connection