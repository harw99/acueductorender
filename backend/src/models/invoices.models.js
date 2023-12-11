import mongoose from 'mongoose'

const invoiceSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
  },
  monto: {
    type: Number,
    required: true,
  },
  pagada: {
    type: Boolean,
    default: false,
  },
  // Otros posibles campos
});

export default mongoose.model('Invoice', invoiceSchema);
