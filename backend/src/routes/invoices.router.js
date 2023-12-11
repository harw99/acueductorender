import { Router }  from 'express'
import { crearFactura, obtenerFacturas, obtenerFacturaPorId, actualizarFactura,  eliminarFactura} from "../controllers/invoices.controller.js"
const router = Router()

router.post('/facturas',crearFactura);
router.get('/facturas',obtenerFacturas);
router.get('/facturas/:facturaId',obtenerFacturaPorId);
router.patch('/facturas/:facturaId',actualizarFactura);
router.delete('/facturas/:facturaId',eliminarFactura);

export default router