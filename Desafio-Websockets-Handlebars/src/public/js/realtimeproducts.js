const socket = io();
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
    
    // Obtener los valores de los campos del formulario
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;

    // Trabajar con los datos del formulario
    const product = {
        title:title,
        description: description,
        price:price
    }
    socket.emit("readProducts", product)
});

let productList = document.getElementById("listProduct");
socket.on("listProducts", (product) => {
    console.log('productos desde el servidor: ', product)
    
    productList.innerHTML += `<li>${product.title} ${product.description} ${product.price}</li>`
});