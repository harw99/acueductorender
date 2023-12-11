import { Router }  from 'express'
import { crearUsuario , obtenerUsuarios, obtenerUsuarioPorId, actualizarUsuario, eliminarUsuario} from "../controllers/user.controller.js"
const router = Router()


router.post('/usuario', crearUsuario)
router.get('/usuarios', obtenerUsuarios)
router.get('/usuario/:usuarioId', obtenerUsuarioPorId)
router.patch('/usuario/:usuarioId', actualizarUsuario)
router.delete('/usuario/:usuarioId', eliminarUsuario )

export default router