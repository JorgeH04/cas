const express = require('express');
const router = express.Router();
const mercadopago = require("mercadopago");


// Models
const Produno = require('../models/produno');
const Cart = require('../models/cart');
const Order = require('../models/order');

// Helpers
const { isAuthenticated } = require('../helpers/auth');

const userController=require('../config/controllers');
const User = require('../models/User');
const nodeMailer = require('../config/nodemailer');


const resetMailer=require('../mailer/resetPasswordmailer');
const resetSuccess=require('../mailer/resetPasswordSuccess');


const venta =require('../mailer/resetPasswordSuccess');
const pago =require('../mailer/resetPasswordSuccess');


////////////////////////////////////////back/////////////////////////////////////////////////////7

router.post('/produno/new-produno',  async (req, res) => {
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
    const newNote = new Produno({ 
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
    res.redirect('/produnoback/:1');
  }
});





router.get('/produnoback/:page', async (req, res) => {


  let perPage =12;
  let page = req.params.page || 1;

  Produno 
  .find()// finding all documents
  .sort({_id:-1})
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, produno) => {
    Produno.countDocuments((err, count) => { // count to calculate the number of pages
      if (err) return next(err);
      res.render('produno/new-produno', {
        produno,
        current: page,
        pages: Math.ceil(count / perPage)
      });
    });
  });
});








router.get("/searchback", function(req, res){
  var noMatch = null;
  if(req.query.search) {
      const regex = new RegExp(escape(req.query.search), 'gi');
      // Get all campgrounds from DB
      console.log(req.query.search)
      Produno.find({title: regex}, function(err, produno){
         if(err){
             console.log(err);
         } else {
            if(produno.length < 1) {
                noMatch = "No campgrounds match that query, please try again.";
            }
            res.render("produno/new-produno",{produno, noMatch: noMatch});
         }
      });

  } else {
      // Get all campgrounds from DB
      Produno.find({}, function(err, produno){
         if(err){
             console.log(err);
         } else {
            res.render("produno/produno",{produno, noMatch: noMatch});
         }
      });
  }
});







/////////////////////////////////////////front//////////////////////////////////////////////////

router.get('/produnoindex/:page', async (req, res) => {

  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  let perPage = 8;
  let page = req.params.page || 1;

  Produno 
  .find({}) // finding all documents
  .sort( {timestamp: -1})
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, produno) => {
    Produno.countDocuments((err, count) => { // count to calculate the number of pages
      if (err) return next(err);
      res.render('produno/produno', {
        produno,
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice

      });
    });
  });
});






router.get('/produnoredirect/:id', async (req, res) => {
  const { id } = req.params;
  const produno = await Produno.findById(id);
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  res.render('produno/produnoredirect', {
    produno,
    products: cart.generateArray(), totalPrice: cart.totalPrice

  });
});





router.get("/search", function(req, res){
  var noMatch = null;
  if(req.query.search) {
      const regex = new RegExp(escape(req.query.search), 'gi');
      // Get all campgrounds from DB
      console.log(req.query.search)
      Produno.find({title: regex}, function(err, produno){
         if(err){
             console.log(err);
         } else {
            if(produno.length < 1) {
                noMatch = "No campgrounds match that query, please try again.";
            }
            res.render("produno/produno",{produno, noMatch: noMatch});
         }
      });

  } else {
      // Get all campgrounds from DB
      Produno.find({}, function(err, produno){
         if(err){
             console.log(err);
         } else {
            res.render("produno/produno",{produno, noMatch: noMatch});
         }
      });
  }
});



/////////////////////////////////filter/////////////////////////////////////////////




