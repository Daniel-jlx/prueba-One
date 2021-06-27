const { Router } = require('express');
const { check } = require('express-validator');
const { edificiosPost, edificiosPut, edificiosDelete, mostrarEdificios, mostrarEdificiosID } = require('../controlls/edificios');
const { nombreRepetido, existeIdE, elegirEstado } = require('../helpers/elegir-rol');
const { errorRutas } = require('../middlewares/error-usuario');
const { validarToken } = require('../middlewares/validar-token');


// const {validarRoles,validarTodos } = require('../middlewares/validar-rol');


const router = Router();
router.get('/', [validarToken, errorRutas], mostrarEdificios);

router.get('/:id', check('id').custom(existeIdE), [validarToken, errorRutas], mostrarEdificiosID);

router.post('/', [
    validarToken,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').custom(nombreRepetido),
    check('fecha', 'La fecha es obligatoria').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    errorRutas,
], edificiosPost);

router.put('/:id', [
    validarToken,
    check('id').custom(existeIdE),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').custom(nombreRepetido),
    check('fecha', 'La fecha es obligatoria').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    errorRutas,
], edificiosPut);

router.delete('/:id', [
    validarToken,
    check('id').custom(existeIdE),
    check('estado', 'El estado es requerido').not().isEmpty(),
    check('estado').custom(elegirEstado),
    errorRutas,
], edificiosDelete);


module.exports = router;