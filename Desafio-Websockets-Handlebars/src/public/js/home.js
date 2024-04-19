// const socket = io();
// fetch("http://localhost:8080/api/products")
//     .then((res) => res.json())
//     .then((products) => socket.emit("readProducts", products));

// socket.on("listProducts", (data) => {
//     //console.log('Mensajes del server', data)
//     let log = document.getElementById("listProduct");

//     let products = "";
//     data.forEach((product) => {
//         products += `<li>${product.id}${product.title}${product.price}</li><br>`;
//     });
//     log.innerHTML = products;
// });
const socket = io();

function fetchProducts() {
    fetch("http://localhost:8080/api/products")
        .then((res) => {
            if (!res.ok) {
                throw new Error("Error al obtener los productos");
            }
            return res.json();
        })
        .then((products) => {
            updateProductList(products);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function updateProductList(data) {
    let productList = document.getElementById("listProduct");

    let productsHTML = data.map((product) => {
        return `<li>${product.id} ${product.title} ${product.price}</li>`;
    }).join('');

    productList.innerHTML = productsHTML;
}

socket.on("listProducts", (data) => {
    updateProductList(data);
});

fetchProducts();
