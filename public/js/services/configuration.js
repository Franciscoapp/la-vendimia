app.factory('Configuration', ['$resource',
    function($resource) {
        return $resource('/configuration/:configurationId', {
            configurationId: '1'
        });
    }
]);
