import fs from 'fs';
class CartManager {
    constructor() {
        this.carts = [];
        this.path = "./src/carts.json";
    }
    async getCarts() {
        try {
            const dataJson = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(dataJson);
        } catch (error) {
            return [];
        }
    }

    async addProductToCart(cid, pid, quantity) {
        let carts = await this.getCarts();

        try {
            const cart = carts.find(cart => cart.id === parseInt(cid));
        console.log(cart)
            let productIndex = cart.product.findIndex(product => product.id === pid);

            if (productIndex !== -1) {
                // Si el producto ya existe en el carrito, incrementar la cantidad
                cart.product[productIndex].quantity += quantity;
            } else {
                // Si el producto no existe en el carrito, agregarlo
                cart.product.push({ id: pid, quantity });
                
            }

            carts[cid] = { ...carts[cid], ...productIndex };
            await fs.promises.writeFile('./src/carts.json', JSON.stringify(carts, null, "\t"), "utf-8");
            return carts;
        } catch (error) {
            console.log(error.error);
        }
    }
    async addCart() {
        try {
            let carts = await this.getCarts();
            const cart = {
                id: carts.length + 1,
                product: []
            };
            carts.push(cart);

            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"), "utf-8");
        } catch (error) {
            console.log(error.error);
        }
    }
}
export default CartManager;