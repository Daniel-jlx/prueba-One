const { response, request } = require('express');
const becryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const mostrarUsuarios = async(req = request, res = response) => {

    const query = { rol: 'cliente' };
    const [usuarios, total] = await Promise.all([
        Usuario.find(query),
        Usuario.countDocuments(query)
    ]);

    res.json({
        total,
        usuarios
    })
}


const usuariosPost = async(req = request, res = response) => {

    const role = req.usu

    if (role.rol != "administrador") {
        return res.status(400).json({
            msg: 'No tiene acceso a estas opciones'
        })
    };

    const { nombre, correo, password, rol, estado } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol, estado });
    //Encriptar la contraseña
    const salt = becryptjs.genSaltSync();
    usuario.password = becryptjs.hashSync(password, salt);
    //guardar db
    await usuario.save();
    res.json({ usuario });
};


const usuariosPut = async(req = request, res = response) => {

    const role = req.usu

    if (role.rol != "administrador") {
        return res.status(400).json({
            msg: 'No tiene acceso a estas opciones'
        })
    };

    const id = req.params.id;
    const usuario = await Usuario.findById(id)
    const { nombre = usuario.nombre, correo = usuario.correo, rol = usuario.rol } = req.body;

    const usuarioUpdate = await Usuario.findByIdAndUpdate(id, { nombre, correo, rol });

    res.json({ usuarioUpdate });
};

const usuariosDelete = async(req = request, res = response) => {

    const role = req.usu

    if (role.rol != "administrador") {
        return res.status(400).json({
            msg: 'No tiene acceso a estas opciones'
        })
    };

    const id = req.params.id;
    const usuario = await Usuario.findById(id)
    const { estado = usuario.estado } = req.body;

    const usuarioUpdate = await Usuario.findByIdAndUpdate(id, { estado });

    res.json({ usuarioUpdate });
};







module.exports = {
    usuariosPost,
    mostrarUsuarios,
    usuariosPut,
    usuariosDelete
}