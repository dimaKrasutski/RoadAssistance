const Cluster = require('cluster');
 const  App = require('./app');

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
}

module.exports = ()=>{
  
};












