import express from 'express'
import viewsRouter from './routes/views.router.js'
import productRouter from './routes/product.router.js'
import  __dirname  from './utils.js'
import { socketMiddlewares } from './socketMiddlewares.js';
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'


const app = express();
const PORT = process.env.PORT || 8080
const httpServer = app.listen (PORT, ()=>console.log('escuchando el port 8080'));
const io = new Server(httpServer)

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
app.use('/',socketMiddlewares(io),viewsRouter);
app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).send('Error 500 en el server')
})


// app.use('/realtimeProduct', viewsRouter)
// app.use('/api/products', productRouter)   

function comunicacionSocket(io){
    io.on('connection', socket => {
        console.log('Cliente realtime conectado')
    
        socket.on('readProducts', data => {
            console.log('productos desde cliente: ', data)
            // emitimos los productos
            io.emit('listProducts', data)
        })
    })
}
comunicacionSocket(io)



// 