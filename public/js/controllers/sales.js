app.controller('salesController', ['$routeParams',
    function salesController($routeParams) {
        var sales = this;
        sales.$routeParams = $routeParams;

        sales.initializeData = function() {

        };

        sales.initializeData();
    }
]);
