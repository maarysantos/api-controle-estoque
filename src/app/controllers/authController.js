const express = require ('express');
const router = express.Router();

const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
const crypto = require ('crypto');
const mailer = require('../../modules/mailer');

const authConfig = require('../../config/auth');
const { User } = require ('../models');

function generateToken ( params = {}) {

  return jwt.sign({params}, authConfig.secret,
  {
    expiresIn : 86400,
  });

};

router.post('/register', async (req, res) => {
  try{
    if (await User.findOne({where : {email : req.body.email}})){
      return res.status(400).send('Usuário já existe!');
    }

    const usuario = await User.create(req.body);
    usuario.password = undefined;
        
    return res.send ({
      msg : 'Cadastrado com sucesso!',
      token : generateToken({id: usuario.id})//idUser
    });

  }catch (err){
     console.log(err);
     return res.status(412).send({error :err});
    }
   
});

router.post('/authenticate', async (req, res) => {
    const {email, password} = req.body;
    
    const usuario = await User.findOne({where : {email}})
    if (!usuario)
        return res.status(400).send({error :"Usuário não encontrado!"});

    if(! await bcrypt.compare(password, usuario.password))
        return res.status(400).send({error: "Senha invalida"});

    usuario.password = undefined;
    res.send({
         usuario,
         token : generateToken({id:usuario.id})//idUser
    });
});   

router.put('/forgot_password', async (req, res) => {
    const { email } = req.body;

    try{
        const user = await User.findOne({ where : { email }});

        if(!user)
        return res.status(403).send({ error : 'Usuário não encontrado' });

        const token = crypto.randomBytes(20).toString('hex');
        const now = new Date ();
        now.setHours(now.getHours()+1);
        console.log(now.getHours())
        //token vai ser salvo no model.

       // await User.findById({})
        User.update({
            passwordResetToken : token,
            passwordResetExpires : now
        },{
            where: {email: user.email}
        });

        mailer.sendMail({

            to : email,
            from : 'maridosantos2@gmail.com',
            template : 'auth/forgot_password',
            context : { token }

        }, (err) => {
            if(err)
              return res.status(400).send({err})

            return res.send({ msg :'Email enviado'});
        });

    }
    
    catch (error){
        return res.status(400).send( {error});

    }
});

router.put('/reset_password', async(req, res)=>{

    const { email, token, password } = req.body;

    try {
        const user = await User.findOne({ where : { email }});
        if(!user)
          return res.status(400).send({ error : 'Usuário não encontrado!'});

        if (token !== user.passwordResetToken)
          return res.status(400).send({ error : 'Token ivalido' });

        const now = new Date();
        if (now > user.passwordResetExpires)
          return res.status(400).send ({ error : 'Token expirado, gere um novo'});

        user.password = password;
        await user.save();
        res.send({ msg : 'Senha alterada com sucesso' });

    } catch (err) {
        return res.status(400).send( {error : 'Não podemos resetar a senha, tente novamente'});

    }
});

module.exports = app => app.use('/', router)