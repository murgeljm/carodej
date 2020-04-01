var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const port = 2020;
var numOfCon = 0;
app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/index.html');
});
app.use('/client', express.static(__dirname + '/client'));

io.on('connection', function(socket){
  console.log('new socket connection');
  numOfCon = numOfCon + 1;
  io.emit('new connection', numOfCon);
  socket.on('disconnect', function(){
    console.log('socket disconnected');
  });
});

http.listen(port, function(){
  console.log('listening on port: ' + port);
});
