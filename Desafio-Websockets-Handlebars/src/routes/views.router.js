import express from 'express'
const router = express.Router()

router.get('/', (req, res)=>{
    res.render('home', {
        title: 'PRODUCTOS',
        styles: 'homeStyles.css'
    })
})

// router.get('/realtimeproducts', async (req, res) => {
// 	//Pedimos a nuestro propio servidor los libros.
// 	const response = await fetch('http://localhost:8080/realtimeproducts');

// 	//El endpoint responde
// 	const data = await response.json();

// 	//Mandamos el handlebars con informacion
// 	res.render('realtimeproducts', {
// 		books: data.payload,
// 	});
// });

router.get('/realtimeproducts', (req, res)=>{

    res.render('realtimeproducts', {
        styles: 'homeStyles.css'
    })
})

export default router