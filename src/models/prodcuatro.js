const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
  name: String,
  title: String,
  image: String,
  imagedos: String,
  imagetres: String,
  imagecuatro: String,
  imagecinco: String,
  description: String,
  filtroprice: String,
  enstock:String,
  color: String,
  coloruno: String,
  colordos: String,
  colortres: String,
  colorcuatro: String,
  talle: String,
  talleuno: String,
  talledos: String,
  talletres: String,
  tallecuatro: String,
  tallecinco: String,
  talleseis: String,
  oldprice: Number,
  price: Number,
  status: {
    type: Boolean,
    default: false
  },
  like: {
    type: Boolean,
    default: false
  }


});

module.exports = mongoose.model('Prodcuatro', NoteSchema);
