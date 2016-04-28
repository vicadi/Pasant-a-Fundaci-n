var express = require('express');
var app = module.exports = express();
var crudUser = require("./crud");
var crudMenu = require("../menu/crud");
var nodemailer = require('nodemailer');

app.set('views', __dirname + '/views');

app.route('/signup')
.get(function(req, res){
  crudMenu.read(req, res, function(err, menus){
    res.render('signup', {
      message : req.flash('message'),
      user : req.session.user,
      title : 'Conexion bienestar',
      menus : menus
    });
  });
})
.post(function(req,res){
  crudUser.create(req, res, function(err, user, flash){
    if(err)
      res.redirect("/user/signup");
    if(user){
      var smtpTransport = nodemailer.createTransport("SMTP",{
      service: "Gmail",
        auth: {
          user: "fcbcontacto@gmail.com",
          pass: "fundacionconexionbienestar"
        }
      });
      var mailOptions = {
        from: "Fundacion Conexión Bienestar <fcbcontacto@gmail.com>", // sender address
        to: "<"+req.body.email+">", // list of receivers
        subject: "¡Bienvenido/a! "+req.body.nombre+" "+req.body.apellido, // Subject line
        text: "La Fundación Conexión Bienestar te da la bienvenida, nos complace que te hayas unido a nuestra comunidad, \n ¡GRACIAS POR APOYARNOS!"
      }
      smtpTransport.sendMail(mailOptions, function(error, response){
          if(error){
            req.flash('message', 'Error al enviar mensaje de bienvenida');
          }
      }); 
      req.session.user=user;
      res.redirect("/");
    }
  });
});

app.route('/login')
.post(function(req,res){
  var usuario=req.body.usuario.toLowerCase();
  db.user.findOne({nickName:usuario},function(errorUser, user){
    if(user){
      if(user.contrasena==req.body.contrasena){
        req.session.user=user;
        res.redirect("/admin");
      }else{
        req.flash('message', 'Contraseña incorrecta');
        res.redirect(req.body.url);
      }
    }else{
      req.flash('message', 'Usuario no existe');
      res.redirect(req.body.url);
    }
  });
});

app.route('/recuperarContrasena')
.get(function(req,res){
  crudMenu.read(req, res, function(err, menus){
    res.render('recuperarContrasena', {
      message : req.flash('message'),
      user : req.session.user,
      title : 'Conexion bienestar',
      menus : menus
    });
  });
})
.post(function(req,res){
  var usuario=req.body.usuario;
  var correo=req.body.correo;
  if(usuario){
    db.user.findOne({nickName:usuario},function(errorUser, user){
      if(user){
        var smtpTransport = nodemailer.createTransport("SMTP",{
          service: "Gmail",
          auth: {
            user: "fcbcontacto@gmail.com",
            pass: "fundacionconexionbienestar"
          }
        });
        var mailOptions = {
          from: "Fundacion Conexión Bienestar <fcbcontacto@gmail.com>", // sender address
          to: "<"+user.correo+">", // list of receivers
          subject: "Contraseña Fundación Conexión Bienestar",// Subject line
          text: "\n Usuario: "+user.nickName+" \n Contraseña: "+user.contrasena
        }
        smtpTransport.sendMail(mailOptions, function(error, response){
            if(error){
              req.flash('message', 'Error al enviar datos');
            }else{
              req.flash('message','Le hemos enviado los datos a '+user.correo);
              res.redirect('/');
            }
        }); 
      }else{
        req.flash('message', 'No esta registrado el usuario '+usuario);
        res.redirect('/user/recuperarContrasena');
      }
    });
  }else{
    db.user.findOne({correo:correo},function(errorUser, user){
      if(user){
        var smtpTransport = nodemailer.createTransport("SMTP",{
          service: "Gmail",
          auth: {
            user: "fcbcontacto@gmail.com",
            pass: "fundacionconexionbienestar"
          }
        });
        var mailOptions = {
          from: "Fundacion Conexión Bienestar <fcbcontacto@gmail.com>", // sender address
          to: "<"+user.correo+">", // list of receivers
          subject: "Contraseña Fundación Conexión Bienestar",// Subject line
          text: "\n Usuario: "+user.nickName+" \n Contraseña: "+user.contrasena
        }
        smtpTransport.sendMail(mailOptions, function(error, response){
            if(error){
              req.flash('message', 'Error al enviar datos');
            }else{
              req.flash('message','Le hemos enviado los datos a su correo');
              res.redirect('/');
            }
        }); 
      }else{
        req.flash('message', 'No esta registrado el correo '+correo);
        res.redirect('/user/recuperarContrasena');
      }
    });
  }
});

app.route('/logout')
.get(function(req,res){
  delete req.session.user;
  res.redirect('/');
});