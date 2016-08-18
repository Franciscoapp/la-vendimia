app.factory('Client', ['$resource',
    function($resource) {
        return $resource('/client/:clientId', {
            clientId: '@id'
        }, {}, { query: { method: 'GET', isArray: true } });
    }
]);

app.factory('ClientNextId', ['$resource',
    function($resource) {
        return $resource('/client/nextId');
    }
]);
