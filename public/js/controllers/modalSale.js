app.controller('ModalSaleController',
    function($scope, $uibModalInstance, sale, nextId, Utils, $scope, $http) {
        var saleModal = this;
        saleModal.alerts = [];

        var initializeData = function() {
            saleModal.title = 'Registro de Artículos';
            saleModal.key = Utils.pad(nextId.id, 4);
            saleModal.sale = {
                client_id: '',
                client_name: '',
                total: '',
                date: ''
            };
        }

        var addAlert = function(text, type) {
            saleModal.alerts.push({
                text: text,
                type: type
            });
            setTimeout(function() {
                saleModal.alerts.shift();
                $scope.$apply();
            }, 3000);
        };

        saleModal.save = function() {
            $uibModalInstance.close(saleModal.sale);
        };

        saleModal.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

        saleModal.getClient = function(text) {
            return $http.get('/client/findByName', {
                params: {
                    name: text
                }
            }).then(function(response) {
                return response.data.clients;
            });
        };

        initializeData();
    });
