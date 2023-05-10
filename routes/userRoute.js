const express = require('express');
const router = express.Router();

const {registerUser, loginUser} = require('../controllers/userController');


router.route('/users').post(registerUser);
router.route('/users').post(loginUser);


module.exports = router;