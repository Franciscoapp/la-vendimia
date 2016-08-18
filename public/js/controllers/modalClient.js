app.controller('ModalClientController',
    function($scope, $uibModalInstance, client, nextId) {
        var clientModal = this;

        var pad = function(str, max) {
            str = str.toString();
            return str.length < max ? pad('0' + str, max) : str;
        };

        var initializeData = function() {
            if (client) {
                clientModal.title = 'Edición de Clientes';
                clientModal.key = pad(client.id, 4);
                clientModal.client = angular.copy(client);
            } else {
                clientModal.title = 'Registro de Clientes';
                clientModal.key = pad(nextId.id, 4);
                clientModal.client = {
                    name: '',
                    last_name: '',
                    mother_last_name: '',
                    rfc: ''
                };
            }
        }

        clientModal.save = function() {
            $uibModalInstance.close(clientModal.client);
        };

        clientModal.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

        initializeData();
    });
