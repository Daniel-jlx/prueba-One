const { response, request } = require('express');


const Usuario = require('../models/usuario');
const Elemento = require('../models/elemento');


const mostrarElementos = async(req = request, res = response) => {

    const query = { disponibilidadUno: true };
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

    

    const id = req.params.id;
    const elemento = await Elemento.findById(id)
    

    res.json({ elemento });
};

const elementosPost = async(req = request, res = response) => {

    const role = req.usu

    if (role.rol != "administrador") {
        return res.status(400).json({
            msg: 'No tiene acceso a estas opciones'
        })
    };

    const { elementoUno,  precioUno, descripcionUno, disponibilidadUno, elementoDos, precioDos, descripcionDos, disponibilidadDos } = req.body;
    const elemento = new Elemento({ elementoUno,  precioUno, descripcionUno, disponibilidadUno, elementoDos, precioDos, descripcionDos, disponibilidadDos });

    await elemento.save();
    res.json({ elemento });
};

const elementosCompra = async(req = request, res = response) => {

    const id = req.params.id;
    const elemento = await Elemento.findById(id)
    const { disponibilidadUno = elemento.disponibilidadUno, disponibilidadDos = elemento.disponibilidadDos } = req.body;

    const elementoUpdate = await Elemento.findByIdAndUpdate(id, { disponibilidadUno, disponibilidadDos });

    res.json({ elementoUpdate });
};


module.exports = {
    elementosPost,
    mostrarElementos,
    mostrarElementosID,
    elementosCompra
}