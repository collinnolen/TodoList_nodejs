var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var urlencodedParser = bodyParser.urlencoded({extended: false});

//Opening up mongodb database for todos.
mongoose.connect('mongodb://test:test1@ds031581.mlab.com:31581/nodejs_db', {useMongoClient: true});

//blue print
var todoSchema = new mongoose.Schema({
  item: String
});

//Model for mongodb
var Todo = mongoose.model('Todo', todoSchema);

module.exports = function(app){

app.get('/todo', function(req, res){
  //get data from mongodb and pass it into the view.
  Todo.find({}, function(err, data){
    if (err) console.log(err);
    res.render('todoViews/todo', {todos:data});
  });
});

app.post('/todo', urlencodedParser, function(req, res){
  //gather data from view and add it to mongodb.
  var newTodo = Todo(req.body).save(function(err, data){
    //if (err) throw err;
    res.json(data);
  });
});

app.delete('/todo/:item', function(req, res){
  //delete the requested item from mongodb.
  Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
    if (err) throw err;
    res.json(data);
  });
});



};
