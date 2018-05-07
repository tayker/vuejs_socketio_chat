var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

var chat = [];

io.on('connection', function (socket) {
    
    
    
    socket.on('chat', function (msg) {
        io.emit('chat', msg)
        chat = msg;
    });
    
    socket.on('listInit', function(socket){
        let msg = chat
        io.emit('listInit', msg)
    })
    
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});