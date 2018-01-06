var mongoose = require('mongoose');
var Board = mongoose.model('Board');

var boardController = {
    get: function(req, res) {
        Board.find(function(err, boards){
            if(err) res.send(err);
            else return res.json(boards);
        })
    },
    create: function(req, res) {
        var board = new Board();
        board.name = req.body.name;
        board.save(function(err){
            if(err) res.send(err);
            res.json({'message':'Board Created!'});
        });
    },
    find: function(req, res) {
        Board.findById(req.params.boardId, function(err, board) {
            if(err) res.send(err);
            res.json(board);
        });
    },
    update: function(req, res) {
        filter = req.params.boardId;
        document = req.body;
        options = {new: true};
        Board.findOneAndUpdate(filter, document, options, function(err, board) {
            if (err) res.send(err);
            res.json(board)
        });
    },
    delete: function(req, res) {
        filter = {_id: req.params.boardId};
        Board.remove(filter, function(err) {
            if(err) res.send(err);
            res.json({'message': 'successfully delete'});
        })
    }
}

module.exports = boardController;