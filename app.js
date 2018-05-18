var express = require('express');
var todoController = require('./controller/todoController');

var app = express();

const port = process.env.PORT || 3000;

//SET UP TEMPLATE ENGINE
app.set('view engine', 'ejs');

//STATIC FILES will be used for all routes
app.use(express.static('./public'));

//FIRE CONTROLLER
todoController(app);  

//LISTEN TO PORT
app.listen(port, () =>{
    console.log('Server is up on port ' + port );
});

