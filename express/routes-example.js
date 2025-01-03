const express = require('express');
const app = express();

// root route
app.get('/', (req, res) => {
    res.send('Welcome')
})

// get all products
app.get('/products', (req,res)=> {
    const products = [
        {id: 1, name: 'Product 1', price: 10.99},
        {id: 2, name: 'Product 2', price: 20.99},
        {id: 3, name: 'Product 3', price: 30.99},
        //... more products here...
    ]

    res.json(products);
})

// get a single product
app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id)

    const products = [
        {id: 1, name: 'Product 1', price: 10.99},
        {id: 2, name: 'Product 2', price: 20.99},
        {id: 3, name: 'Product 3', price: 30.99},
        //... more products here...
    ]

    const getSingleProduct = products.find((product) => product.id === productId)

    if (getSingleProduct) {
        res.json(getSingleProduct);
    } else {
        res.status(404).send("product is not found! please try with different id");
    }
})

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
