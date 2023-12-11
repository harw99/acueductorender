import User from '../models/user.model.js';


  export const crearUsuario = async (req, res) => {
    try {
      const nuevoUsuario = await User.create(req.body);
      res.status(201).json(nuevoUsuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  export const obtenerUsuarios = async (req, res) => {
    try {
      const usuarios = await User.find();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  export const obtenerUsuarioPorId = async (req, res) => {
    const { usuarioId } = req.params;
    try {
      const usuario = await User.findById(usuarioId);
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
      res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  
  export const actualizarUsuario = async (req, res) => {
    const { usuarioId } = req.params;
    try {
      const usuarioActualizado = await User.findByIdAndUpdate(
        usuarioId,
        { $set: req.body },
        { new: true }
      );
      if (!usuarioActualizado) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
      res.status(200).json(usuarioActualizado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  
  export const  eliminarUsuario = async (req, res) => {
    const { usuarioId } = req.params;
    try {
      const usuarioEliminado = await User.findByIdAndDelete(usuarioId);
      if (!usuarioEliminado) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
      res.status(200).json({ mensaje: 'Usuario eliminado con éxito' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }



