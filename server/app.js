const express = require("express");
const app = express();
const PORT = 5000;
const mongoose = require("mongoose");
const {MONGOURL} = require('./keys.js')

//get mongodb model
require('./models/user.model');

//body parser
app.use(express.json())


//use router
app.use(require('./routes/auth'));


//connect to mongo db
mongoose.connect(MONGOURL);
mongoose.connection.on('connected', ()=> {
    console.log('connected to mongo db hurray');
})
mongoose.connection.on('error', (err)=> {
    console.log('error connecting', err);
})


app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})
