const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => res.send('Login'));
router.get('/register', (req, res) => res.send('Register'));
router.get('/change_password', (req, res) => res.send('change Password'));


module.exports = router
