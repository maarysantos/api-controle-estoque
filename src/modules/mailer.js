const path = require ('path');
const nodemailer = require('nodemailer');

const exphbs = require('express-handlebars')
const hbs = require ('nodemailer-express-handlebars');

const viewPath = path.resolve('./src/resources/mail/');

//const viewPath = path.resolve(__dirname, "..", "views", "emails");

const {host, port, secure, user, pass} = require('../config/mail');

var transport = nodemailer.createTransport({
  host, 
  port,
  secure,
  auth: { user, pass }
});

transport.use('compile',
 hbs({
  viewEngine : exphbs.create({ 
    partialsDir : path.resolve('./src/resources/mail/partials')
  }),
  //onde fica as views de template de email. Ele parte da raiz absoluta do projeto
  viewPath,
  extName : '.html',
}));
  
module.exports=transport;