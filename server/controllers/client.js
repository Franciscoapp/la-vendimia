var Client = require('../models/client');

module.exports.client = function(app) {

    app.get("/client/", function(req, res) {
        Client.findAll({}).then(function(result) {
            res.send(result);
        });
    });

    app.get("/client/:id", function(req, res) {
        Client.findById(req.params.id).then(function(result) {
            res.send(result);
        });
    });

    app.post("/client/:id", function(req, res) {
        Client.findById(req.params.id).then(function(client) {
            if (client) {
                client.updateAttributes({
                    rate: req.body.rate,
                    hitch: req.body.hitch,
                    deadline: req.body.deadline
                }).then(function(result) {
                    res.send(result);
                });
            } else {
                Client.create({
                    id: req.params.id,
                    rate: req.body.rate,
                    hitch: req.body.hitch,
                    deadline: req.body.deadline
                }).then(function(result) {
                    res.send(result);
                });
            }
        });
    });
};
