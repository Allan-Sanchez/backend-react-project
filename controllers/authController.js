const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');


exports.authUser = async (req,res) =>{
    //checking errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {email,password} = req.body;

    try {
        // validate that user exists
        let user = await User.findOne({email});
        if (!user) {
           return res.status(400).json({ msg:'The user does not exist'});
        }
        // checking password
        const passwordCorrect = await bcryptjs.compare(password,user.password);
        if (!passwordCorrect) {
            return res.status(400).json({ msg:'The password is not valid'});            
        }
           // create and sing JWT
           const payload = {
            user:{
                userId:user.id
            }
        };

        jwt.sign(payload,process.env.SECRET,{
            expiresIn:3600000 //1 hour
        },(error,token) =>{
            if(error) throw error;
            res.json({token});
        });

        
    } catch (error) {
        console.log(error);
    }

};

exports.userCurrently = async (req, res) =>{

    try {
        const userCurrently =await User.findById(req.user.userId).select('-password');
        res.json({userCurrently});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'There was a mistake'})
    }
};