router.post("/filtroprod", function(req, res){

  let perPage = 8;
  let page = req.params.page || 1;

  var flrtName = req.body.filtroprod;

  if(flrtName!='' ) {

    var flterParameter={ $and:[{ name:flrtName},
      {$and:[{},{}]}
      ]
       
    }
    }else{
      var flterParameter={}
  }
  var produno = Produno.find(flterParameter);
  produno
  //.find( flterParameter) 
  .sort({ _id: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, data) => {
    produno.countDocuments((err, count) => {  
  //.exec(function(err,data){
      if(err) throw err;
      res.render("produno/produno",
      {
        produno: data, 
        current: page,
        pages: Math.ceil(count / perPage)
      
      });
    });
  });
});








router.post("/filtroprecio", function(req, res){

  let perPage = 8;
  let page = req.params.page || 1;

  var flrtName = req.body.filtroprice;

  if(flrtName!='' ) {

    var flterParameter={ $and:[{ filtroprice:flrtName},
      {$and:[{},{}]}
      ]
       
    }
    }else{
      var flterParameter={}
  }
  var produno = Produno.find(flterParameter);
  produno
  //.find( flterParameter) 
  .sort({ _id: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, data) => {
    produno.countDocuments((err, count) => {  
  //.exec(function(err,data){
      if(err) throw err;
      res.render("produno/produno",
      {
        produno: data, 
        current: page,
        pages: Math.ceil(count / perPage)
      
      });
    });
  });
});






router.post("/filtrocolor", function(req, res){

  let perPage = 8;
  let page = req.params.page || 1;

  var flrtName = req.body.filtrocolor;

  if(flrtName!='' ) {

    var flterParameter={ $and:[{ color:flrtName},
      {$and:[{},{}]}
      ]
       
    }
    }else{
      var flterParameter={}
  }
  var produno = Produno.find(flterParameter);
  produno
  //.find( flterParameter) 
  .sort({ _id: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, data) => {
    produno.countDocuments((err, count) => {  
  //.exec(function(err,data){
      if(err) throw err;
      res.render("produno/produno",
      {
        produno: data, 
        current: page,
        pages: Math.ceil(count / perPage)
      
      });
    });
  });
});




////////////////////////////like////////////////////////

router.get('/likeproduno/:id', async (req, res, next) => {
  // let { id } = req.params;
  // const task = await Ofertauno.findById(id);
  const task = await Produno.findById(req.params.id);
  task.like = !task.like;
  await task.save();
 // res.redirect('/pedidos/:1');
  res.json(true);
});

///////////////////////////////////////////////////////////////////////////7



// talle y color
router.get('/produno/tallecolor/:id',  async (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  const produno = await Produno.findById(req.params.id);
  res.render('produno/tallecolor-produno', { 
    produno,
    products: cart.generateArray(), totalPrice: cart.totalPrice

   });
});

router.post('/produno/tallecolor/:id',  async (req, res) => {
  const { id } = req.params;
  await Produno.updateOne({_id: id}, req.body);
   const task = await Produno.findById(id);
   task.status = !task.status;
   await task.save();

  res.redirect('/produnoredirect/' + id);
});




//editar



router.get('/produno/edit/:id',  async (req, res) => {
  const produno = await Produno.findById(req.params.id);
  res.render('produno/edit-produno', { produno });
});

router.post('/produno/edit/:id',  async (req, res) => {
  const { id } = req.params;
  await Produno.updateOne({_id: id}, req.body);
  res.redirect('/produnoback/:1');
});




// Delete 
router.get('/produno/delete/:id', async (req, res) => {
  const { id } = req.params;
    await Produno.deleteOne({_id: id});
  res.redirect('/produnoback/:1');
});








//////////////////////////////cart////////////////////////////////////7

router.get('/shopcart', function (req, res, next){
  if(!req.session.cart){
    return res.render('cart/shopcart', {products:null})
  }
  var cart = new Cart(req.session.cart);
  res.render('cart/shopcart', {products: cart.generateArray(), totalPrice: cart.totalPrice})
});

 
router.get('/addtocardproduno/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});
 
  Produno.findById(productId, function(err, product){
    if(err){
      return res-redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    req.flash('success', 'Producto agregado al carro exitosamente');
    //res.redirect('/produnoredirect/' + productId);
    res.redirect('/shopcart');
  });
});





