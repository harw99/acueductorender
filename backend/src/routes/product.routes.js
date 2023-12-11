import { Router } from "express"
import { createProduct } from '../controllers/product.controller.js'
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = Router()

router.post('/createProduct', createProduct)

export default router