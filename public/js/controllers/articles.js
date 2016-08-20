app.controller('articlesController', ['$routeParams', '$q', 'Article', '$uibModal', 'ArticleNextId', 'Utils', '$scope',
    function articlesController($routeParams, $q, Article, $uibModal, ArticleNextId, Utils, $scope) {
        var articles = this;
        articles.$routeParams = $routeParams;
        articles.alerts = [];
        articles.articles = [];

        var getArticles = function() {
            var deferred = $q.defer();
            Article.query({}, function(result) {
            	_.each(result, function (article) {
            		article.key = Utils.pad(article.id, 4);
            	});
                articles.articles = result;
                deferred.resolve(true);
            });
            return deferred.promise;
        };

        var saveArticle = function(article) {
            Article.save(article, function(savedArticle) {
            	articles.alerts.push({
                    text: 'Bien Hecho. El artículo ha sido registrado correctamente',
                    type: 'success'
                });
                setTimeout(function() {
                    articles.alerts.shift();
                    $scope.$apply();
                }, 3000);
                getArticles();
            });
        };

        var initializeData = function() {
            getArticles();
        };

        var openModal = function(article, id) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'views/modals/article.html',
                controller: 'ModalArticleController as articleModal',
                size: 'md',
                resolve: {
                    article: article,
                    nextId: id
                }
            });

            modalInstance.result.then(function(newArticle) {
                saveArticle(newArticle);
            });
        };

        articles.openModal = function(article) {
            if (article) {
                openModal(article, article.id);
            } else {
                ArticleNextId.get({}, function(id) {
                    openModal(article, id);
                });
            }

        };

        initializeData();
    }
]);
