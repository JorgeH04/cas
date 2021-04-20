const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
    name: String,
    title: String,
    image: String,
    description: String,
    price: Number,
 
});

module.exports = mongoose.model('Prodenvio', NoteSchema);
