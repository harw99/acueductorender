import { Router }  from 'express'
import { crearRecaudo, obtenerRecaudos, obtenerRecaudoPorId, actualizarRecaudo, eliminarRecaudo } from "../controllers/collection.controller.js"
const router = Router()

router.post('/recaudos',crearRecaudo);
router.get('/recaudos',obtenerRecaudos);
router.get('/recaudos/:recaudoId',obtenerRecaudoPorId);
router.patch('/recaudos/:recaudoId',actualizarRecaudo);
router.delete('/recaudos/:recaudoId', eliminarRecaudo);


export default router