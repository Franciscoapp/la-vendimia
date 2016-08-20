var Sale = require('../models/sale');

module.exports.sale = function(app) {

    app.get("/sale/", function(req, res) {
        Sale.findAll({}).then(function(result) {
            res.send(result);
        });
    });

    app.get("/sale/nextId", function(req, res) {
        Sale.findOne({
            order: [
                ['id', 'DESC']
            ]
        }).then(function(result) {
            var id = result ? result.id + 1 : 1;
            res.send({ id: id });
        });
    });

    app.post("/sale/", function(req, res) {
        Sale.create(req.body).then(function(result) {
            res.send(result);
        });
    });

};
