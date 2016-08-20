app.factory('Sale', ['$resource',
    function($resource) {
        return $resource('/sale/:saleId', {
            saleId: '@id'
        }, {}, { query: { method: 'GET', isArray: true } });
    }
]);

app.factory('SaleNextId', ['$resource',
    function($resource) {
        return $resource('/sale/nextId');
    }
]);
