//ADD BODY PARSER TO GET DATA FROM THE REQUEST
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended: false});

var mongoose = require('mongoose');

//CONNECT TO THE DATABASE
mongoose.connect('mongodb://test:test@ds263089.mlab.com:63089/todo');

//CREATE A SCHEMA-- 
var todoSchema = new mongoose.Schema({
   item: String 
});

//CREATE A MODEL FOR THE SCHEMA
var ToDo = mongoose.model('ToDo', todoSchema);

var itemOne = ToDo({item: 'test item'}).save(function(error){
    if(error) throw error;
    console.log('item saved');
});

//TEMP DATA FOR MAKING THE LIST ON THE SERVER
//var data = [{item: 'hello world 1'},{item: 'hello world 2'},{item: 'hello world 3'}];


module.exports = function (app){

//  app.get('/', function(req,res){
//      //GET DATA FROM MONGODB AND PASS IT TO THE VIEW
//      ToDo.find({}, function(err,data){
//          if(err) throw err;
//          res.render('todo', {todo: data});
//      });
//      
//
//  });
    
   app.get('/todo', function(req,res){
      //GET DATA FROM MONGODB AND PASS IT TO THE VIEW
      ToDo.find({}, function(err,data){
          if(err) throw err;
          res.render('todo', {todo: data});
      });
      

  });

  app.post('/todo', urlEncodedParser, function(req,res){
      //GET DATA FROM THE VIEW AND ADD IT TO THE MONGODB
      var newToDo = ToDo(req.body).save(function(err,data){
          if(err) throw err;
          res.json(data);
      })
      
  });

  app.delete('/todo/:item', function(req,res){
      //DELETE THE REQ ITEM FROM MONGODB
      ToDo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
         if(err) throw err;
          res.json(data);
      });
    

  });
}
