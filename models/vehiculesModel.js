
const mongoose = require('mongoose');


const vehiculeSchema = new mongoose.Schema({
    nom:{
        type:String, 
        required: true
    },
    marque: {
        type:String, 
        required: true
    },
    ddte: Date,
    date:{
        type:Date, 
        default:Date.now}
});

const Model = mongoose.model('vehicules', vehiculeSchema);

module.exports = Model;