const express = require('express');
const { modelNames } = require('mongoose');
const userController = require('../controllers/userController');
const {check} = require("express-validator");
const router = express.Router();

router.post('/',[
    check('name','Name is requited').not().isEmpty(),
    check('email','Typoe a valid email address').isEmail(),
    check('password','The password must be at least 6 digits').isLength({min:6})
],userController.createUser);
  
module.exports = router;