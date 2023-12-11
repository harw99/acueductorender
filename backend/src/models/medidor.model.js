import mongoose from 'mongoose';

const medidorAguaSchema = new mongoose.Schema({
    usuario: {
        nombre: { type: String, required: true },
        cedula: { type: String, required: true },
        email: { type: String, required: true }, // Agrega el campo email
    },
    lecturaAnterior: { type: Number, required: true },
    lecturaActual: { type: Number, required: true },
    fechaToma: { type: Date, default: Date.now },
    fechaSuspension: {
        type: Date,
        default: function () {
            const fechaSuspension = new Date(this.fechaToma);
            fechaSuspension.setMonth(fechaSuspension.getMonth() + 1);
            fechaSuspension.setDate(fechaSuspension.getDate() + 4);
            return fechaSuspension;
        },
    },
    totalPagar: { type: Number, default: 0 },
});

medidorAguaSchema.methods.calcularMetrosCubicos = function () {
    return Math.max(0, this.lecturaActual - this.lecturaAnterior);
};

medidorAguaSchema.methods.calcularTotalPagar = function () {
    const metrosCubicos = this.calcularMetrosCubicos();

    let precioMetrosCubicos;

    if (metrosCubicos <= 25) {
        precioMetrosCubicos = 400;
    } else if (metrosCubicos <= 35) {
        precioMetrosCubicos = 600;
    } else if (metrosCubicos <= 50) {
        precioMetrosCubicos = 800;
    } else {
        precioMetrosCubicos = 1200;
    }

    const subtotal = metrosCubicos * precioMetrosCubicos;
    const alcantarilladoAseo = 2000;
    const total = subtotal + alcantarilladoAseo + 4000;

    return total;
};

export default mongoose.model('Factura', medidorAguaSchema);
