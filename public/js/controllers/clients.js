app.controller('clientsController', ['$routeParams', '$q', 'Client',
    function clientsController($routeParams, $q, Client) {
        var clients = this;
        clients.$routeParams = $routeParams;

        var getClients = function() {
            var deferred = $q.defer();
            Client.query({}, function(result) {
                clients.clients = result;
                deferred.resolve(true);
            });
            return deferred.promise;
        };

        var initializeData = function() {
            getClients();
        };

        initializeData();
    }
]);
