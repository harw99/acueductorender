import Contador from '../models/meter.models.js'




 export  const crearContador = async (req, res) => {
    try {
      const nuevoContador = await Contador.create(req.body);
      res.status(201).json(nuevoContador);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Método para obtener todos los contadores
  export  const obtenerContadores = async (req, res) => {
    try {
      const contadores = await Contador.find();
      res.status(200).json(contadores);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Método para obtener un contador por ID
  export  const obtenerContadorPorId = async (req, res) => {
    const { contadorId } = req.params;
    try {
      const contador = await Contador.findById(contadorId);
      if (!contador) {
        return res.status(404).json({ mensaje: 'Contador no encontrado' });
      }
      res.status(200).json(contador);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Método para actualizar un contador por ID (utilizando PATCH)
  export  const actualizarContador =  async (req, res) => {
    const { contadorId } = req.params;
    try {
      const contadorActualizado = await Contador.findByIdAndUpdate(
        contadorId,
        { $set: req.body },
        { new: true }
      );
      if (!contadorActualizado) {
        return res.status(404).json({ mensaje: 'Contador no encontrado' });
      }
      res.status(200).json(contadorActualizado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Método para eliminar un contador por ID
  export  const eliminarContador = async (req, res) => {
    const { contadorId } = req.params;
    try {
      const contadorEliminado = await Contador.findByIdAndDelete(contadorId);
      if (!contadorEliminado) {
        return res.status(404).json({ mensaje: 'Contador no encontrado' });
      }
      res.status(200).json({ mensaje: 'Contador eliminado con éxito' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }