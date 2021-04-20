const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');

// Models
const User = require('../models/User');
const Order = require('../models/order');
const Cart = require('../models/cart');
const Ahome = require('../models/ahome');
 
const nodemailer = require('nodemailer')

const userController=require('../config/controllers');

const hello =require('../mailer/resetPasswordSuccess');

const { isAuthenticated } = require('../helpers/auth');

 

router.get('/pedidos/:page', async (req, res) => {

  const totalpedidos = await Order.countDocuments({})

  let perPage = 8;
  let page = req.params.page || 1;

  Order 
  .find({}) // finding all documents
  .sort({ _id: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, orders) => {
    var user;
    var cart;
    orders
    .forEach(function(order){
      cart=new Cart(order.cart);
      user=new User(order.user);
      order.items = cart.generateArray();  
     // order.total = cart.totalprice();  
    });
    Order.countDocuments((err, count) => { // count to calculate the number of pages
      if (err) return next(err);
      res.render('cart/pedidos', {
        totalpedidos,
        orders,
        current: page,
        pages: Math.ceil(count / perPage)
      });
    });
  });
});





router.get('/perfil/:page', isAuthenticated, async (req, res) => {

  let perPage = 8;
  let page = req.params.page || 1;

  Order 
  .find({}) // finding all documents
  .sort({ _id: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, orders) => {
    var cart;
    orders
    .forEach(function(order){
      cart=new Cart(order.cart);
      order.items = cart.generateArray();
    });
    Order.countDocuments((err, count) => { // count to calculate the number of pages
      if (err) return next(err);
      res.render('users/profile', {
        orders,
        current: page,
        pages: Math.ceil(count / perPage)
      });
    });
  });
});


/////////////////////////////////////////////////////////////////////////////////////////////////////


router.get('/perfil/:page', async(req, res) => {
  const user = await User.findById(req.params.id);

    res.render('users/profile', { user });
});

router.post('/account/:id',  async (req, res) => {
  const { id } = req.params;
  await User.updateOne({_id: id}, req.body);
  res.redirect('/account');
});



router.get('/cambiarpw', async(req, res) => {
  
  res.render('profile/cambiarpw');
});




////////////////////////////////////////crud de orders////////////////////////////////////////////////////


// Delete 
router.get('/order/delete/:id', async (req, res) => {
  const { id } = req.params;
    await Order.deleteOne({_id: id});
  res.redirect('/pedidos/:1');
});


router.get('/order/turn/:id', async (req, res, next) => {
  let { id } = req.params;
  const task = await Order.findById(id);
  task.status = !task.status;
  await task.save();
  res.redirect('/pedidos/:1');
});


/////////////////////////////////////////////////////////////////////////

 

  router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

  router.get('/facebook/callback',
      passport.authenticate('facebook', {
        successRedirect : '/perfil/1',
        failureRedirect : '/'
      }));


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/perfil/1');
      }
    );
   




router.get('/users/profile', async(req, res) => {
  const orders = await Order
  .find({user: req.user})
  .sort({ _id: -1 });

    var cart;
    orders.forEach(function(order){
      cart=new Cart(order.cart);
      order.items = cart.generateArray();
    });
    res.render('users/profile', {orders});
});





router.get('/users/signup', (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});
  res.render('users/signup',
{
  products: cart.generateArray(), totalPrice: cart.totalPrice
} );
});






router.post('/users/signup', async (req, res) => {
  let errors = [];
  const { name, email, password, confirm_password, number, fecha, address, telefono, direccion, localidad, piso } = req.body;

   // checking for roles
  //  if (req.body.roles) {
  //   const foundRoles = await Role.find({ name: { $in: roles } });
  //   newUser.roles = foundRoles.map((role) => role._id);
  // } else {
  //   const role = await Role.findOne({ name: "user" });
  //   newUser.roles = [role._id];
  // }

  
  if(password != confirm_password) {
    errors.push({text: 'Passwords do not match.'});
    req.flash('error', 'Passwords do not match.');

  }
  if(password.length < 4) {
    errors.push({text: 'Passwords must be at least 4 characters.'})
    req.flash('error', 'Passwords must be at least 4 characters.');

  }
  if(errors.length > 0){
    res.render('users/signup', {name, email, password, confirm_password, number, telefono, direccion, fecha, address, localidad, piso });
  } else {

    const emailUser = await User.findOne({email: email});
    if(emailUser) {
      req.flash('error', 'The Email is already in use.');
      res.redirect('/users/signup');
    } else {


      const newUser = new User({name, email, password, confirm_password, number, fecha, telefono, direccion, address, localidad, piso});
      newUser.password = await newUser.encryptPassword(password);
      hello.hello(newUser);

      await newUser.save();
    
   
      req.flash('success', 'You are registered.');
      res.redirect('/users/signin');
    }
  }
});

////////////////////////////////////////////////////////////////////

router.get('/forgot',
userController.forgot);


//after submit the email it will generate the accesstoken
router.post('/forgotPassword',userController.forgotPassword);

//it will render the reset page where user fill emai
router.get('/userpasswordForgot/:token',userController.renderResetPage);

//router for when password will successfully change using reset link mail
router.post('/passwordForgot/:token',userController.forgotSuccess);

//it wiil redirect to the reset page
router.get('/reset',userController.resetPage);



//it is route for normal password update when user login
router.post('/passwordReset',userController.resetPassword);




router.get('/users/signin', (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  res.render('users/signin', {
    products: cart.generateArray(), totalPrice: cart.totalPrice
  });
});

router.post('/users/signin', passport.authenticate('local', {
  failureRedirect: '/users/signin',
  failureFlash: true
}), function (req, res, next){
  if(req.session.oldUrl){
    var oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  }else{
    req.flash('success', 'Loggeado exitosamente');
   res.redirect('/');
  }
});


router.get('/users/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Saliste de tu cuenta.');
  res.redirect('/users/signin');
});

 


router.get('/users/backend', async (req, res) => {
  const totalusers = await User.countDocuments({})

  const users = await User.find();
  res.render('users/usersback', { users, totalusers});
  
});


router.get('/nanushka', async (req, res) => {
  const users = await User.find();
  res.render('users/dashboard', { users});
  
});
// router.get('/order/delete/:id', async (req, res) => {
//   const { id } = req.params;
//     await Order.deleteOne({_id: id});
//   res.redirect('/pedidos/:1');
// });

// Delete 
router.get('/account/delete/:id', async (req, res) => {
  const { id } = req.params;
    await User.findByIdAndRemove({_id: id});
  res.redirect('/');
});

module.exports = router;

