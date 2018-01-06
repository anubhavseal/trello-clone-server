var router = function(app) {
    var boardController = require('../controllers/board')
    
    app.route('/boards')
        .get(boardController.get)
        .post(boardController.create);
    
    app.route('/boards/:boardId')
        .get(boardController.find)
        .put(boardController.update)
        .delete(boardController.delete);
}

module.exports = router;