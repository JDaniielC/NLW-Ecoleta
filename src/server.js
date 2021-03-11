const express = require("express")
const server = express()
//pegar o banco de dados
const db = require("./database/db")
//.use faz a pasta public ficar como se estivesse junto do views
server.use(express.static("public"))
//habilitar o uso do req.body na aplicação pra usar la no savepoint
server.use(express.urlencoded({extended: true}))
//Template engine para deixar o html dinâmico
const nunjucks = require ("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})
//req: requisição
//res: resposta
//__dirname é ir no directório
server.get("/",(req, res) => {
    return res.render("index.html")
})
//render funciona quando se põe template, caso contrário seria res.sendFile(__dirname+)
server.get("/create-point",(req, res) => {

    return res.render("create-point.html")
})

server.post("/savepoint", (req,res)=> {
        const query = `
    INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
    )   VALUES (?,?,?,?,?,?,?)`
    //inserir dados na tabela
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err){
        if(err) {
            console.log(err)
            return res.render("create-point.html", {saved:false})
            //Fazer uma página de erro usando return res.render(igual a create-point)
        }
        console.log("Cadastrado com sucesso")
        console.log(this)
        return res.render("create-point.html", {saved:true})
     }

    db.run(query, values, afterInsertData)
    

})

server.get("/search-results",(req, res) => {

    const search = req.query.search

    if(search == "") {
        //search igual a vazia
        return res.render ("search-results.html", {total:0})
    }
//ele vai selecionar where a cidade e para não ficar exatamente igual coloca LIKE $$
    db.all(`SELECT * FROM PLACES WHERE city LIKE '%${search}%'`, function(err, rows){
                if(err) {
                    return console.log(err)
                }
                const total = rows.length
                return res.render("search-results.html", { places: rows, total: total })
            })
})
server.listen(3000)