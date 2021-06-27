const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida'],
    },
    rol: {
        type: String,
        required: [true, 'El rol es requerido'],
        default: 'cliente',
        enum: ['administrador', 'cliente']
    },
    estado: {
        type: Boolean,
        default: true
    },
});




module.exports = model('Usuario', UsuarioSchema);