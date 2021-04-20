const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');


 



//carc20707
//here is the tranporter in ehich we place port and user email password by which we sent mail
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    //host: 'https://www.artstelen.com',
    //port: 465,
    port: 465,
    secure: false,
    auth: {
       // user: 'peeyushmamodia17',artstelen@gmail.com
       // pass: 'peeyush4769'
      //  user: 'carc20707@gmail.com',
      //  pass: 'Terremototo001'
          user: 'grossicervezas@gmail.com',
          pass: '001Grossi'
    }
    // ,
    // tls: {
    //     // do not fail on invalid certs
    //     rejectUnauthorized: false
    // }
});








//for rendering the html content
let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
         if (err){console.log('error in rendering template'); return}
         
         mailHTML = template;
        }
    )

    return mailHTML;
}


module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}