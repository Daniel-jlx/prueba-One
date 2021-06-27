const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosPost, mostrarUsuarios, usuariosPut, usuariosDelete } = require('../controlls/usuarios');
const { elegirRol, correoRepetido, existeId, elegirEstado } = require('../helpers/elegir-rol');
const { errorRutas } = require('../middlewares/error-rutas');
const { validarToken } = require('../middlewares/validar-token');





const router = Router();
router.get('/', [validarToken, errorRutas], mostrarUsuarios);

router.post('/', [
    validarToken,
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('correo', 'El correo es requerido').custom(correoRepetido),
    check('password', 'La contraseña es requerida').not().isEmpty(),
    check('rol', 'El rol es requerido').not().isEmpty(),
    check('rol').custom(elegirRol),
    errorRutas
], usuariosPost);

router.put('/:id', [
    validarToken,
    check('id').custom(existeId),
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('correo', 'El correo es requerido').not().isEmpty(),
    check('rol', 'El rol es requerido').not().isEmpty(),
    check('rol').custom(elegirRol),
    errorRutas,
], usuariosPut);

router.delete('/:id', [
    validarToken,
    check('id').custom(existeId),
    check('estado', 'El estado es requerido').not().isEmpty(),
    check('estado').custom(elegirEstado),
    errorRutas,
], usuariosDelete);




module.exports = router;