var Configuration = require('../models/configuration');

module.exports.configuration = function(app) {
    
    app.get("/configuration/:id", function(req, res) {
        Configuration.findById(req.params.id).then(function(result) {
        	res.send(result);
        });
    });

    app.post("/configuration/:id", function(req, res) {
        Configuration.findById(req.params.id).then(function(configuration) {
            if (configuration) {
            	configuration.updateAttributes({
            		rate: req.body.rate,
            		hitch: req.body.hitch,
            		deadline: req.body.deadline
            	}).then(function (result) {
            		res.send(result);
            	});
            } else {
            	Configuration.create({
            		id: req.params.id,
            		rate: req.body.rate,
            		hitch: req.body.hitch,
            		deadline: req.body.deadline
            	}).then(function (result) {
            		res.send(result);
            	});
            }
        });
    });
};
