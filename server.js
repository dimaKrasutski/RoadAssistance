var cluster = require('cluster');
var app = require('./app');

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

}





