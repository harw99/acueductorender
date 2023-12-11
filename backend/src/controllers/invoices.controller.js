import Factura from '../models/invoices.models.js'

export const crearFactura =  async (req, res) => {
    try {
      const nuevaFactura = await Factura.create(req.body);
      res.status(201).json(nuevaFactura);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

 
  export const obtenerFacturas = async (req, res) => {
    try {
      const facturas = await Factura.find();
      res.status(200).json(facturas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  
  export const obtenerFacturaPorId = async (req, res) => {
    const { facturaId } = req.params;
    try {
      const factura = await Factura.findById(facturaId);
      if (!factura) {
        return res.status(404).json({ mensaje: 'Factura no encontrada' });
      }
      res.status(200).json(factura);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  
  export const actualizarFactura = async (req, res) => {
    const { facturaId } = req.params;
    try {
      const facturaActualizada = await Factura.findByIdAndUpdate(
        facturaId,
        { $set: req.body },
        { new: true }
      );
      if (!facturaActualizada) {
        return res.status(404).json({ mensaje: 'Factura no encontrada' });
      }
      res.status(200).json(facturaActualizada);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

 
  export const eliminarFactura = async (req, res) => {
    const { facturaId } = req.params;
    try {
      const facturaEliminada = await Factura.findByIdAndDelete(facturaId);
      if (!facturaEliminada) {
        return res.status(404).json({ mensaje: 'Factura no encontrada' });
      }
      res.status(200).json({ mensaje: 'Factura eliminada con éxito' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }