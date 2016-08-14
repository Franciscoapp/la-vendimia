app.controller('mainController', ['$route', '$routeParams', '$location',
    function mainController($route, $routeParams, $location) {
        var main = this;
        main.$route = $route;
        main.$location = $location;
        main.$routeParams = $routeParams;

        main.initializeData = function() {
            main.date = moment().format('DD/MM/YYYY');
        };

        main.initializeData();
    }
]);