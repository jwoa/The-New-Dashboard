var express = require('express');
var app = require('express')();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/pair.html');
});

io.on('connection', function(socket) {
    console.log('a user connected', socket.id);

    socket.on('brush', function(brushData) {
        console.log('brush', brushData);
        socket.broadcast.emit('brush', brushData);
    });
});

http.listen(3000, function() {
    console.log('Listening on 3000');
});
