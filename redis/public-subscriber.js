const redis = require('redis');

const client = redis.createClient({
    host: 'localhost',
    port: 6379
});

client.on('error', (error) => {
    console.error(`Error connecting to Redis: ${error}`);
});

client.connect();

async function testAdditionalFeatures() {
    try {
        const subscriber = client.duplicate(); // create a new client that share the same connection
        await subscriber.connect() // connect to redis server for the subscriber

        await subscriber.subscribe("dummy-channel", (message, channel) => {
          console.log(`Received message from ${channel}: ${message}`);
        });

        // publish message to the dummy channel
        await client.publish("dummy-channel", "SOme dummy data from publiser");
        await client.publish("dummy-channel", "Some new message again from publiser");

        await new Promise((resolve) => setTimeout(resolve, 3000));

        await subscriber.unsubscribe("dummy-channel");
        await subscriber.quit(); // close the subscriber connection

        // pipelining && transactions
        const multi = client.multi();

        // Transactions Example
        multi.set('key-transaction1', 'value1')
        multi.set('key-transaction2', 'value2')
        multi.get('key-transaction1')
        multi.get('key-transaction2')

        // Transaction 事务的特点：事务中的操作是原子性的，要么全部成功，要么全部失败。
        const transactionResults = await multi.exec();
        console.log("Transaction Results:", transactionResults);

        // Pipelining Example
        const pipeline = client.multi();
        pipeline.set("key-pipeline1", "value1");
        pipeline.set("key-pipeline2", "value2");
        pipeline.get("key-pipeline1");
        pipeline.get("key-pipeline2");

        // 管道的优点：减少网络往返时间，提高性能
        const pipelineResults = await pipeline.exec();
        console.log("Pipeline Results:", pipelineResults);

        // Batch Data Operation Example
        const batchPipeline = client.multi();
        for (let i = 0; i < 1000; i++) {
            batchPipeline.set(`user:${i}:action`, `Action ${i}`);
        }
        await batchPipeline.exec();

        // 通过 batchPipeline.exec() 一次性执行所有命令。
        //
        // 适用场景：需要快速插入大量数据时，使用管道可以显著提高性能。

        // Account Balance Example
        const accountPipeline = client.multi();
        accountPipeline.decrBy('account:1234:balance', 100); // 从账户 1234 扣除 100
        accountPipeline.incrBy('account:0000:balance', 100); // 向账户 0000 增加 100

        const accountResults = await accountPipeline.exec();
        console.log("Account Results:", accountResults);

        // Shopping Cart Example
        const cartPipeline = client.multi();
        cartPipeline.hIncrBy('cart:1234', 'item_count', 1); // 增加商品数量
        cartPipeline.hIncrBy('cart:1234', 'total_price', 10); // 增加总价
        await cartPipeline.exec();

        // Performance Test
        console.time("without pipelining");
        for (let i = 0; i < 1000; i++) {
            await client.set(`user${i}`, `user_value${i}`);
        }
        console.timeEnd("without pipelining");

        console.time("with pipelining");
        const performancePipeline = client.multi();
        for (let i = 0; i < 1000; i++) {
            performancePipeline.set(`user_pipeline_key${i}`, `user_pipeline_value${i}`);
        }
        await performancePipeline.exec();
        console.timeEnd("with pipelining");
    } catch (error) {
        console.error(`Error executing Redis commands: ${error}`);
    } finally {
        client.quit();
    }
}

testAdditionalFeatures();
