const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-JWT');
const { request } = require('express');
const becryptjs = require('bcryptjs');

const loginPost = async(req = request, res = response) => {

    const { correo, password, rol } = req.body;

    try {
        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.status(400).json({
                mensaje: 'El usuario, rol o clave son incorrectas'
            })
        }

        const role = await Usuario.findOne({ rol });

        if (!role) {
            return res.status(400).json({
                mensaje: 'El usuario, rol o clave son incorrectas'
            })
        }


        if (usuario.rol != rol) {
            return res.status(400).json({
                mensaje: 'El usuario, rol o clave son incorrectas'
            })
        }

        const passwordCorrecta = becryptjs.compareSync(password, usuario.password);
        if (!passwordCorrecta) {
            return res.status(400).json({
                mensaje: 'El usuario, rol o clave son incorrectas'
            })
        }

        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: 'Error en la base de datos'
        });
    };
};

module.exports = {
    loginPost
}