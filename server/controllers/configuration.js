var Configuration = require('../models/configuration');

module.exports.configuration = function(app) {
    app.get("/configuration/:id", function(req, res) {
        console.log(req.params);
        console.log(req.body);
    });

    app.post("/configuration/:id", function(req, res) {
        var query = {};
        Configuration.findById(req.params.id).then(function(configuration) {
            if (configuration) {
            	
            } else {

            }
            console.log('poject', project);
        });
    });
};
