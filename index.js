const express = require('express');
const connetDB = require('./config/db');
const { json } = require('express');
//create of server
const app = express();

// connet mongo
connetDB();

app.use(express.json({extends:true}));

const PORT = process.env.PORT || 4000;


app.use('/api/users',require('./routes/userRoute'));

app.listen(PORT,() =>{
    console.log('server is working into port 4000');
})