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

        var addAlert = function(text, type) {
            clientModal.alerts.push({
                text: text,
                type: type
            });
            setTimeout(function() {
                clientModal.alerts.shift();
                $scope.$apply();
            }, 3000);
        };

        var validateData = function() {
            var response = true;
            if (!clientModal.client.name) {
                response = false;
                addAlert('No es posible continuar, debe ingresar Nombre es obligatorio', 'danger');
            }
            if (!clientModal.client.last_name) {
                response = false;
                addAlert('No es posible continuar, debe ingresar Apellido Paterno es obligatorio', 'danger');
            }
            if (!clientModal.client.mother_last_name) {
                response = false;
                addAlert('No es posible continuar, debe ingresar Apellido Materno es obligatorio', 'danger');
            }
            if (!clientModal.client.rfc) {
                response = false;
                addAlert('No es posible continuar, debe ingresar RFC es obligatorio', 'danger');
            }
            if (clientModal.client.rfc && !Utils.validateRFC(clientModal.client.rfc)) {
                response = false;
                addAlert('No es posible continuar, el RFC es incorrecto', 'danger');
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
