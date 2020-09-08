const express = require('express');

//create of server
const app = express();

const PORT = process.env.PORT || 4000;


app.listen(PORT,() =>{
    console.log('server is working into port 4000');
})