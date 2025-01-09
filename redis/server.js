const redis = require('redis');

const client = redis.createClient({
    host: 'localhost',
    port: 6379
});

//event listener
// client.on('connect', () => {
//     console.log('Connected to Redis...');
// });

client.on('error', (error) => {
    console.error(`Error connecting to Redis: ${error}`);
});

async function testRedisConnection() {
    try {
        await client.connect();
        console.log('Connected to Redis...');

        await client.set("key", "eddie");

        const extractValue = await client.get('key')

        console.log(extractValue);

        const deleteCount = await client.del('key');
        console.log(deleteCount);

        const extractUpdatedValue = await client.get('name')
        console.log(extractUpdatedValue); // should be null as the key was deleted

        await client.set('count', 100)
        const incrementCount = await client.incr('count')
        console.log(incrementCount);

        const decrementCount = await client.decr('count')
        console.log(decrementCount);

        await client.decr('count')
        await client.decr('count')
        await client.decr('count')
        await client.decr('count')
        await client.decr('count')
        console.log(await client.get('count'));
    } catch(error) {
        console.error(`Error connecting to Redis: ${error}`);
    } finally {
        await client.quit();
    }
}

// const testRedisConnection = async() => {
//     xxx
// }

testRedisConnection();
