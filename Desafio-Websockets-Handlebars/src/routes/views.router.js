
import { Router } from 'express'

const router = Router()
router.get('/', (req,res)=>{
    let user={name:'Daniel'}
    
    res.render('index', {name:'carlitos' , style: 'index.css' })
})
export default router