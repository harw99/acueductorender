import MedidorAgua from '../models/medidor.model.js';
import Usuario from '../models/user.model.js';

export const calcularMedidor = async (req, res) => {
    const { usuario, lecturaAnterior, lecturaActual, email } = req.body;

    // Verifica que la información del usuario esté completa
    if (!usuario || !usuario.nombre || !usuario.cedula || !email) {
        return res.status(400).json({ error: 'La información del usuario es requerida.' });
    }

    try {
        // Verifica si ya existe una factura para ese usuario en el mes actual
        const ultimaFactura = await MedidorAgua.findOne({
            'usuario.cedula': usuario.cedula,
        }).sort({ fechaToma: -1 }); // Ordena por fechaToma en orden descendente

        if (ultimaFactura) {
            const mesUltimaFactura = ultimaFactura.fechaToma.getMonth();
            const mesActual = new Date().getMonth();

            if (mesUltimaFactura === mesActual) {
                return res.status(400).json({ error: 'Ya se generó una factura para este usuario en el mes actual.' });
            }
        }

        // Busca al usuario para obtener la lectura anterior actual
        const usuarioEncontrado = await Usuario.findOne({ cc: usuario.cedula });

        // Verifica si se encontró al usuario antes de actualizar
        if (usuarioEncontrado) {
            usuarioEncontrado.lecturaAnterior = lecturaActual;
            await usuarioEncontrado.save();
        } else {
            console.error('Usuario no encontrado.');
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        // Guarda la información del medidor
        const nuevoMedidor = new MedidorAgua({ usuario, lecturaAnterior, lecturaActual, email });
        nuevoMedidor.totalPagar = nuevoMedidor.calcularTotalPagar();
        const medidorGuardado = await nuevoMedidor.save();

        res.json({
            usuario: medidorGuardado.usuario,
            lecturaAnterior: medidorGuardado.lecturaAnterior,
            lecturaActual: medidorGuardado.lecturaActual,
            fechaToma: medidorGuardado.fechaToma,
            fechaSuspension: medidorGuardado.fechaSuspension,
            totalPagar: medidorGuardado.totalPagar,
            // ... otros campos según sea necesario
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al guardar en la base de datos' });
    }
};



export const getFacturas = async (req, res) => {
    try {
        
        const response = await MedidorAgua.find()
        res.status(200).json({response})

    } catch (error) {
        console.log(error)
    }
}
