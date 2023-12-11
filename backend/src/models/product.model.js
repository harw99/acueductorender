import mongoose from "mongoose"

const ProductSchema = mongoose.Schema({
    idProducto: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    nombre: { 
        type: String, 
        required: true 
    },
    categoria: { 
        type: String, 
        required: true
    },
    precio: { 
        type: String, 
        required: true
    },
    descripcion: String,
    marca: String,
    modelo: String,
    disponibilidad: { 
        type: Boolean, 
        default: true 
    },
    image: String,
})

export default mongoose.model('Producto', ProductSchema)