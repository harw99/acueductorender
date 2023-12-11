import { Router }  from 'express'
import {crearReporte, obtenerReportes, obtenerReportePorId, actualizarReporte, eliminarReporte} from "../controllers/reports.controller.js"
const router = Router()


router.post('/reporte', crearReporte)
router.get('/reportes', obtenerReportes)
router.get('/reporte/:reporteId', obtenerReportePorId)
router.patch('/reporte/:reporteId' ,actualizarReporte)
router.delete('/reporte/:reporteId', eliminarReporte)

export default router 