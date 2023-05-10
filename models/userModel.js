const mongoose =require('mongoose');


const userSchema = new mongoose.Schema({
    nom:{
        type:String,
        min: 6,
        max: 255
    },
    email:{
        type:String,
        min: 6,
        max:255
    },
    password:{
        type:String,
        min: 6,
        max: 255
    },
    date:{
        type: Date, 
        default: Date.now
    }
})


const Model = mongoose.model('users', userSchema);

module.exports = Model;