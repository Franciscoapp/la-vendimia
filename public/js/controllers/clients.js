app.controller('clientsController', ['$routeParams', '$q', 'Client', '$uibModal', 'ClientNextId', 'Utils',
    function clientsController($routeParams, $q, Client, $uibModal, ClientNextId, Utils) {
        var clients = this;
        clients.$routeParams = $routeParams;

        var getClients = function() {
            var deferred = $q.defer();
            Client.query({}, function(result) {
            	_.each(result, function (client) {
            		client.key = Utils.pad(client.id, 4);
            	});
                clients.clients = result;
                deferred.resolve(true);
            });
            return deferred.promise;
        };

        var saveClient = function(client) {
            Client.save(client, function(savedClient) {
                getClients();
            });
        };

        var initializeData = function() {
            getClients();
        };

        var openModal = function(client, id) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'views/modals/client.html',
                controller: 'ModalClientController as clientModal',
                size: 'md',
                resolve: {
                    client: client,
                    nextId: id
                }
            });

            modalInstance.result.then(function(newClient) {
                saveClient(newClient);
            });
        };

        clients.openModal = function(client) {
            if (client) {
                openModal(client, client.id);
            } else {
                ClientNextId.get({}, function(id) {
                    openModal(client, id);
                });
            }

        };

        initializeData();
    }
]);
