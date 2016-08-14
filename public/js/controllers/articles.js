app.controller('articlesController', ['$routeParams',
    function articlesController($routeParams) {
        var articles = this;
        articles.$routeParams = $routeParams;

        articles.initializeData = function() {

        };

        articles.initializeData();
    }
]);
