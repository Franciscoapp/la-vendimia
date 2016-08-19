app.factory('Article', ['$resource',
    function($resource) {
        return $resource('/article/:articleId', {
            articleId: '@id'
        }, {}, { query: { method: 'GET', isArray: true } });
    }
]);

app.factory('ArticleNextId', ['$resource',
    function($resource) {
        return $resource('/article/nextId');
    }
]);
