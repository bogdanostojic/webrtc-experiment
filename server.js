var express = require('express');
var app = express();
var server = app.listen(9090);

app.use(express.static('public'));

console.log('Server is running on port :9090');

var io = require('socket.io')(server);

io.on('connection', newConnection);
console.log('checkout!')
function newConnection(socket) {
    console.log(socket.id)
}


