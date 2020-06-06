//Imporatr a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose();

// Iniciar o objeto que irá fazer as operações do banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

db.serialize(() => {
//    // Criar uma tabela
//    // db.run(`
//    //    CREATE TABLE IF NOT EXISTS places (
//    //       id INTEGER PRIMARY KEY AUTOINCREMENT,
//    //       image TEXT,
//    //       name TEXT,
//    //       address TEXT,
//    //       address2 TEXT,
//    //       state TEXT,
//    //       city TEXT,
//    //       itens TEXT
//    //    );
//    // `)

//    // Enserir dados na tablea
//    // const query = `
//    //    INSERT INTO places (
//    //       image,
//    //       name,
//    //       address,
//    //       address2,
//    //       state,
//    //       city,
//    //       itens
//    //    ) VALUES (?,?,?,?,?,?,?);
//    // `
   
//    // const values = [
//    //    "http://localhost:3000/assets/icones/papersider.png",
//    //    "Papersider",
//    //    "Guilherme Gemballa, Jardim América",
//    //    "Nº 260",
//    //    "Santa Catarina",
//    //    "Rio do Sul",
//    //    "Papéis e Papelão"
//    // ]

//    // function afterInsertData(err) {
//    //    if (err) {
//    //       return console.log(err)
//    //    }

//    //       console.log("Cadastrado com sucesso")
//    //       console.log(this)
//    //    }

//    // db.run(query, values,  afterInsertData)

//    // Consultar dados na tabela
   // db.all(`SELECT * FROM places`, function(err, rows) {
   //    if (err) {
   //       return console.log(err)
   //    }

   //    console.log("Aqui estão o seus registros: ");
   //    console.log(rows);
   // })

//    // Deletar dados da tabela
   db.run(`DELETE FROM places WHERE id = ?`, [8], function(err) {
      if (err) {
         return console.log(err)
      }

      console.log("Registro deletado com sucesso!");
   })

})
