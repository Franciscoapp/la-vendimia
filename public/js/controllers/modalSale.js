app.controller('ModalSaleController',
    function($scope, $uibModalInstance, sale, nextId, Utils, $scope, $http, $q, Configuration) {
        var saleModal = this;
        saleModal.alerts = [];

        var getConfiguration = function() {
            var deferred = $q.defer();
            Configuration.get({}, function(configuration) {
                saleModal.configuration = configuration;
                deferred.resolve(true);
            });
            return deferred.promise;
        };

        var initializeData = function() {
            $q.all([getConfiguration()]).then(function() {
                saleModal.title = 'Registro de Artículos';
                saleModal.key = Utils.pad(nextId.id, 4);
                saleModal.articles = [];
                saleModal.sale = {
                    client_id: '',
                    client_name: '',
                    total: 0,
                    date: ''
                };
                saleModal.info = {
                    hitch: '0.00',
                    hitchBonus: '0.00',
                    total: '0.00'
                };
            });

        };

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

        var calculateArticlePrice = function(article) {
            return article.price * (1 + (saleModal.configuration.rate * saleModal.configuration.deadline / 100));
        };

        var calculateInfo = function() {
            var totalAmount = 0;
            _.each(saleModal.articles, function(article) {
                totalAmount += article.amount;
            });
            var hitch = (saleModal.configuration.hitch / 100) * totalAmount;
            var hitchBonus = hitch * (saleModal.configuration.rate * saleModal.configuration.deadline / 100)
            var total = totalAmount - hitch - hitchBonus;

            saleModal.info.hitch = hitch.toFixed(2);
            saleModal.info.hitchBonus = hitchBonus.toFixed(2);
            saleModal.info.total = total.toFixed(2);
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

        saleModal.addArticle = function() {
            if (saleModal.selectedArticle) {
                if (saleModal.selectedArticle.existence) {
                    var newArticle = angular.copy(saleModal.selectedArticle);
                    newArticle.quantity = 1;
                    newArticle.calculatedPrice = calculateArticlePrice(newArticle);
                    newArticle.amount = newArticle.price * newArticle.quantity;
                    saleModal.articles.push(newArticle);
                    calculateInfo();
                } else {
                    addAlert('El artículo seleccionado no cuenta con existencia, favor de verificar', 'danger');
                }
                saleModal.cleanArticle();
                saleModal.selectedArticleText = '';
            } else {
                addAlert('No a seleccionado un artículo', 'danger');
            }
        };

        saleModal.calculateArticleAmout = function(article) {
            if (article.quantity) {
                article.amount = article.quantity * article.calculatedPrice;
            } else {
                addAlert('La cantidad del artículo debe ser mayor a 0 y menor o igual a ' + article.existence, 'danger');
                article.quantity = 1;
            }
            calculateInfo();
        };

        saleModal.removeArticle = function (index) {
        	saleModal.articles.splice(index, 1);
        	calculateInfo();
        };

        initializeData();
    });
