app.controller('clientsController', ['$routeParams',
    function clientsController($routeParams) {
        var clients = this;
        clients.$routeParams = $routeParams;

        clients.initializeData = function() {

        };

        clients.initializeData();
    }
]);
