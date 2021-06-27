const { response, request } = require('express');


const Usuario = require('../models/usuario');
const Edificio = require('../models/edificio');



const mostrarEdificios = async(req = request, res = response) => {

    const query = { estado: true || false };
    const [edificios, total] = await Promise.all([
        Edificio.find(query),
        Edificio.countDocuments(query)
    ]);

    res.json({
        total,
        edificios
    })
};

const mostrarEdificiosID = async(req = request, res = response) => {

    

    const id = req.params.id;
    const edificio = await Edificio.findById(id)
    

    res.json({ edificio });
};


const edificiosPost = async(req = request, res = response) => {

    const role = req.usu

    if (role.rol != "administrador") {
        return res.status(400).json({
            msg: 'No tiene acceso a estas opciones'
        })
    };

    const { nombre, fecha, descripcion } = req.body;
    const edificio = new Edificio({ nombre, fecha, descripcion });

    await edificio.save();
    res.json({ edificio });
};


const edificiosPut = async(req = request, res = response) => {

    const role = req.usu

    if (role.rol != "administrador") {
        return res.status(400).json({
            msg: 'No tiene acceso a estas opciones'
        })
    };

    const id = req.params.id;
    const edificio = await Edificio.findById(id)
    const { nombre = edificio.nombre, fecha = edificio.fecha, descripcion = edificio.descripcion } = req.body;

    const edificioUpdate = await Edificio.findByIdAndUpdate(id, { nombre, fecha, descripcion });

    res.json({ edificioUpdate });
};

const edificiosDelete = async(req = request, res = response) => {

    const role = req.usu

    if (role.rol != "administrador") {
        return res.status(400).json({
            msg: 'No tiene acceso a estas opciones'
        })
    };

    const id = req.params.id;
    const edificio = await Edificio.findById(id)
    const { estado = edificio.estado } = req.body;

    const edificioUpdate = await Edificio.findByIdAndUpdate(id, { estado });

    res.json({ edificioUpdate });
};







module.exports = {
    edificiosPost,
    mostrarEdificios,
    edificiosPut,
    edificiosDelete,
    mostrarEdificiosID
}