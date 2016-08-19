app.controller('ModalArticleController',
    function($scope, $uibModalInstance, article, nextId, Utils, $scope) {
        var articleModal = this;
        articleModal.alerts = [];

        var initializeData = function() {
            if (article) {
                articleModal.title = 'Edición de Artículos';
                articleModal.key = Utils.pad(article.id, 4);
                articleModal.article = angular.copy(article);
            } else {
                articleModal.title = 'Registro de Artículos';
                articleModal.key = Utils.pad(nextId.id, 4);
                articleModal.article = {
                    description: '',
                    model: '',
                    price: '',
                    existence: ''
                };
            }
        }

        var addAlert = function(text, type) {
            articleModal.alerts.push({
                text: text,
                type: type
            });
            setTimeout(function() {
                articleModal.alerts.shift();
                $scope.$apply();
            }, 3000);
        };

        var validateData = function() {
            var response = true;
            if (!articleModal.article.description) {
                response = false;
                addAlert('No es posible continuar, debe ingresar Descripción es obligatorio', 'danger');
            }
            if (!articleModal.article.model) {
                response = false;
                addAlert('No es posible continuar, debe ingresar Modelo es obligatorio', 'danger');
            }
            if (typeof articleModal.article.price !== 'number') {
                response = false;
                addAlert('No es posible continuar, debe ingresar Precio es obligatorio', 'danger');
            }
            if (typeof articleModal.article.existence !== 'number') {
                response = false;
                addAlert('No es posible continuar, debe ingresar Existencia es obligatorio', 'danger');
            }
            if (typeof articleModal.article.price === 'number' && (articleModal.article.price < 0.000001 || articleModal.article.price > 9999999999.9999)) {
                response = false;
                addAlert('No es posible continuar, el Precio debe estar entre el rango de "0.000001" a "9999999999.9999"', 'danger');
            }
            if (typeof articleModal.article.existence === 'number' && (articleModal.article.existence < 0 || articleModal.article.existence > 2147483647)) {
                response = false;
                addAlert('No es posible continuar, la Existencia debe estar entre el rango de "0" a "2147483647"', 'danger');
            }
            return response;
        };

        articleModal.save = function() {
            if (validateData()) {
                $uibModalInstance.close(articleModal.article);
            }
        };

        articleModal.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

        initializeData();
    });
