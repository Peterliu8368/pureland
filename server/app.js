const { urlencoded } = require("express");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const {MONGOURL} = require('./config/keys.js')

//connect to mongo db
mongoose.connect(MONGOURL);
mongoose.connection.on('connected', ()=> {
    console.log('Connected to mongo db hurray');
})
mongoose.connection.on('error', (err)=> {
    console.log('Error connecting', err);
})

//get mongodb model
require('./models/user.model');
require('./models/post.model');
//body parser
app.use(express.json())
app.use(urlencoded({extended: true}))
//use router
app.use(require('./routes/auth.routes'));
app.use(require('./routes/post.routes'));
app.use(require('./routes/user.routes'));

//production code
if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*", (req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})
