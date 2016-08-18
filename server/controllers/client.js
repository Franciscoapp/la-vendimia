var Client = require('../models/client');

module.exports.client = function(app) {

    app.get("/client/", function(req, res) {
        Client.findAll({}).then(function(result) {
            res.send(result);
        });
    });

    app.get("/client/nextId", function(req, res) {
        Client.findOne({ order: [
                ['id', 'DESC']
            ] }).then(function(result) {
            var id = result ? result.id + 1 : 1;
            res.send({ id: id });
        });
    });

    app.get("/client/:id", function(req, res) {
        Client.findById(req.params.id).then(function(result) {
            res.send(result);
        });
    });

    app.post("/client/", function(req, res) {
        Client.create(req.body).then(function(result) {
            res.send(result);
        });
    });

    app.post("/client/:id", function(req, res) {
        Client.update(req.body, { where: { id: req.params.id } }).then(function(result) {
            res.send({ result: result });
        });
    });
};
