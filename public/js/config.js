app.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/ventas', {
                templateUrl: '/views/sales.html',
                controller: 'salesController',
                controllerAs: 'sales'
            })
            .when('/clientes', {
                templateUrl: '/views/clients.html',
                controller: 'clientsController',
                controllerAs: 'clients'
            })
            .when('/articulos', {
                templateUrl: '/views/articles.html',
                controller: 'articlesController',
                controllerAs: 'articles'
            })
            .when('/configuracion', {
                templateUrl: '/views/configuration.html',
                controller: 'configurationController',
                controllerAs: 'configuration'
            })
            .otherwise('/');

        $locationProvider.html5Mode(true);
    }
]);
