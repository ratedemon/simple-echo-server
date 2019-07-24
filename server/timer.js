const moment = require('moment');
const redis = require("redis");
const client = redis.createClient();
const { promisify } = require('util');
const getAsync = promisify(client.get).bind(client);

client.on('connect', () => {
  console.log(`Redis client connected`);
});

client.on('error', (err) => {
  console.log(`Something went wrong: ${err}`);
});

client.keys('*', async (err, keys) => {
  if (err) {
    return console.log(err);
  }

  const promises = keys.map(key => {
    return getAsync(key);
  });

  const arr = await Promise.all(promises);

  arr.forEach((val, index) => {
    addToQueue(keys[index], val, true);
  });
});

function addToQueue(date, message, manually = false) {
  const now = moment();
  const future = moment(date);

  const miliseconds_difference = future.diff(now, 'miliseconds');
  const seconds_difference = future.diff(now, 'seconds');

  if (miliseconds_difference <= 0) {
    setTimeout(() => {
      console.log(`Message: ${message}`);
    }, 0);
    return;
  }
  if (!manually) {
    client.set(date, message, 'EX', seconds_difference);
  }
  
  setTimeout(() => {
    console.log(`Message: ${message}`);
  }, miliseconds_difference);
}

module.exports = addToQueue;