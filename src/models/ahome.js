const mongoose = require('mongoose');
const { Schema } = mongoose;
 
const NoteSchema = new Schema({
 views: {
   type: Number,
   default: false
},  
 ip: {
    type: String,
    default: false
 }, 
 createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model('Ahome', NoteSchema);
