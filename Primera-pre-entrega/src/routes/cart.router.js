import { Router } from 'express'
import cartManager from '../cartMager.js'
const router = Router()
const Manager = new cartManager();


router.get('/', async (req, res) => {
    let carts = await Manager.getCarts()
    try {
        res.status(200).send(carts)

    } catch (error) {
        console.error(error)
    }
});
// Ruta para crear un nuevo carrito
router.post('/', async (req, res) => {
    try {
        await Manager.addCart()
        res.status(200).send({ status: 'success' })
    } catch (error) {
        console.error(error)
    }
});

// Ruta para obtener los productos de un carrito específico
router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
       let carts = await Manager.getCarts()
        const cart = carts.find(cart => cart.id === parseInt(cid));
        if (!cart) {
            return res.status(404).send({ error: 'Carrito no encontrado' });
        }
        res.send(cart);
    } catch (error) {
        console.error(error)
    }
});

// Ruta para agregar un producto a un carrito específico
router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
        await Manager.addProductToCart(cid,pid,quantity);
        res.status(200).send(carts)
    } catch (error) {
        
    }

});

export default router



// import { Router } from 'express'
// import fs from 'fs';
// const router = Router()

// // Simulando una base de datos de carritos
// let carts = [];
// let cartIdCounter = 1;


// router.get('/', async (req, res) => {
//     if (!carts) {
//         return res.status(404).send({ error: 'Carrito no encontrado' });
//     }
//     try {
//         const dataJson = await fs.promises.readFile('./src/carts.json', 'utf-8');
//         carts = JSON.parse(dataJson);
//         res.status(200).send(carts)

//     } catch (error) {
//         console.error(error)
//     }
// });
// // Ruta para crear un nuevo carrito
// router.post('/', async (req, res) => {
//     try {
//         const newCart = {
//             id: cartIdCounter++,
//             products: []
//         };
//         carts.push(newCart);
//         await fs.promises.writeFile('./src/carts.json', JSON.stringify(carts, null, "\t"), "utf-8");
//         res.status(201).send(newCart);
//     } catch (error) {
//         console.error(error)
//     }

// });

// // Ruta para obtener los productos de un carrito específico
// router.get('/:cid', async (req, res) => {
//     const { cid } = req.params;
//     const dataJson = await fs.promises.readFile('./src/carts.json', 'utf-8');
//     carts = JSON.parse(dataJson);
//     const cart = carts.find(cart => cart.id === parseInt(cid));
//     if (!cart) {
//         return res.status(404).send({ error: 'Carrito no encontrado' });
//     }
//     res.send(cart);
// });

// // Ruta para agregar un producto a un carrito específico
// router.post('/:cid/product/:pid', async (req, res) => {
//     const { cid, pid } = req.params;
//     const { id, quantity } = req.body;
//     const dataJson = await fs.promises.readFile('./src/carts.json', 'utf-8');
//     carts = JSON.parse(dataJson);
//     const cart = carts.find(cart => cart.id === parseInt(cid));
//     if (!cart) {
//         return res.status(404).send({ error: 'Carrito no encontrado' });
//     }

//     let productIndex = cart.products.findIndex(product => product.id === pid);
//     console.log(productIndex);
//     if (productIndex !== -1) {
//         // Si el producto ya existe en el carrito, incrementar la cantidad
//         cart.products[productIndex].quantity += quantity;
//     } else {
//         // Si el producto no existe en el carrito, agregarlo
//         cart.products.push({ id: pid, quantity });
//     }
//     carts[cid] = {...carts[cid], ...productIndex};
//     await fs.promises.writeFile('./src/carts.json', JSON.stringify(carts, null, "\t"),"utf-8");

//     res.send(cart.products);
// });

// export default router
