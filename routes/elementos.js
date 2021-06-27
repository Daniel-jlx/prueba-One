const { Router } = require('express');
const { check } = require('express-validator');
const { elementosPost, mostrarElementos, mostrarElementosID, elementosCompra } = require('../controlls/elementos');
const { elegirDisponibilidad } = require('../helpers/elegir-rol');
const { errorRutas } = require('../middlewares/error-rutas');
const { validarToken } = require('../middlewares/validar-token');

const router = Router();

router.get('/', [validarToken, errorRutas], mostrarElementos);

router.get('/:id_edificio', [validarToken, errorRutas], mostrarElementosID);

router.post('/', [
    validarToken,
    check('id_edificio', 'El id_edificio es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('precio', 'el precio es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    errorRutas,
], elementosPost);

router.put('/:id', [
    validarToken,
    check('disponibilidad', 'La disponibilidad es requerida').not().isEmpty(),
    check('disponibilidad').custom(elegirDisponibilidad),
    errorRutas,
], elementosCompra);


module.exports = router;