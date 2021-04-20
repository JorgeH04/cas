const express = require('express');
const router = express.Router();


// Models
 const Prodenviobis = require('../models/prodenviobis');

const Cart = require('../models/cart');

// Helpers
const { isAuthenticated } = require('../helpers/auth');




////////////////////////////////////////////////////////////////////////////





router.post('/prodenviobis/new-enviobis',  async (req, res) => {
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
    const newNote = new Prodenviobis({ name, title, image, imagedos, imagetres, description, price });
    //newNote.user = req.user.id;
    await newNote.save();
    req.flash('success_msg', 'Note Added Successfully');
    res.redirect('/enviobisback/1');
  }
});










//////////////////////////////////////////////////////////////////////

 


router.get('/envio', isAuthenticated,  async (req, res) => {
  const { id } = req.params;
  const prodenviobis = await Prodenviobis.find({}) 
  const prodenvio = await Prodenvio.find({}) 
  res.render('prodenvio/envio', {prodenvio, prodenviobis
    //prodenviodos
  });
});



router.get('/envioprecios/:id', async (req, res) => {
    const { id } = req.params;
    const prodenvio = await Prodenvio.findById(id);
    res.render('prodenvio/envioprecio', {prodenvio});
  });





//////////////////////////////////////////////////////////////////////

router.get('/enviobisback/:page', async (req, res) => {

  const prodenviobis = await Prodenviobis.find({})

let perPage = 8;
let page = req.params.page || 1;

Prodenviobis
.find({}) // finding all documents 
.sort({ timestamp: -1 })
.skip((perPage * page) - perPage) // in the first page the value of the skip is 0
.limit(perPage) // output just 9 items
.exec((err, prodenviobis) => {
  Prodenviobis.countDocuments((err, count) => { // count to calculate the number of pages
    if (err) return next(err);
    res.render('prodenviobis/new-prodenviobis', {
      prodenviobis,
       current: page,
      pages: Math.ceil(count / perPage)
    });
  });
});
});






/////////////////////////////////////////////////////////////////////




//editar


router.get('/prodenviobis/edit/:id',  async (req, res) => {
  const prodenviobis = await Prodenviobis.findById(req.params.id);
  res.render('prodenviobis/edit-prodenviobis', { prodenviobis });
});

router.post('/prodenviobis/edit/:id',  async (req, res) => {
  const { id } = req.params;
  await Prodenviobis.updateOne({_id: id}, req.body);
  res.redirect('/enviobisback/1');
});




// Delete 
router.get('/prodenviobis/delete/:id', async (req, res) => {
  const { id } = req.params;
    await Prodenviobis.deleteOne({_id: id});
  res.redirect('/enviobisback/1');
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






router.get('/addtocardprodenviobis/:id', function(req, res, next){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});
  
    Prodenviobis.findById(productId, function(err, product){
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
