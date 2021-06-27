const { Schema, model } = require('mongoose');

const ElementoSchema = Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    id_edificio: {
        type: String,
        required: [true, 'El id del edificio es obligatorio']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre del elemento es obligatorio']
    },
    precio: {
        type: Number,
        required: [true, 'El precio es obligatoria']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatoria'],
    },
    disponibilidad: {
        type: Boolean,
        default: true,
    },
});




module.exports = model('Elemento', ElementoSchema);