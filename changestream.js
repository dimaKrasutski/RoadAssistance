const { ReplSet } = require('mongodb-topology-manager');
const mongodb = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://krasutski:123_Destination@ds147450.mlab.com:47450/road_assistance_database',{ useNewUrlParser: true });

run().catch(error => console.error(error));

async function run() {
    console.log(new Date(), 'start');
    const bind_ip = 'localhost';
    // Starts a 3-node replica set on ports 31000, 31001, 31002, replica set
    // name is "rs0".
    const replSet = new ReplSet('mongod', [
        { options: { port: 31000, dbpath: `${__dirname}/data/db/31000`, bind_ip } },
        { options: { port: 31001, dbpath: `${__dirname}/data/db/31001`, bind_ip } },
        { options: { port: 31002, dbpath: `${__dirname}/data/db/31002`, bind_ip } }
    ], { replSet: 'rs0' });

    // Initialize the replica set
    await replSet.purge();
    await replSet.start();
    console.log(new Date(), 'Replica set started...');

    // Connect to the replica set
    const uri = 'mongodb://localhost:31000,localhost:31001,localhost:31002/' +
        'test?replicaSet=rs0';
    const client = await mongodb.MongoClient.connect(uri);
    const db = client.db('test');

    // Create a change stream. The 'change' event gets emitted when there's a
    // change in the database
    db.collection('Problem').watch().
    on('change', data => console.log(new Date(), data));

    // Insert a doc, will trigger the change stream handler above
    console.log(new Date(), 'Inserting doc');
    await db.collection('Problem').insertOne({ name: 'Axl Rose' });
    console.log(new Date(), 'Inserted doc');
}