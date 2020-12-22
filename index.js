// Importando express
const express = require('express');

// Chamando express para a aplicação
const server = express();

//Allow JSON in express
server.use(express.json());

// rota de servidor para teste
/// req = envio de parâmetros, dados das requisições (ex.: envio de dados de um formulário)
/// res = resposta para o front-end

// Tipos de informações para Requisições (req)
   // Query params = ?teste=1
   // Route params = /users/1
   // Request body = { "name": "Hughie", "email": "theboys@amazon.com.br" }


// CRUD - Create, Read, Update and Delete

// Server address 
server.listen(3000);

// Users Array
const users = ['Butcher', 'Kimiko', 'French']

// Middleware simple example
// whenever the server is called, send a message.
server.use((req, res, next) => {
  
  // Getting ROUTES informations
  console.log(`Method: ${req.method}; URL: ${req.url}`);

  // Time necessary for informations
  console.time('Request');

  next();

  console.timeEnd('Request');

})

// middleware - function to check if NAME users exists 
function checkNameUserExists(req, res, next) {
  if(!req.body.name) {
    return res.status(400).json({ error: 'NAME is necessary'});
  }

  return next()
}

// middleware - function to check if ID users exists 
function checkIdUserExists (req, res, next) {
  if (!users[req.params.index]){
    return res.status(400).json({ error: 'User does not exists'});
  }
  return next();
}


// Call ALL the users
server.get('/users', (req, res) => {
  
  return res.json(users);

  });

// Call the users ONE by ONE from the index
server.get('/users/:index', checkIdUserExists, (req, res) => {

  //const name = req.query.name
  
  const { index } = req.params
  
  return res.json(users[index]);

});


// CRUD 

// 1. Create users
// POST Method to add users
server.post('/users', checkNameUserExists,  (req, res) =>{

  const {name} = req.body

  // Array method to add user
  users.push(name)

  return res.json(users)
  
});

// 2. Users Edit
// PUT Method to edit users
server.put('/users/:index', checkIdUserExists, checkNameUserExists,(req, res) => {
  const {index} = req.params;
  const {name} = req.body;

  users[index] = name;

  return res.json(users);

})


// 3. Delete users
// DELETE Method
server.delete('/users/:index', checkIdUserExists, (req, res) => {
  const {index} = req.params;


  // Array Method to delete users
  users.splice(index, 1);

  // return res.json(users)
  return res.send();

});









