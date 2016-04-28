var express = require('express');
var app = module.exports = express();
var crudSlider = require("./crud");

var multipart = require('connect-multiparty');

app.route('/editar')
.post(multipart(),function(req, res){
	crudSlider.update(req, res, function(err, menu, flash){
		  if(err){
		  	console.log(err);
       res.redirect("/admin/error");
      }else{
        res.redirect("/admin/editarslider");
      }
	});
});

app.route('/nuevo')
.post(multipart(),function(req, res){
	crudSlider.create(req, res, function(err, menu, flash){
		  if(err){
		console.log(err);
       res.redirect("/admin/error");
      }else{
        res.redirect("/admin/editarslider");
      }
	});
});

app.route('/eliminar/:slider')
  .get(function(req,res){
    crudSlider.deleter(req, res, function(err, menu, flash){
      if(err){
        res.redirect("/admin/error");
      }else{
        res.redirect("/admin/editarslider");
      }
  });
});