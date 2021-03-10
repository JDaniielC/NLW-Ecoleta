const express = require("express")
const server = express()
//pegar o banco de dados
const db = require("./database/db")
//.use faz a pasta public ficar como se estivesse junto do views
server.use(express.static("public"))
//Template engine para deixar o html dinâmico
const nunjucks = require ("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})
//req: requisição
//res: resposta
//__dirname é ir no directório
server.get("/",(rec, res) => {
    return res.render("index.html")
})
//render funciona quando se põe template, caso contrário seria res.sendFile(__dirname+)
server.get("/create-point",(rec, res) => {
    return res.render("create-point.html")
})

server.get("/search-results",(rec, res) => {
    return res.render("search-results.html")
})
server.listen(3000)