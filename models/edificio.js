const { Schema, model } = require('mongoose');

const EdificioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    fecha: {
        type: String,
        required: [true, 'La fecha es obligatoria']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatoria'],
    },
    estado: {
        type: Boolean,
        default: true,
    },
});




module.exports = model('Edificio', EdificioSchema);