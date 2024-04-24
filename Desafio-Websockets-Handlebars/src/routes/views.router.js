import express from "express";
const router = express.Router();
import ProductManager from "../managers/ProductManager.js";
const Manager = new ProductManager();
router.post("/realtimeproducts", async (req, res, next) => {
    try {
        const { title, description, price, thumbail, code, stock } = req.body;
        const { socketServer } = req;
        Manager.addProduct(title, description, price, thumbail, code, stock);
        // emitimos los productos
        socketServer.emit("listProducts", {
            title:title,
            description: description,
            price:price,
            code:code,
            stock:stock  
        });

        res.status(200).send({ status: "success1" });
        res.render("realtimeproducts", {
            styles: "homeStyles.css",
        });
    } catch (error) {
        console.error(error);
    }
});

router.get("/realtimeproducts", async (req, res) => {
    try {
        const { socketServer } = req;
        let products = Manager.getProducts();
        socketServer.emit("listProducts", products);
        res.render("realtimeproducts", {
            styles: "homeStyles.css",
        });
    } catch (error) {
        console.error(error);
    }

});

export default router;
