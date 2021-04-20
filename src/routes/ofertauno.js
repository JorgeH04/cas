const express = require('express');
const router = express.Router();
 
// Models
const Ofertauno = require('../models/ofertauno');
const Cart = require('../models/cart');

// Helpers
const { isAuthenticated } = require('../helpers/auth');





router.post('/ofertauno/new-ofertauno',  async (req, res) => {
  const { 
    name,
    title,
    image,
    imagedos,
    imagetres,
    imagecuatro,
    imagecinco,
    description,
    filtroprice,
    enstock,
    color,
    coloruno,
    colordos,
    colortres,
    colorcuatro,
    talle,
    talleuno,
    talledos,
    talletres,
    tallecuatro,
    tallecinco,
    talleseis,
    oldprice,
    price
  } = req.body;
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
    const newNote = new Ofertauno({ 
      name,
      title,
      image,
      imagedos,
      imagetres,
      imagecuatro,
      imagecinco,
      description,
      filtroprice,
      enstock,
      color,
      coloruno,
      colordos,
      colortres,
      colorcuatro,
      talle,
      talleuno,
      talledos,
      talletres,
      tallecuatro,
      tallecinco,
      talleseis,
      oldprice,
      price    
    });
    //newNote.user = req.user.id;
    await newNote.save();
    req.flash('success_msg', 'Note Added Successfully');
    res.redirect('/ofertauno/add');
  }
});







router.get('/ofertaunoredirect/:id', async (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  const { id } = req.params;
  const ofertauno = await Ofertauno.findById(id);
  res.render('ofertauno/ofertaunoredirect', {
    ofertauno,
    products: cart.generateArray(), totalPrice: cart.totalPrice

  });
});








// New product
router.get('/ofertauno/add',  async (req, res) => {
  const ofertauno = await Ofertauno.find();
  res.render('ofertauno/new-ofertauno',  { ofertauno });
});



////////////////////////////like////////////////////////

router.get('/like/:id', async (req, res, next) => {
  // let { id } = req.params;
  // const task = await Ofertauno.findById(id);
  const task = await Ofertauno.findById(req.params.id);
  task.like = !task.like;
  await task.save();
 // res.redirect('/pedidos/:1');
  res.json(true);
});




// talle y color
router.get('/ofertauno/tallecolor/:id',  async (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});
  const ofertaun = await Ofertauno.find();
  const ofertauno = await Ofertauno.findById(req.params.id);
  res.render('ofertauno/tallecolor-ofertauno', { 
    ofertauno, 
    ofertaun,
    products: cart.generateArray(), totalPrice: cart.totalPrice
  });
});

router.post('/ofertauno/tallecolor/:id',  async (req, res) => {
  const { id } = req.params;
   await Ofertauno.updateOne({_id: id}, req.body);
   const task = await Ofertauno.findById(id);
   task.status = !task.status;
   await task.save();
  res.redirect('/ofertaunoredirect/' + id);
});
 


////////////////////////////////////////crud////////////////////////////////////////////////7



//editar


router.get('/ofertauno/edit/:id',  async (req, res) => {
  const ofertauno = await Ofertauno.findById(req.params.id);
  res.render('ofertauno/edit-ofertauno', { ofertauno });
});

router.post('/ofertauno/edit/:id',  async (req, res) => {
  const { id } = req.params;
  await Ofertauno.updateOne({_id: id}, req.body);
  res.redirect('/ofertauno/add');
});



// Delete 
router.get('/ofertauno/delete/:id', async (req, res) => {
  const { id } = req.params;
    await Ofertauno.deleteOne({_id: id});
  res.redirect('/ofertauno/add');
});




////////////////////////////////////////cart////////////////////////////////////////////////7


router.get('/addtocardofertauno/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  Ofertauno.findById(productId, function(err, product){
    if(err){
      return res-redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    req.flash('success', 'Producto agregado al carro exitosamente');
    //res.redirect('/ofertaunoredirect/' + productId);
    res.redirect('/shopcart');
  });
});

 

module.exports = router;

//   cart.sumar(productId);
//   req.session.cart = cart;
//   res.redirect('/ofertaunoredirect/' + productId);
// });

// router.get('/reduceofertauno/:id', function(req, res, next){
//   var productId = req.params.id;
//   var cart = new Cart(req.session.cart ? req.session.cart : {});

//   cart.reduceByOne(productId);
//   req.session.cart = cart;
//   res.redirect('/ofertaunoredirect/' + productId);
// });

module.exports = router;
