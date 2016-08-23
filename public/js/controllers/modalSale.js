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
                    total: 0,
                    date: moment().format('YYYY-MM-DD')
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

        var createMonthlyPayments = function() {
            var totalDebt = parseFloat(saleModal.info.total);
            var payCash = totalDebt / (1 + (saleModal.configuration.rate * saleModal.configuration.deadline / 100));
            var terms = [3, 6, 9, 12];

            saleModal.terms = terms.map(function(term) {
                var totalPay = payCash * (1 + (saleModal.configuration.rate * term / 100));
                var paymentAmount = totalPay / term;
                var savingAmount = totalDebt - totalPay;

                return {
                    number: term,
                    paymentAmount: paymentAmount.toFixed(2),
                    totalPay: totalPay.toFixed(2),
                    savingAmount: savingAmount.toFixed(2)
                };
            });
        };

        var checkArticle = function(articleId) {
            return _.find(saleModal.articles, function(article) {
                return articleId == article.id;
            });
        };

        saleModal.save = function() {
            if (saleModal.sale.total) {
                $uibModalInstance.close(saleModal.sale);
            } else {
                addAlert('Debe seleccionar un plazo para realizar el pago de su compra', 'danger');
            }
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
                saleModal.clientRFC = client.rfc;
            } else {
                saleModal.cleanClient();
            }
        };

        saleModal.cleanClient = function() {
            saleModal.sale.client_id = '';
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
            if (saleModal.configuration.rate) {
                if (saleModal.selectedArticle) {
                    if (checkArticle(saleModal.selectedArticle.id)) {
                        addAlert('El artículo ya se encuentra en la lista', 'danger');
                    } else {
                        if (saleModal.selectedArticle.existence) {
                            var newArticle = angular.copy(saleModal.selectedArticle);
                            newArticle.quantity = 1;
                            newArticle.calculatedPrice = calculateArticlePrice(newArticle);
                            newArticle.amount = newArticle.calculatedPrice * newArticle.quantity;
                            saleModal.articles.push(newArticle);
                            calculateInfo();

                        } else {
                            addAlert('El artículo seleccionado no cuenta con existencia, favor de verificar', 'danger');
                        }
                    }
                    saleModal.cleanArticle();
                    saleModal.selectedArticleText = '';
                } else {
                    addAlert('No a seleccionado un artículo', 'danger');
                }
            } else {
                addAlert('No cuenta con datos de configuración', 'danger');
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

        saleModal.removeArticle = function(index) {
            saleModal.articles.splice(index, 1);
            calculateInfo();
        };

        saleModal.next = function() {
            if (saleModal.configuration.rate) {
                if (saleModal.sale.client_id && saleModal.articles.length) {
                    saleModal.monthlyPaymentsSection = true;
                    createMonthlyPayments();
                } else {
                    addAlert('Los datos ingresados no son correctos, favor de verificar', 'danger');
                }
            } else {
                addAlert('No cuenta con datos de configuración', 'danger');
            }
        };

        initializeData();
    });
