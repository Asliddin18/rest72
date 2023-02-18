const mysql = require("mysql")

var connection = mysql.createConnection({
 MYSQLPORT: 5703,
 MYSQLHOST: "containers-us-west-89.railway.app",
 MYSQLUSER: "root",
 MYSQLPASSWORD: "3PiembvxC3VA19IjECes",
 MYSQLDATABASE: "railway",
 MYSQL_URL: `${{ MYSQLUSER }}:${{ MYSQLPASSWORD }}@${{ MYSQLHOST }}:${{ MYSQLPORT }}/${{ MYSQLDATABASE }}`
})

connection.connect((err) => {
 if(!err) {
  console.log("connect to MySQL")
 } else {
  console.log("Can't connect to MySQL")
 }
})

module.exports = connection