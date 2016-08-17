app.controller('configurationController', ['$routeParams', 'Configuration', '$q',
    function configurationController($routeParams, Configuration, $q) {
        var conf = this;
        conf.$routeParams = $routeParams;

        var getConfiguration = function() {
            var deferred = $q.defer();
            Configuration.get({}, function(configuration) {
                conf.inputs = {
                    rate: configuration.rate,
                    hitch: configuration.hitch,
                    deadline: configuration.deadline
                };
                deferred.resolve(true);
            });
            return deferred.promise;
        };

        var initializeData = function() {
            getConfiguration();
        };

        var isValidInput = function(value) {
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
                Configuration.save(conf.inputs, function(configuration) {
                    alert('“Bien Hecho. La configuración ha sido registrada".');
                });
            } else {
                console.log('Incorrect...');
            }
        };

        initializeData();
    }
]);
