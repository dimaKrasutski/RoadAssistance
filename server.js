const cluster = require('cluster');
 const  app = require('./app');

var express = require('express');
app.get('/socket', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
 // const server = require('http').createServer(app);

if (cluster.isMaster) {

// Count the machine's CPUs
    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
    // делаем новый WORKER
    cluster.on('exit', function (worker) {
        console.log('Worker %d died :(', worker.id);
        cluster.fork();
})
} else {
    var port = process.env.PORT || 3000;
    var server = app.listen(port, function() {
        console.log('Express server listening on port ' + port);
        console.log('Worker %d running!', cluster.worker.id);
    });
    const io = require('socket.io').listen(server);

    var connections = [];

    io.sockets.on('connection',(socket) => {
        connections.push(socket);
        console.log(' %s sockets is connected', connections.length);

        socket.on('disconnect', () => {
            console.log('one socket is disconnected')
            connections.splice(connections.indexOf(socket), 1);
        });

        socket.on('sending message', (message) => {
            console.log('Message is received :', message);
            io.sockets.emit('new message', {message: message});
        });
    });
}







