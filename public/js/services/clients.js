app.factory('Client', ['$resource',
    function($resource) {
        return $resource('/client/:clientId', {
            clientId: '@id'
        }, {}, { query: { method: 'GET', isArray: true } });
    }
]);
