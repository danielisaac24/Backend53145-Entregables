import express from 'express'
// import usersRouter from './routes/users.router.js'
// import ProductManager from './managers/ProductManager.js'
import viewsRouter from './routes/views.router.js'
import  __dirname  from './utils.js'
// import { uploader } from './multer.js'
// motor de plantilla
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'


const app = express()
// const Pmanager = new ProductManager();
const PORT = process.env.PORT || 8080
const httpServer = app.listen (8080, ()=>console.log('escuchando el port 8080'));
const socketServer = new Server(httpServer)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+'/public'))


// express usa este motor de plantillas
app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}))

// seteamos la dirección de mis vistas (plantlillas)
app.set('views', __dirname+'/views')
app.set('view engine', 'hbs')
app.use('/', viewsRouter)
app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).send('Error 500 en el server')
})


////////////////////////////////////////////////////////////////////////////////////////////////////
// const products = [
//     {id: '1', title: 'producto 1', precio: '100'},
//     {id: '2', title: 'producto 2', precio: '101'},
//     {id: '3', title: 'producto 3', precio: '102'},
//     {id: '4', title: 'producto 4', precio: '103'},
//     {id: '5', title: 'producto 5', precio: '104'}
// ]
// socketServer.on('connection', socket => {
//     console.log('nuevo cliete conectado')
//     socket.on('message', data => {
//         console.log(data)
//         socket.on('listarProductos', products => {
//             // console.log('message data: ', data)
//             // // guardamos los mensajes
//             // messages.push(data)
//             // emitimos los mensajes
//             io.emit('listarProductos', products)
//         })
//         // socket.emit('socket_individual', 'Este mensaje lo debe ecibir este los socket')
//         // messages.push({id: socket.id, messge: data})
//         // socketServer.emit('messages_server', messages)
//     })

// })
////////////////////////////////////////////////////////////////////////////////////////////////
let messages = [] // simular un db mock 
// manager chat - productos 
// socketServer -> io 
socketServer.on('connection', socket => {
    console.log('Cliente conectado')

    socket.on('message', data => {
        console.log('productos: ', data)
        // guardamos los mensajes
        messages.push(data)
        // emitimos los mensajes
        socketServer.emit('messageLogs', data)
    })
})


// 