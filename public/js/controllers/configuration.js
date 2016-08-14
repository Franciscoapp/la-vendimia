app.controller('configurationController', ['$routeParams',
    function configurationController($routeParams) {
        var configuration = this;
        configuration.$routeParams = $routeParams;

        configuration.initializeData = function() {

        };

        configuration.initializeData();
    }
]);