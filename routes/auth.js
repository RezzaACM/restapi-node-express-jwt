// Library
const router = require('express').Router();

// Controller
const authController = require('../controllers/authController');


router.post('/register', authController.register);

router.post('/login', authController.login);

module.exports = router;