const { response, request } = require('express');


const Usuario = require('../models/usuario');
const Elemento = require('../models/elemento');


const mostrarElementos = async(req = request, res = response) => {

    const query = { disponibilidad: true };
    const [elementos, total] = await Promise.all([
        Elemento.find(query),
        Elemento.countDocuments(query)
    ]);

    res.json({
        total,
        elementos
    })
};

const mostrarElementosID = async(req = request, res = response) => {



    const id_edificio = req.params.id_edificio;
    const elemento = await Elemento.find({ id_edificio })


    res.json({ elemento });
};

const elementosPost = async(req = request, res = response) => {

    const role = req.usu

    if (role.rol != "administrador") {
        return res.status(400).json({
            msg: 'No tiene acceso a estas opciones'
        })
    };

    const { id_edificio, nombre, precio, descripcion, disponibilidad } = req.body;
    const elemento = new Elemento({ id_edificio, nombre, precio, descripcion, disponibilidad });

    await elemento.save();
    res.json({ elemento });
};

const elementosCompra = async(req = request, res = response) => {

    const usuario = req.usu
    const id = req.params.id;
    const elemento = await Elemento.findById(id)
    const { disponibilidad = elemento.disponibilidad } = req.body;

    const elementoUpdate = await Elemento.findByIdAndUpdate(id, { disponibilidad, usuario });

    res.json({ elementoUpdate });
};


module.exports = {
    elementosPost,
    mostrarElementos,
    mostrarElementosID,
    elementosCompra
}