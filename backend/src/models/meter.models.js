import mongoose from 'mongoose';

const MeterSchema = new mongoose.Schema({
  numero: {
    type: Number,
    required: true,
    unique: true,
  },
  lecturaActual: {
    type: Number,
    default: 0,
  },
  // Otros posible cambios
});


export default mongoose.model('Meter', MeterSchema)