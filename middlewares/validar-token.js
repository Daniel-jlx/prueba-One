const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const validarToken = async(req = request, res = response, next) => {

    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            mensaje: 'No hay token en la peticion'
        })
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            res.status(401).json({
                mensaje: 'El id no existe en la base de datos'
            });
        }
        req.usu = usuario;


        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            errors: 'Token no valido'
        });
    };
}

module.exports = {
    validarToken
}