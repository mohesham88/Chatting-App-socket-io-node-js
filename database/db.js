const  redis = require('redis');
const createAdapter = require("@socket.io/redis-adapter").createAdapter;

// adding redis to the project

const client = redis.createClient({
    password: process.env.DATABASEPASS,
    socket: {
        host: 'redis-11125.c266.us-east-1-3.ec2.cloud.redislabs.com',
        port: 11125
    }
});


async function connectDB (io){
  await client.connect();
  const subClient = client.duplicate();
  io.adapter(createAdapter(client, subClient));
}

client.on('ready', () => {
  console.log('database connection established');
})

client.on('error', (err) => {
  console.error(err);
});





module.exports = {connectDB, client}