import mongoose from 'mongoose';


const collectionSchema = new mongoose.Schema({
    factura: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Factura',
    },
    fechaPago: {
      type: Date,
      default: Date.now,
    },
    // Otros posibles campo
  });


export default mongoose.model('Collection', collectionSchema)