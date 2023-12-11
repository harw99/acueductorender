import Reporte from '../models/reports.controller.js'


export const crearReporte = async (req, res) => {
    try {
      const nuevoreporte = await Reporte.create(req.body);
      res.status(201).json(nuevoreporte);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  export const obtenerReportes = async (req, res) => {
    try {
      const reportes = await Reporte.find();
      res.status(200).json(reportes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  export const obtenerReportePorId = async (req, res) => {
    const { reporteId } = req.params;
    try {
      const reporte = await Reporte.findById(reporteId);
      if (!reporte) {
        return res.status(404).json({ mensaje: 'reporte no encontrado' });
      }
      res.status(200).json(reporte);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  
  export const actualizarReporte = async (req, res) => {
    const { reporteId } = req.params;
    try {
      const reporteActualizado = await Reporte.findByIdAndUpdate(
        reporteId,
        { $set: req.body },
        { new: true }
      );
      if (!reporteActualizado) {
        return res.status(404).json({ mensaje: 'reporte no encontrado' });
      }
      res.status(200).json(reporteActualizado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  
  export const  eliminarReporte = async (req, res) => {
    const { reporteId } = req.params;
    try {
      const reporteEliminado = await Reporte.findByIdAndDelete(reporteId);
      if (!reporteEliminado) {
        return res.status(404).json({ mensaje: 'reporte no encontrado' });
      }
      res.status(200).json({ mensaje: 'reporte eliminado con éxito' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
