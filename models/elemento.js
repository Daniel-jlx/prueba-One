const { Schema, model } = require('mongoose');

const ElementoSchema = Schema({
    elementoUno: {
        type: String,
        required: [true, 'El nombre del elemento es obligatorio']
    },
    precioUno: {
        type: Number,
        required: [true, 'El precio es obligatoria']
    },
    descripcionUno: {
        type: String,
        required: [true, 'La descripcion es obligatoria'],
    },
    disponibilidadUno: {
        type: Boolean,
        default: true,
    },
    elementoDos: {
        type: String,
        required: [true, 'El nombre del elemento es obligatorio']
    },
    precioDos: {
        type: Number,
        required: [true, 'El precio es obligatoria']
    },
    descripcionDos: {
        type: String,
        required: [true, 'La descripcion es obligatoria'],
    },
    disponibilidadDos: {
        type: Boolean,
        default: true,
    },
});




module.exports = model('Elemento', ElementoSchema);