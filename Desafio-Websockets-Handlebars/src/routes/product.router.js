import { Router } from 'express'
import ProductManager from '../managers/ProductManager.js';
const router = Router()
const Manager = new ProductManager();

// definiendo los distos métodos de crud de productos
router.get('/', async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;

        let products = await Manager.getProducts();
        console.log(products);
        if (limit !== undefined) {
            products = products.slice(0, limit);
        }

        res.status(200).send(products);
    } catch (error) {
        console.error(error);
        res.send('Error');
    }
});
router.get('/:pid', async (req, res) => {
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
router.post('/', async (req, res) => {
    const { title, description, price, thumbail, code, stock } = req.body
    try {
        Manager.addProduct(title, description, price, thumbail, code, stock)
        res.status(200).send({ status: 'success1' })

    } catch (error) {
        console.error(error)
    }
})
router.put('/:pid', async (req, res) => {
    const { pid } = req.params
    const productToUpdate = req.body
    Manager.updateProduct(parseInt(pid), productToUpdate);
    console.log(Manager.updateProduct.products)
    try {
        Manager.updateProduct(pid, productToUpdate);
        console.log(Manager.updateProduct.products)
        res.status(200).send({ status: 'success update' })
    } catch (error) {
        console.error(error)
    }
})

router.delete('/:pid', async (req, res) => {
    const { pid } = req.params
    try {
        Manager.deleteProduct(parseInt(pid))
        res.send({ status: 'success delete' })
    } catch (error) {
        console.error(error)
    }
})
export default router