router.get('/reduce/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect('/shopcart');
});

router.get('/remove/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect('/shopcart');
});


router.get('/removee/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect('/prepagar');
});

router.get('/sumar/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.sumar(productId);
  req.session.cart = cart;
  res.redirect('/shopcart');
});

router.get('/', function (req, res, next){
  if(!req.session.cart){
    return res.render('cart/shopcart', {products:null})
  }
  var cart = new Cart(req.session.cart);
  res.render('/', {products: cart.generateArray(), totalPrice: cart.totalPrice})
});








router.get('/checkout',isAuthenticated, function (req, res, next){
  var cart = new Cart(req.session.cart);
  res.render('cart/checkout', {products: cart.generateArray(), total: cart.totalPrice})
});



router.post('/confirmacion', isAuthenticated, async (req, res, next)=>{
  if(!req.session.cart){
    return res.render('/', {products:null})
  }
  const cart = new Cart(req.session.cart);
  const c = new User (req.user);

  const order = new Order({
    user: req.user,
    cart: cart,
    totalcart: cart.totalPrice, 
    name: req.body.name,
    surname: req.body.surname,
    address: req.body.address,
    localidad: req.body.localidad,
    piso: req.body.piso,
    number: req.body.number,
    //emaill: req.body.emaill,
    emaill: c.email,
    nota: req.body.nota
      

  });
  console.log(order)
  await order.save();
  req.flash('success_msg', 'Note Added Successfully');
  res.redirect('/mediodepago');
  
})


router.get('/prepagar', isAuthenticated,function (req, res, next){
  if(!req.session.cart){
    return res.render('/', {products:null})
  }
  var cart = new Cart(req.session.cart);
  res.render('cart/prepagar', {products: cart.generateArray(), total: cart.totalPrice})
});



router.get('/mediodepago',isAuthenticated, function (req, res, next){

  if(!req.session.cart){
    return res.render('/', {products:null})
  }
  var cart = new Cart(req.session.cart);
  res.render('cart/mediodepago', {products: cart.generateArray(), total: cart.totalPrice})
});



router.post('/checkout',isAuthenticated,  async (req, res) => {

  if(!req.session.cart){
    return res.render('/', {products:null})
 }
 const cart = new Cart(req.session.cart);

 const c = new User (req.user);


 const order = new Order({
  user: req.user,
  cart: cart,
  totalcart: cart.totalPrice, 
  emaill: c.email,
  name: req.body.name
});

 
  mercadopago.configure({
    // access_token: 'TEST-1727718622428421-041715-2360deef34519752e5bd5f1fca94cdf1-344589484',
    // publicKey: 'TEST-662a163b-afb0-4994-9aea-6be1cca2decd'
    //    access_token: 'APP_USR-1727718622428421-041715-07777da5a8f8451aba826d2727adeadd-344589484',
    //  publicKey: 'APP_USR-9abfa6a9-7a19-45c9-9d13-15edf5baf8f7'

    access_token: 'APP_USR-3374731150921132-012522-fe3b61421390d26b23694c3305c08d30-276524207',
    publicKey: 'APP_USR-3b5e16b6-d887-4643-9600-5e82ac1e97eb'

});
  
    // Cria um objeto de prefer??ncia
    let preference = {
      items: [
        {
          title: "Total a pagar:",
          unit_price: cart.totalPrice, 
          quantity: 1
        }
      ]
    };
     
    mercadopago.preferences
      .create(preference)
      .then(function(response) {
        global.init_point = response.body.init_point;
        var preference_id = response.body.id;
        res.render("cart/checkout", { preference_id });
      })
      .catch(function(error) {
        res.render("error");
        console.log(error);
      });
      venta.pago(order);
 
});  


module.exports = router;