const express = require('express');
const server = express()

// Pegar o banco de dados
const db = require('./database/db');

// Configurar a pasta publica
server.use(express.static("public"))

// Habilitar o uso do req.body da nossa aplicação
server.use(express.urlencoded({ extended: true }))


// Utilizando tamplete engine nunjucks
const nunjucks = require('nunjucks');
nunjucks.configure("src/views", {
   express: server,
   noCache: true
})


// Rotas de nossa aplicação
server.get('/', (req, res) => {
   return res.render("index.html")
})

server.get('/create-point', (req, res) => {

   return res.render("create-point.html")

})

server.post('/savepoint', (req, res) => {

   // req.body é o corpo da nossa aplicacao com os dados enviados
   console.log(req.body);

   const query = `
      INSERT INTO places (
         image,
         name,
         address,
         address2,
         state,
         city,
         itens
      ) VALUES (?,?,?,?,?,?,?);
   `
   
   const values = [
      req.body.image,
      req.body.name,
      req.body.address,
      req.body.address2,
      req.body.state,
      req.body.city,
      req.body.itens
   ]

   function afterInsertData(err) {
      if (err) {
         console.log(err)
         return res.render('create-point.html', {error: true})
      }

         console.log("Cadastrado com sucesso")
         console.log(this)
         
         return res.render('create-point.html', { saved: true})
      }

   db.run(query, values,  afterInsertData)

})

server.get('/search', (req, res) => {

   const search = req.query.search

   if (search == "") {
      // Pesquisa vazia
      return res.render("search-results.html", { total: 0 })
   }

   // Pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
      if (err) {
         return console.log(err)
      }
      
      const total = rows.length

      //Mostra a pagina html com os dados do banco de dados
      return res.render("search-results.html", { places: rows, total })

   })

})

// Ligar nosso servidor
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Umbler listening on port %s', port);
});