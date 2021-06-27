const { Router } = require('express');
const { check } = require('express-validator');
const { elementosPost, mostrarElementos, mostrarElementosID, elementosCompra } = require('../controlls/elementos');
const { existeIdElement, elegirDisponibilidad } = require('../helpers/elegir-rol');
const { errorRutas } = require('../middlewares/error-usuario');
const { validarToken } = require('../middlewares/validar-token');

const router = Router();

router.get('/', [validarToken, errorRutas], mostrarElementos);

router.get('/:id', check('id').custom(existeIdElement), [validarToken, errorRutas], mostrarElementosID);

router.post('/', [
    validarToken,
    check('elementoUno', 'El elementoUno es obligatorio').not().isEmpty(),
    check('precioUno', 'El precioUno es obligatorio').not().isEmpty(),
    check('descripcionUno', 'La descripcionUno es obligatorio').not().isEmpty(),
    check('elementoDos', 'El  elementoDos es obligatorio').not().isEmpty(),
    check('precioDos', 'El precioDos es obligatorio').not().isEmpty(),
    check('descripcionDos', 'La descripcionDos es obligatorio').not().isEmpty(),
    errorRutas,
], elementosPost);

router.put('/:id', [
    validarToken,
    check('disponibilidadUno', 'La disponibilidadUno es requerida').not().isEmpty(),
    check('disponibilidadUno').custom(elegirDisponibilidad),
    check('disponibilidadDos', 'La disponibilidadDos es requerida').not().isEmpty(),
    check('disponibilidadDos').custom(elegirDisponibilidad),
    errorRutas,
], elementosCompra);


module.exports = router;

