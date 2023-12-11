import { Router }  from 'express'
import { calcularMedidor, getFacturas} from "../controllers/medidorAgua.controller.js"
const router = Router()

router.post('/calcularFactura', calcularMedidor)
router.get('/getFacturas', getFacturas)

export default router