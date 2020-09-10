const jwt = require('jsonwebtoken');


module.exports = (req,res,next) =>{
    //reader jwt
    const token = req.header('x-auth-token');

    //checking token
    if (!token) {
        res.status(404).json({msg:"token not found"});
    }

    try {
        const encryption = jwt.verify(token,process.env.SECRET);
        req.user = encryption.user;
        next();
        
    } catch (error) {
        console.log(error);
        res.status(404).json({msg:"There was a mistake"})
    }
};