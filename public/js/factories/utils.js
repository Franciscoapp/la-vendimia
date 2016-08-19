app.factory('Utils', function() {
    var Utils = {};

    Utils.pad = function(str) {
        str = str.toString();
        return str.length < 4 ? Utils.pad('0' + str) : str;
    };

    Utils.validateRFC = function(str) {
        var expresion = '^(([A-Z]|[a-z]){4})([0-9]{6})((([A-Z]|[a-z]|[0-9]){3}))';
        var validRfc = new RegExp(expresion);
        return str.match(validRfc);
    };

    return Utils;
});
