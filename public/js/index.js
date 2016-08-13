angular.module('app', ['ngAnimate', 'ngTouch', 'ui.bootstrap'])
    .controller('mainController', function() {
        var main = this;

        var initializeData = function() {
            main.date = moment().format('DD/MM/YYYY');
        };

        initializeData();
    });
