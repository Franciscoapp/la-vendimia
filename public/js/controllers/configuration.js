app.controller('configurationController', ['$routeParams', 'Configuration',
    function configurationController($routeParams, Configuration) {
        var conf = this;
        conf.$routeParams = $routeParams;

        var initializeData = function() {
            conf.inputs = {
                rate: 0,
                hitch: 0,
                deadline: 0
            };
        };

        var isValidInput = function (value) {
            return (typeof value && value >= 0 && value <= 99)
        };

        var validateInputs = function() {
            var response = true;
            _.find(conf.inputs, function(input) {
                if (!isValidInput(input)) {
                    response = false;
                    return true;
                } else {
                    return false;
                }
            });
            return response;
        };

        conf.save = function() {
            if (validateInputs()) {
                console.log('Save...');
                console.log(Configuration.save(conf.inputs));
            } else {
                console.log('Incorrect...');
            }
        };

        initializeData();
    }
]);
