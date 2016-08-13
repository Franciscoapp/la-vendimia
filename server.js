var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/views/index.html');
});

app.listen(3000, function() {
    console.log('Listening port 3000');
});
