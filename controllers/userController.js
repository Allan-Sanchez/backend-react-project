const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');

exports.createUser =async (req,res) =>{
    //checking errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {email,password} = req.body;

    try {
        // cheking tthe email is unique
        let user = await User.findOne({email});

        if (user) {
            return res.status(400).json({msg:"user already exists"});
        }

        // create object
        user = new User(req.body);

        //
        const salt =await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password,salt);

        await user.save();

        res.json({msg:"user created corrently"});
    } catch (error) {
        console.log(error);
        res.status(400).send('there was a mistake');
    }
};