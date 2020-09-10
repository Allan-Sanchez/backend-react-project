const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const authController = require('../controllers/authController');


router.post('/',[
    check('email','Typoe a valid email address').isEmail(),
    check('password','The password must be at least 6 digits').isLength({min:6})
],authController.authUser);

module.exports = router;