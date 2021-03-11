//Importar a dependência do sqlite3
const sqlite3 = require("sqlite3").verbose()
//criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")
//exports para funcionar o const db = require("./database/db") no server.js
module.exports = db

//utilizar o objeto de banco de dados, para nossas operações
db.serialize(()=> {
//     //criar uma tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)
        })
//inserir dados
//     const query = `
//     INSERT INTO places (
//         image,
//         name,
//         address,
//         address2,
//         state,
//         city,
//         items
//     )   VALUES (?,?,?,?,?,?,?)`
//     //inserir dados na tabela
//     const values = []

//     function afterInsertData(err){
//         if(err) {
//             return console.log(err)
//         }
//         console.log("Cadastrado com sucesso")
//         console.log(this)
//      }

//     db.run(query, values, afterInsertData)
//      //mostrar os dados da tabela
//     db.all(`SELECT name FROM PLACES`, function(err, rows){
//         if(err) {
//             return console.log(err)
//         }
//         console.log("Aqui estão seus registros:")
//         console.log(rows)
//     })
//     //deletar um dado da tabela
//     db.run(`DELETE FROM places WHERE id = ?`, [1], function(err) {
//         if(err) {
//             return console.log(err)
//         }
//         console.log("Registro deletado com sucesso")
//     })

// })