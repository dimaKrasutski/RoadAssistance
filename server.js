var cluster = require('cluster');


if (cluster.isMaster) {

// Count the machine's CPUs
    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

    cluster.on('exit', function (worker) {

        // Replace the dead worker,
        // we're not sentimental
        console.log('Worker %d died :(', worker.id);
        cluster.fork();

// Code to run if we're in a worker process
})
} else {

    var app = require('./app');
    var port = process.env.PORT || 3000;

    var server = app.listen(port, function() {
        console.log('Express server listening on port ' + port);
        console.log('Worker %d running!', cluster.worker.id);
    });

}





