const { Router } = require('express');
const { check } = require('express-validator');
const { errorRutas } = require('../middlewares/error-rutas');
const { loginPost } = require('../controlls/login');
const router = Router();

router.post('/', [
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('rol', 'El rol es obligatorio').not().isEmpty(),
    errorRutas,
], loginPost);


module.exports = router;