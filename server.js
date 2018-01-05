var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Board = require('./models/board');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


var port = process.env.PORT || 8080;

mongoose.connect('mongodb://localhost:27017/Trello',function(err, db){
    if (err) throw err;
    console.log("Database created!");
});

var router = express.Router();

router.use(function(req, res, next){
    console.log('Something is happening');
    next();
});

router.get('/',function(req,res){
    res.json({'message':"Welcome to our Api!"});
});

router.route('/boards')
    .post(function(req, res){
        var board = new Board();
        board.name = req.body.name;
        board.save(function(err){
            if(err) res.send(err);
            res.json({'message':'Board Created!'});
        });
    })
    .get(function(req, res){
        Board.find(function(err, boards){
            if(err) res.send(err);
            res.json(boards);
        })
    });

router.route('/boards/:board_id')
    .get(function(req, res){
        Board.findById(req.params.bear_id, function(err, board) {
            if (err)
                res.send(err);
            res.json(board);
        });
    })
    .put(function(req, res){
        Board.findById(req.params.board_id, function(err, board){
            if(err) res.send(err);
            board.name = req.body.name;
            board.save(function(err){
                if(err) res.send(err);
                res.json({'message':'Board updated!'});
            });
        })
    })
app.use('/api', router);
app.listen(port);
console.log('Hearing on port:', port);