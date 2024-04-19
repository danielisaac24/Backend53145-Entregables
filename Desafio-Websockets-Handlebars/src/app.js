import express from 'express'
import viewsRouter from './routes/views.router.js'
import productRouter from './routes/product.router.js'
import  __dirname  from './utils.js'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'


const app = express();
const PORT = process.env.PORT || 8080
const httpServer = app.listen (PORT, ()=>console.log('escuchando el port 8080'));
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
app.use('/api/products', productRouter)

app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).send('Error 500 en el server')
})

socketServer.on('connection', socket => {
    console.log('Cliente conectado')

    socket.on('readProducts', data => {
        console.log('productos: ', data)
        // emitimos los productos
        socketServer.emit('listProducts', data)
    })
})


// 