const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/',[
    check('email','Typoe a valid email address').isEmail(),
    check('password','The password must be at least 6 digits').isLength({min:6})
],authController.authUser);

router.get('/',authMiddleware,authController.userCurrently);

module.exports = router;