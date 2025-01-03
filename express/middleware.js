const express = require('express');
const app = express();

//define middleware functions
const myFirstMiddleware = (req,res,next) => {
    console.log('The first middleware will run on every request');

    next();
};

app.use(myFirstMiddleware)

app.get('/about', (req, res)=> {
    res.send('About Page');
})

app.listen(3000, ()=> {
    console.log('Server is now running on port 3000')
})
