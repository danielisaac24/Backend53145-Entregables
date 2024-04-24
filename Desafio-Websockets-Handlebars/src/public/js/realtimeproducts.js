// const socket = io();
// document.getElementById('contactForm').addEventListener('submit', async function(event) {
//     event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
    
//     // Obtener los valores de los campos del formulario
//     const title = document.getElementById('title').value;
//     const description = document.getElementById('description').value;
//     const price = document.getElementById('price').value;
//     const code = document.getElementById('code').value;
//     const stock = document.getElementById('stock').value;

//     // Trabajar con los datos del formulario
//     const product = {
//         title:title,
//         description: description,
//         price:price,
//         code:code,
//         stock:stock  
//     }
    
// });
// let productList = document.getElementById("listProduct");
// socket.on("listProducts", (product) => {
//     console.log('productos desde el servidor: ', product)
    
//     productList.innerHTML += `<li>${product.title} ${product.description} ${product.price}</li>`
// });
const socket = io();

document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
    
    // Obtener los valores de los campos del formulario
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const code = document.getElementById('code').value;
    const stock = document.getElementById('stock').value;

    // Crear el objeto de datos del producto
    const product = {
        title: title,
        description: description,
        price: price,
        code: code,
        stock: stock  
    };

    try {
        // Enviar la solicitud POST al servidor
        const response = await fetch('/realtimeproducts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        if (!response.ok) {
            throw new Error('Error al agregar el producto');
        }

        // Obtener la respuesta del servidor (opcional)
        const responseData = await response.json();
        console.log(responseData); // Esto puede ser útil para depuración o manejo de errores
        
    } catch (error) {
        console.error('Error al enviar la solicitud POST:', error);
    }
});

let productList = document.getElementById("listProduct");
socket.on("listProducts", (products) => {
    console.log('productos desde el servidor: ', products)
    
    productList.innerHTML += `<li>${product.title} ${product.description} ${product.price}</li>`
});
