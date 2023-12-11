import mongoose from 'mongoose';


const reporteSchema = new mongoose.Schema({
  tipo: {
    type: String,
    required: true,
    enum: ['financiero', 'consumo_general'],
  },
  descripcion: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
  ingresos: {
    type: Number,
  },
  egresos: {
    type: Number,
  },
  saldo: {
    type: Number,
  },
  totalConsumo: {
    type: Number,
  },
  // Otros posibles campos
});

export default mongoose.model('Reporte', reporteSchema);

