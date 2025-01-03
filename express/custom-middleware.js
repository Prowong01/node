const express = require('express');
const app = express();

// 在你的代码中，写了 next()，所以请求能够正常传递到路由处理器，客户端可以 GET 到响应。
//
// 如果删除 next()，请求会卡在 requestTimestampLogger 中间件，客户端不会收到响应。
//
// next() 的作用是将控制权传递给下一个中间件或路由处理器，确保请求能够继续处理。

const requestTimestampLogger = (req,res,next) => {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} - ${req.method} - ${req.url}`);
    // next();
}

app.use(requestTimestampLogger)

app.get("/", (req, res) => {
    res.send("Home page");
});


app.get('/about', (req, res)=> {
    res.send('About Page');
})

app.listen(3000, ()=> {
    console.log('Server is now running on port 3000')
})
