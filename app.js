var express = require('express');
var todoController = require('./controller/todoController');

var app = express();

//SET UP TEMPLATE ENGINE
app.set('view engine', 'ejs');

//STATIC FILES will be used for all routes
app.use(express.static('./public'));

//FIRE CONTROLLER
todoController(app);  

//LISTEN TO PORT
app.listen(3033);
console.log('You are listening to port 3000');
