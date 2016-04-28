var express = require('express');
var app = module.exports = express();
var crudPagina = require("../pagina/crud");
var crudMenu = require("../menu/crud");
var crudUser = require("../user/crud");
var crudSlider = require("../slider/crud");

app.set('views', __dirname + '/views');

app.use(function(req, res, next){
  db.menu.find().sort({posicion:1}).exec(function(errorMenu, menus){
    res.locals.user = req.session.user,
    res.locals.menus = menus;
    res.locals.message = req.flash('message'),
    next();
  });
});

app.route('/')
.get(function(req, res){
    crudMenu.read(req, res, function(err, menus, flash){
      res.render('index', {
        title : "Administrar paginas"
      });
    });
});

app.route('/editarpaginas')
.get(function(req, res){
    db.pagina.find({}).exec(function(error, pagsAdmin){
      crudMenu.read(req, res, function(err, menus){
        res.render('editarPaginas', {
          pagsAdmin: pagsAdmin,
          title : "Administrar paginas"
        });
      });  
    });
});

app.route('/editarmenu')
.get(function(req, res){
  db.pagina.find({publicar:true}, 'nombreEnlace titulo categoria').exec(function(error, paginas){
    crudMenu.read(req, res, function(err, menus){
      res.render('editarMenu', {
      title : "Administrar menu",
      paginas: paginas
      });
    });
  });
});

app.route('/editaruser')
.get(function(req, res){
    crudUser.read(req, res, function(err, users){
      crudMenu.read(req, res, function(err, menus){
        res.render('editarUser', {
          title : "Administrar paginas"
        });
      });  
    });
});

app.route('/editarslider')
.get(function(req, res){
  db.pagina.find({publicar:true}, 'nombreEnlace titulo categoria').exec(function(error, paginas){
    db.slider.find().sort('-fechaCreacion').exec(function(error, sliders){
      crudMenu.read(req, res, function(err, users){
        res.render('editarSlider', {
        title : "Administrar slider",
        paginas: paginas,
        sliders: sliders
        });
      });
    });
  });
});