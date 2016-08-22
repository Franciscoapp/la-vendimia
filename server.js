var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.set('port', process.env.PORT || 8080);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

fs.readdirSync(__dirname + '/server/controllers').forEach(function(file) {
    var controller = require("./server/controllers/" + file);

    for (var actionName in controller) {
        controller[actionName](app);
    }
});

app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/public/views/index.html');
});

app.listen(8080, function() {
    console.log('Listening port ' + app.get('port'));
});
