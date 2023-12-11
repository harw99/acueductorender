import mongoose from 'mongoose';

const facturaSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    lecturaAnterior: { type: Number, required: true },
    lecturaActual: { type: Number, required: true },
    fechaToma: { type: Date, default: Date.now },
    fechaSuspension: { type: Date },
    totalPagar: { type: Number, required: true },
    // Otros campos según sea necesario
});


export default mongoose.model('Factura', facturaSchema);
