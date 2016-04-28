var express = require('express');
var app = module.exports = express();
var crudMenu = require("./crud");

app.set('views', __dirname + '/views');

app.route('/editar')
.post(function(req, res){
	crudMenu.update(req, res, function(err, menu, flash){
		  if(err){
       res.redirect("/admin/error");
      }else{
        res.redirect("/admin/editarMenu");
      }
	});
});

app.route('/nuevo')
.post(function(req, res){
	crudMenu.create(req, res, function(err, menu, flash){
		  if(err){
       res.redirect("/admin/error");
      }else{
        res.redirect("/admin/editarMenu");
      }
	});
});

app.route('/eliminar/:menu')
  .get(function(req,res){
    crudMenu.deleter(req, res, function(err, menu, flash){
      if(err){
        res.redirect("/admin/error");
      }else{
        res.redirect("/admin/editarMenu");
      }
  });
});