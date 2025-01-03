const http = require('http');

const server = http.createServer((req,res)=> {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello from httpmodule');
})

const port = 3000;
server.listen(port, () => {
    console.log(`Listening on port ${port}`)
})