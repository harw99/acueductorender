import { Router }  from 'express'
import { crearContador, obtenerContadores, obtenerContadorPorId, actualizarContador, eliminarContador} from "../controllers/meter.controller.js"
const router = Router()



router.post('/contadores', crearContador);
router.get('/contadores', obtenerContadores);
router.get('/contadores/:contadorId', obtenerContadorPorId);
router.patch('/contadores/:contadorId', actualizarContador);
router.delete('/contadores/:contadorId', eliminarContador);

export default router
