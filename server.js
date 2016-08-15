var express = require('express');
var app = express();
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/public/views/index.html');
});

app.all('/configuration/:id', function(req, res) {
    console.log(req.params);
    console.log(req.body);
});

app.listen(3000, function() {
    console.log('Listening port 3000');
});
