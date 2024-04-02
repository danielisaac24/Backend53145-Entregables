const express = require('express');
const ProductManager = require('./ProductManager');
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const Manager = new ProductManager();

app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;

        let products = await Manager.getProducts();
        if (limit !== undefined) {
            products = products.slice(0, limit);
        }

        res.status(200).send(products);
    } catch (error) {
        console.error(error);
        res.send('Error');
    }
});
app.get('/products/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        let products = await Manager.getProducts();
        const product = products.find((product) => product.id === parseInt(pid));
        if (product) {
            res.send(product);
        } else {
            res.send(error);
        }
        
    } catch (error) {
        console.error(error);
        res.send('No existe ese ID');
    }
});

app.listen(8080, error => {
    if (error) console.log(error);
    console.log('Servidor escuchando en el puerto 8080');
});
