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
                return response.data.clients.map(function(client) {
                    client.key = Utils.pad(client.id);
                    return client;
                });
            });
        };

        saleModal.selectClient = function(client) {
            if (client) {
                saleModal.sale.client_id = client.id;
                saleModal.sale.client_name = client.name + ' ' + client.last_name + ' ' + client.mother_last_name;
                saleModal.clientRFC = client.rfc;
            } else {
                saleModal.cleanUser();
            }
        };

        saleModal.cleanClient = function() {
            saleModal.sale.client_id = '';
            saleModal.sale.client_name = '';
            saleModal.clientRFC = '';
        };

        saleModal.getArticle = function(text) {
            return $http.get('/article/findByDescription', {
                params: {
                    text: text
                }
            }).then(function(response) {
                return response.data.articles;
            });
        };

        saleModal.selectArticle = function(article) {
            if (article) {
                saleModal.selectedArticle = article;
            } else {
                saleModal.cleanArticle();
            }
        };

        saleModal.cleanArticle = function() {
            saleModal.selectedArticle = '';
        };

        saleModal.addArticle = function () {
        	// body...
        };
        
        initializeData();
    });
