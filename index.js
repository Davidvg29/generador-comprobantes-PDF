const express = require("express")
const server = express()

const PORT = 3001

const routes = require("./src/routes/router.js")

server.use(express.json())

server.use("/", routes)

server.listen(PORT, ()=>{
    console.log("server listen port: ", PORT)
})