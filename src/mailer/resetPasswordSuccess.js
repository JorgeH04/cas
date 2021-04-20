const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.resetPasswordSuccss = (user) => {
    //this is the message body for mail when password change succcessfully
    nodeMailer.transporter.sendMail({
       from: 'passwordreset@demo.com',
       to: user.email,
       subject: 'Your password has been changed',
       text:  'Hello,\n\n' +
       'Esto es una confirmación de que su contraseña ' + user.email + ' acaba de ser cambiada exitosamente.\n'
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }
        req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        console.log('Message sent', info);
        return;
    });
}



// this is another way of exporting a method
exports.hello = (user) => {
    //this is the message body for mail when password change succcessfully
    nodeMailer.transporter.sendMail({
       from: 'passwordreset@demo.com',
       to: user.email,
       subject: 'Bienvenido a Cervecería Grossi',
       text:  
       //'Hola,\n\n' +
       'Hola ' + user.email + ' te damos la bienvenida a Cervecería Grossi. Estamos a su disposición. Muchas gracias. '
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }
        req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        console.log('Message sent', info);
        return;
    });
}




// this is another way of exporting a method
exports.pago = ( order, cart) => {
    //this is the message body for mail when password change succcessfully
    nodeMailer.transporter.sendMail({
       from: 'passwordreset@demo.com',
       to: order.emaill,
       subject: 'Registro de compra',
       text:  'Hola,\n\n' +
       'Hola ' + order.name + ' hemos registrado tu compra por un monto de: $' + order.totalcart + '. Nos pondremos en contacto con usted ni bien ingrese el pago' 
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }
        req.flash('info', 'Le ha sido enviado un email a ' + order.emaill + ' ya que hemos registrado su pedido');
        console.log('Message sent', info);
        return;
    });
}













// this is another way of exporting a method
exports.venta = ( user) => {
    //this is the message body for mail when password change succcessfully
    nodeMailer.transporter.sendMail({
       from: 'passwordreset@demo.com',
       to: 'jhessle04@gmail.com',
       subject: 'Venta',
       text:  'Hola,\n\n' +
       'Alguien llenó un formulario de venta, fijate en la sección de pedidos de qué se trata'
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }
        req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        console.log('Message sent', info);
        return;
    });
}
 

