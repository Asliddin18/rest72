const jwt = require('jsonwebtoken')
require("dotenv").config()

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"]
  const token = authHeader.split(' ')[1]
  if (token == null) return res.status(401).send("Token null")

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.status(403).send("Problem with the token")
    } else {
      req.user = user
      next()
    }
  })
}

module.exports = authenticateToken