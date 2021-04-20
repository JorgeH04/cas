const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

const OrderSchema = new Schema({
  user: { 
    type: ObjectId,
    ref: 'User'
   },
 
   cart: {
     type: Object,
     required: true
   
   },
   name: {
    type: String,
   },  
 
   surname: {
    type: String,
   },
   
    number: {
    type: String,
   },

    address: {
    type: String,
   },
   localidad: {
   type: String,
   },

   piso: {
     type: String,
  },
  emaill: {
    type: String,
   },

  nota: {
    type: String,
   },

   totalcart: {
    type: String,
   },
   status: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model('Order', OrderSchema);