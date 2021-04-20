const express = require('express');
const router = express.Router();


// Models 
const Prodenviodos = require('../models/prodenviodos');
const Cart = require('../models/cart');

// Helpers
const { isAuthenticated } = require('../helpers/auth');

const Prodenviotres = require('../models/prodenviotres');



////////////////////////////////////////////////////////////////////////////





router.post('/prodenviotres/new-enviotres',  async (req, res) => {
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
    const newNote = new Prodenviotres({ name, title, image, imagedos, imagetres, description, price });
    //newNote.user = req.user.id;
    await newNote.save();
    req.flash('success_msg', 'Note Added Successfully');
    res.redirect('/enviotresback/1');
  }
});










//////////////////////////////////////////////////////////////////////




router.get('/enviotres', isAuthenticated,  async (req, res) => {
  const { id } = req.params;
  const prodenviotres = await Prodenviotres.find({}) 
  res.render('prodenviotres/enviotres', {prodenviotres});
});



router.get('/envioprecios/:id', async (req, res) => {
    const { id } = req.params;
    const prodenviotres = await Prodenviotres.findById(id);
    res.render('prodenviotres/envioprecio', {prodenviotres});
  });





//////////////////////////////////////////////////////////////////////

router.get('/enviotresback/:page', async (req, res) => {
let perPage = 8;
let page = req.params.page || 1;

Prodenviotres
.find({}) // finding all documents
.sort({ timestamp: -1 })
.skip((perPage * page) - perPage) // in the first page the value of the skip is 0
.limit(perPage) // output just 9 items
.exec((err, prodenviotres) => {
  Prodenviotres.countDocuments((err, count) => { // count to calculate the number of pages
    if (err) return next(err);
    res.render('prodenviotres/new-prodenviotres', {
      prodenviotres,
      current: page,
      pages: Math.ceil(count / perPage)
    });
  });
});
});






/////////////////////////////////////////////////////////////////////




//editar


router.get('/prodenviotres/edit/:id',  async (req, res) => {
  const prodenviotres = await Prodenviotres.findById(req.params.id);
  res.render('prodenviotres/edit-prodenviotres', { prodenviotres });
});

router.post('/prodenviotres/edit/:id',  async (req, res) => {
  const { id } = req.params;
  await Prodenviotres.updateOne({_id: id}, req.body);
  res.redirect('/enviotresback/1');
});




// Delete 
router.get('/prodenviotres/delete/:id', async (req, res) => {
  const { id } = req.params;
    await Prodenviotres.deleteOne({_id: id});
  res.redirect('/prodenviotres/1');
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






router.get('/addtocardprodenviotres/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  Prodenviotres.findById(productId, function(err, product){
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
