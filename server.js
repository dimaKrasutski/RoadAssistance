const Cluster = require('cluster');
 const  App = require('./app');

 
// const Express = require('express');

//  App.get('/socket', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });
 // const server = require('http').createServer(app);

if (Cluster.isMaster) {

// Count the machine's CPUs
    let cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (let i = 0; i < cpuCount/2; i += 1) {
        Cluster.fork();
    }
    // делаем новый WORKER
    Cluster.on('exit', function (worker) {
        console.log('Worker %d died :(', worker.id);
        Cluster.fork();
})
} else {
    const port = process.env.PORT || 3000;
    const server = App.listen(port, function() {
        console.log('Express server listening on port ' + port);
        console.log('Worker %d running!', Cluster.worker.id);
    });


    // const io = require('socket.io').listen(server);
    // var connections = [];

    // io.sockets.on('connection',(socket) => {
    //     connections.push(socket);
    //     console.log(' %s sockets is connected', connections.length);
    //
    //     socket.on('disconnect', () => {
    //         console.log('one socket is disconnected')
    //         connections.splice(connections.indexOf(socket), 1);
    //     });
    //
    //     socket.on('sending message', (message) => {
    //         console.log('Message is received :', message);
    //         io.sockets.emit('new message', {message: message});
    //     });
    // });
}

module.exports = ()=>{
  
};












