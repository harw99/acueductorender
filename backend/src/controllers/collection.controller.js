import Recaudo from '../models/collection.models.js'

export const  crearRecaudo = async (req, res) => {
    try {
      const nuevoRecaudo = await Recaudo.create(req.body);
      res.status(201).json(nuevoRecaudo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  export const obtenerRecaudos =  async (req, res) => {
    try {
      const recaudos = await Recaudo.find();
      res.status(200).json(recaudos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  
  export const  obtenerRecaudoPorId = async (req, res) => {
    const { recaudoId } = req.params;
    try {
      const recaudo = await Recaudo.findById(recaudoId);
      if (!recaudo) {
        return res.status(404).json({ mensaje: 'Recaudo no encontrado' });
      }
      res.status(200).json(recaudo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  export const  actualizarRecaudo = async (req, res) => {
    const { recaudoId } = req.params;
    try {
      const recaudoActualizado = await Recaudo.findByIdAndUpdate(
        recaudoId,
        { $set: req.body },
        { new: true }
      );
      if (!recaudoActualizado) {
        return res.status(404).json({ mensaje: 'Recaudo no encontrado' });
      }
      res.status(200).json(recaudoActualizado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  export const eliminarRecaudo = async (req, res) => {
    const { recaudoId } = req.params;
    try {
      const recaudoEliminado = await Recaudo.findByIdAndDelete(recaudoId);
      if (!recaudoEliminado) {
        return res.status(404).json({ mensaje: 'Recaudo no encontrado' });
      }
      res.status(200).json({ mensaje: 'Recaudo eliminado con éxito' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
