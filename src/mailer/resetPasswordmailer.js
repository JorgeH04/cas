const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.resetPassword = (user,token) => {
    //this the message body for mail
    nodeMailer.transporter.sendMail({
       from: 'passwordreset@demo.com',
       to: user.email,
       subject: 'Resetear contraseña',
       text: 'Le estamos enviando este email porque usted ha solicitado cambiar la contraseña de su cuenta.\n\n' +
          'Haga click en el siguiente link, o cópielo en su navegador para completar el proceso:\n\n' +
         'https://' + 'www.cerveceriagrossi.com' + '/userpasswordForgot/' + token + '\n\n' +
      //  'http://' + 'localhost:3000' + '/userpasswordForgot/' + token + '\n\n' +
          'Si usted no solicitó este link, por favor ignore este email y su contraseña permanecerá tal como usted la creó.\n'
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }
        req.flash('success','Le hemos enviado un e-mail con una serie de instrucciones.');
        return;
    });
}