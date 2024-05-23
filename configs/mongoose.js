const mongoose = require('mongoose');
const colors = require('colors');

mongoose.connect('mongodb://127.0.0.1:27017/PBL').then(()=>{
    console.log('Database Connected Successfully'.bgGreen.black)
}).catch(()=>{
    console.log('Database Connection Failure'.bgRed.black)
})