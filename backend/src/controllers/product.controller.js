import Producto from '../models/product.model.js'
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';


export const createProduct = async (req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const { idProducto, nombre, categoria, precio, descripcion, marca, modelo, disponibilidad } = req.body
    const { image } = req.files

    try {
        const productFound = await Producto.findOne({ idProducto })
        if(productFound) return res.status(400).json({ msg: 'Error Id_Product Duplicate' })

        // Construir la ruta al directorio de archivos
        const archivosDirectory = path.resolve(__dirname, '..', 'uploads', 'productos', idProducto);

        if (!fs.existsSync(archivosDirectory)) {
            fs.mkdirSync(archivosDirectory, { recursive: true });
        }

        // Construir la ruta del archivo con el nombre original del archivo
        const rutaArchivoRelativa = path.join('uploads', 'productos', idProducto, image.name);
        const rutaSinUpload = path.join('productos', idProducto , image.name)

        fs.writeFileSync(path.resolve(__dirname, '..', rutaArchivoRelativa), image.data);

        const newProduct = new Producto({
            idProducto: idProducto,
            nombre: nombre,
            categoria: categoria,
            precio: precio,
            descripcion: descripcion,
            marca: marca,
            modelo: modelo,
            disponibilidad: disponibilidad,
            image: rutaSinUpload
        })

        const ProductSave = await newProduct.save()
        res.status(200).json({ ProductSave })

    } catch (error) {
        console.log(error)
    }
}

