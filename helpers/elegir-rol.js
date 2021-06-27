const Edificio = require('../models/edificio');
const Usuario = require('../models/usuario');
const roles = ['administrador', 'cliente'];
const estados = ['true', 'false'];
const disponibilidades = ['true', 'false'];

const elegirRol = async(rol = '') => {

    if (!roles.includes(rol)) {
        throw new Error(`El rol ${rol} digitado no existe, intente con ${roles}`);
    }
    return true;
};

const elegirEstado = async(estado = '') => {

    if (!estados.includes(estado)) {
        throw new Error(`El estado ${estado} digitado no existe, intente con ${estados}`);
    }
    return true;
};

const elegirDisponibilidad = async(disponibilidad = '') => {

    if (!disponibilidades.includes(disponibilidad)) {
        throw new Error(`La disponibilidad ${disponibilidad} digitado no existe, intente con ${disponibilidades}`);
    }
    return true;
};

const correoRepetido = async(correo = '') => {
    const usuario = await Usuario.findOne({ correo });

    if (usuario) {
        throw new Error(`El correo ${usuario.correo}, ya esta en uso, por favor digitar otro`)
    }
    return true
};

const nombreRepetido = async(nombre = '') => {
    const edificio = await Edificio.findOne({ nombre });

    if (edificio) {
        throw new Error(`El nombre ${edificio.nombre}, ya esta en uso, por favor digitar otro`)
    }
    return true
};

const existeId = async(id) => {
    const usuario = await Usuario.findById(id);

    if (!usuario) {
        throw new Error('Este usuario no existe');
    }
    return true;
};

const existeIdE = async(id) => {
    const edificio = await Edificio.findById(id);

    if (!edificio) {
        throw new Error('Este edificio no existe');
    }
    return true;
};








module.exports = {
    correoRepetido,
    elegirRol,
    existeId,
    nombreRepetido,
    existeIdE,
    elegirEstado,
    elegirDisponibilidad

}