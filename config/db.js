const mongoose = require('mongoose');
require('dotenv').config({path:'variables.env'});

const connetDB = async () =>{
    try {
        await mongoose.connect(process.env.DB_MONGO,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false
        });
        console.log("DB connet");
    } catch (error) {
        console.log(error);
        process.exit(1);//stop app
    }
};

module.exports = connetDB;