import express from 'express'

const router = express.Router()

router.get('/', (req, res)=>{
    res.render('home', {})
})
router.get('/realtimeproducts', (req, res)=>{
    res.render('realtimeproduts', {})
})

export default router