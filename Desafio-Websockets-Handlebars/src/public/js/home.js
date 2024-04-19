import ProductManager from '../../managers/ProductManager.js'

const socket = io()
const Manager = new ProductManager();
let products = await Manager.getProducts()

    // const products = [
    //     {id: '1', title: 'producto 1', precio: '100'},
    //     {id: '2', title: 'producto 2', precio: '101'},
    //     {id: '3', title: 'producto 3', precio: '102'},
    //     {id: '4', title: 'producto 4', precio: '103'},
    //     {id: '5', title: 'producto 5', precio: '104'}    
    // ]
    socket.emit('message', products)
    socket.on('messageLogs', data => {
        //console.log('Mensajes del server', data)
        let log = document.getElementById('messageLog')

        let messages = ''
        data.forEach(message => {
            messages += `<li>${message.id}${message.title}${message.precio}</li><br>`
        })
        log.innerHTML = messages
    })
