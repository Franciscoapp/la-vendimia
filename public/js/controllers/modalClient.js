app.controller('ModalClientController',
    function($scope, $uibModalInstance, client, nextId, Utils, $scope) {
        var clientModal = this;
        clientModal.alerts = [];

        var initializeData = function() {
            if (client) {
                clientModal.title = 'Edición de Clientes';
                clientModal.key = Utils.pad(client.id, 4);
                clientModal.client = angular.copy(client);
            } else {
                clientModal.title = 'Registro de Clientes';
                clientModal.key = Utils.pad(nextId.id, 4);
                clientModal.client = {
                    name: '',
                    last_name: '',
                    mother_last_name: '',
                    rfc: ''
                };
            }
        }

        var validateData = function() {
            var response = true;
            if (!Utils.validateRFC(clientModal.client.rfc)) {
                response = false;
                clientModal.alerts.push({
                    text: 'El RFC es incorrecto',
                    type: 'danger'
                });
                setTimeout(function() {
                    clientModal.alerts.shift();
                    $scope.$apply();
                }, 3000);
            }
            return response;
        };

        clientModal.save = function() {
            if (validateData()) {
                clientModal.client.rfc = clientModal.client.rfc.toUpperCase();
                $uibModalInstance.close(clientModal.client);
            }
        };

        clientModal.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };


        initializeData();
    });
