const express = require('express');
const router = express.Router();

router.get('/change_password', (req, res) => res.send('Change Password'));

module.exports = router