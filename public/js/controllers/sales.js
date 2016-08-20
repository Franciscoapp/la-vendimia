app.controller('salesController', ['$routeParams', '$q', 'Sale', '$uibModal', 'SaleNextId', 'Utils', '$scope',
    function salesController($routeParams, $q, Sale, $uibModal, SaleNextId, Utils, $scope) {
        var sales = this;
        sales.$routeParams = $routeParams;
        sales.alerts = [];
        sales.sales = [];

        var getSales = function() {
            var deferred = $q.defer();
            Sale.query({}, function(result) {
            	_.each(result, function (sale) {
                    sale.key = Utils.pad(sale.id, 4);
            		sale.client_id = Utils.pad(sale.client_id, 4);
                    sale.date = moment(sale.date).format('YYYY-MM-DD');
            	});
                sales.sales = result;
                deferred.resolve(true);
            });
            return deferred.promise;
        };

        var saveSale = function(sale) {
            Sale.save(sale, function(savedSale) {
            	sales.alerts.push({
                    text: 'Bien Hecho, Tu venta ha sido registrada correctamente',
                    type: 'success'
                });
                setTimeout(function() {
                    sales.alerts.shift();
                    $scope.$apply();
                }, 3000);
                getSales();
            });
        };

        var initializeData = function() {
            getSales();
        };

        var openModal = function(sale, id) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'views/modals/sale.html',
                controller: 'ModalSaleController as saleModal',
                size: 'lg',
                resolve: {
                    sale: sale,
                    nextId: id
                }
            });

            modalInstance.result.then(function(newSale) {
                saveSale(newSale);
            });
        };

        sales.openModal = function(sale) {
            if (sale) {
                openModal(sale, sale.id);
            } else {
                SaleNextId.get({}, function(id) {
                    openModal(sale, id);
                });
            }

        };

        initializeData();
    }
]);
