const redis = require('redis');

const client = redis.createClient({
    host: 'localhost',
    port: 6379
});

client.on('error', (error) => {
    console.error(`Error connecting to Redis: ${error}`);
});

client.connect();

async function redisDataStructure() {
    try {
        // Strings -> SET, GET, MSET, MGET
        await client.set ("user:name", "Eddie Wong");
        const name = await client.get("user:name");
        console.log(name);

        await client.mSet(["user:email", "jeddiewong@yahoo.com", "user:age", "60", "user:country", "MY"]);
        const [email, age, country] = await client.mGet(["user:email", "user:age", "user:country"]);

        console.log(email, age, country);

        // Lists -> LPUSH, RPUSH, LRANGE, LPOP, RPOP

        await client.lPush('notes', ['note 1', 'note 2', 'note 3']);
        const extractAllNotes = await client.lRange('notes', 0, -1);
        console.log(extractAllNotes);

        const firstNote = await client.lPop('notes')
        console.log('firstNote', firstNote);

        const remaningNotes = await client.lRange("notes", 0, -1)
        console.log('remaningNotes', remaningNotes);

        // sets -> SADD, SMEMBERS, SISMEMBER, SREM
        // SADD - Add Elements to a Set
        // SMEMBERS - Get All Elements of a Set
        // SISMEMBER - Check if an Element Exists in a Set
        // SREM - Remove Elements from a Set

        await client.sAdd("user:nickName", ["john", "varun", "xyz"]);
        const extractUserNicknames = await client.sMembers("user:nickName");

        console.log(extractUserNicknames);
        const isVarunIsOneOfUserNickName = await client.sIsMember(
          "user:nickName",
          "varun"
        );
        console.log(isVarunIsOneOfUserNickName);

        await client.sRem("user:nickName", "xyz");

        const getUpdatedUserNickNames = await client.sMembers("user:nickName");
        console.log(getUpdatedUserNickNames);

        // Sorted Sets -> ZADD, ZRANGE, ZREM, ZRANK
        // ZADD - Add Elements to a Sorted Set
        // ZRANGE - Get All Elements of a Sorted Set (with optional scores)
        // ZREM - Remove Elements from a Sorted Set
        // ZRANK - Get Rank of an Element in a Sorted Set

        await client.zAdd("cart", [
          {
            score: 100,
            value: "Cart 1",
          },
          {
            score: 150,
            value: "Cart 2",
          },
          {
            score: 10,
            value: "Cart 3",
          },
        ]);

        const getCartItems = await client.zRange("cart", 0, -1);
        console.log('cart', getCartItems);

        const extractAllCartItemsWithScore = await client.zRangeWithScores(
          "cart",
          0,
          -1
        );
        console.log(extractAllCartItemsWithScore);

        const cartTwoRank = await client.zRank("cart", "Cart 2");
        console.log(cartTwoRank);

        //Hashes -> HSET, HGET, HGETALL, HDEL
        // HSET - Set a Hash Field
        // HGET - Get a Hash Field
        // HGETALL - Get All Fields and Values of a Hash
        // HDEL - Remove a Hash Field

        await client.hSet("product:1", {
            name: "Product 1",
            description: "product one description",
            rating: "5",
        });

        const getProductRating = await client.hGet("product:1", "rating");
        console.log(getProductRating);

        const getProductDetails = await client.hGetAll("product:1");
        console.log(getProductDetails);

        await client.hDel("product:1", "rating");

        const updatedProductDetails = await client.hGetAll("product:1");
        console.log(updatedProductDetails);
    } catch(error) {
        console.error(`Error performing Redis operation: ${error}`);
    } finally {
        await client.quit();
    }
}

redisDataStructure();
