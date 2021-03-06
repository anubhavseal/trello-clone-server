var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 8080;
var Board = require('./models/board');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Trello',function(err, db){
    if (err) throw err;
    console.log("Database created!");
});


//app.use('/api', router);
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
var router = require('./routes/router');
router(app);

app.listen(port);
console.log('Hearing on port:', port);
