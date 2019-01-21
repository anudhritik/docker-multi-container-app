// connection keys
const keys = require('./keys');

// getting connection to the redis server
// getting the redis client
const redis = require('redis');
// importing the redis client

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    // telling redis client if ever loose connection to redis server, attempts to retry connection every 1000 ms
    retry_strategy: () => 1000
});

const sub = redisClient.duplicate();

function fib(index) {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}

sub.on('message', (channel, message) => {
  redisClient.hset('values', message, fib(parseInt(message)));
});
sub.subscribe('insert');
