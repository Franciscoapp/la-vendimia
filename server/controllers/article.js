var Article = require('../models/article');

module.exports.article = function(app) {

    app.get("/article/", function(req, res) {
        Article.findAll({}).then(function(result) {
            res.send(result);
        });
    });

    app.get("/article/nextId", function(req, res) {
        Article.findOne({ order: [
                ['id', 'DESC']
            ] }).then(function(result) {
            var id = result ? result.id + 1 : 1;
            res.send({ id: id });
        });
    });

    app.get("/article/:id", function(req, res) {
        Article.findById(req.params.id).then(function(result) {
            res.send(result);
        });
    });

    app.post("/article/", function(req, res) {
        Article.create(req.body).then(function(result) {
            res.send(result);
        });
    });

    app.post("/article/:id", function(req, res) {
        Article.update(req.body, { where: { id: req.params.id } }).then(function(result) {
            res.send({ result: result });
        });
    });
};
