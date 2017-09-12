var express = require('express');
var todoController = require('./controllers/todoController.js');

//Create express application
var app = express();

//setting templating engine.
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//fire controllers
todoController(app);

//Port listening
console.log("Listening to port 3000");
app.listen(3000);
