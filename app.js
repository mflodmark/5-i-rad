const express = require("express")
const app = express()
const port = 3000

app.use(express.static("public"))

app.listen(port)
console.log("Denna webserver lyssnar på localhost port 3000")
