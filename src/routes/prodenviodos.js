const express = require('express');
const router = express.Router();


// Models 
const Prodenviodos = require('../models/prodenviodos');
const Prodenviotres = require('../models/prodenviotres');

const Cart = require('../models/cart');

// Helpers
const { isAuthenticated } = require('../helpers/auth');




////////////////////////////////////////////////////////////////////////////





router.post('/prodenviodos/new-enviodos',  async (req, res) => {
  const { name, title, image, imagedos, imagetres, description, price } = req.body;
  const errors = [];
  if (!image) {
    errors.push({text: 'Please Write a Title.'});
  }
  if (!title) {
    errors.push({text: 'Please Write a Description'});
  }
  if (!price) {
    errors.push({text: 'Please Write a Description'});
  }
  if (errors.length > 0) {
    res.render('notes/new-note', {
      errors,
      image,
      title,
      price
    });
  } else {
    const newNote = new Prodenviodos({ name, title, image, imagedos, imagetres, description, price });
    //newNote.user = req.user.id;
    await newNote.save();
    req.flash('success_msg', 'Note Added Successfully');
    res.redirect('/enviodosback/1');
  }
});










//////////////////////////////////////////////////////////////////////




router.get('/enviodos', isAuthenticated,  async (req, res) => {
  const { id } = req.params;
  const prodenviodos = await Prodenviodos.find({}) 
  const prodenviotres = await Prodenviotres.find({}) 
  res.render('prodenviodos/enviodos', {prodenviodos, prodenviotres});
});



router.get('/envioprecios/:id', async (req, res) => {
    const { id } = req.params;
    const prodenviodos = await Prodenviodos.findById(id);
    res.render('prodenviodos/envioprecio', {prodenviodos});
  });





//////////////////////////////////////////////////////////////////////

router.get('/enviodosback/:page', async (req, res) => {
let perPage = 8;
let page = req.params.page || 1;

Prodenviodos
.find({}) // finding all documents
.sort({ timestamp: -1 })
.skip((perPage * page) - perPage) // in the first page the value of the skip is 0
.limit(perPage) // output just 9 items
.exec((err, prodenviodos) => {
  Prodenviodos.countDocuments((err, count) => { // count to calculate the number of pages
    if (err) return next(err);
    res.render('prodenviodos/new-prodenviodos', {
      prodenviodos,
      current: page,
      pages: Math.ceil(count / perPage)
    });
  });
});
});






/////////////////////////////////////////////////////////////////////




//editar


router.get('/prodenviodos/edit/:id',  async (req, res) => {
  const prodenviodos = await Prodenviodos.findById(req.params.id);
  res.render('prodenviodos/edit-prodenviodos', { prodenviodos });
});

router.post('/prodenviodos/edit/:id',  async (req, res) => {
  const { id } = req.params;
  await Prodenviodos.updateOne({_id: id}, req.body);
  res.redirect('/enviodosback/1');
});




// Delete 
router.get('/prodenviodos/delete/:id', async (req, res) => {
  const { id } = req.params;
    await Prodenviodos.deleteOne({_id: id});
  res.redirect('/prodenviodos/1');
});








///////////////////////////////////////cart//////////////////////////////////////777




// router.get('/addtocardprodcuatro/:id', function(req, res, next){
//   var productId = req.params.id;
//   var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

//   Prodcuatro.findById(productId, function(err, envio){
//     if(err){
//       return res-redirect('/');
//     }
//     cart.addd(envio, envio.id);
//     req.session.cart = cart;
//     console.log(req.session.cart);
//     res.redirect('/prepagar');
//   });
// });






router.get('/addtocardprodenviodos/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  Prodenviodos.findById(productId, function(err, product){
    if(err){
      return res-redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/prepagar');

  });
});



module.exports = router;
