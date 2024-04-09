import fs from 'fs';
class ProductManager {
    constructor() {
        // this.nextId = 1;
        this.path = "./src/datos.json";
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            let products = await this.getProducts(); 
   
            if (!title || !description || !price || !code || !stock) {
                console.log("Faltan completar campos"); 
                return;
            }
            if (products.some(product => product.code === code)) { 
                console.log("El código del producto ya existe.");
                return;
            }
 

            const product = {
                id: products.length + 1, 
                title: title,
                description: description, 
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock,
            };
            products.push(product); 

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"),"utf-8");
        } catch (error) {
            console.log(error.error);
        }
    }

    async getProducts() {
        try {
            const dataJson = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(dataJson);
        } catch (error) {
            return [];
        }
    }

    async updateProduct(id, fieldsToUpdate) {
        try {
            let products = await this.getProducts();

            const index = products.findIndex(product => product.id === id);
            if (index === -1) {
                console.log("Producto no encontrado.");
                return;
            }
            products[index] = {...products[index], ...fieldsToUpdate};
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"),"utf-8");

            console.log("Producto actualizado con éxito.");
        } catch (error) {
            console.log(error.message);
        }
    }

    async deleteProduct(id) {
        try {
            let products = await this.getProducts();

            const index = products.findIndex(product => product.id === id);
            if (index === -1) {
                console.log("Producto no encontrado.");
                return;
            }
            products.splice(index, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"), "utf-8");

            console.log("Producto eliminado con éxito.");
        } catch (error) {
            console.log(error.message);
        }
    }

    async getProductById(id) {
        try {
            let products = await this.getProducts();
            const product = products.find((product) => product.id === id);
            if (product) {
                return product;
            } else {
                return "NOT FOUND";
            }
        } catch (error) {
            return [];
        }
    }
}
export default ProductManager;

