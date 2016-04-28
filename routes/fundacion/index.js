var express = require('express');
var app = module.exports = express();
var Buffer= require('Buffer');
var nodemailer = require('nodemailer');
var crudColaboradores = require('./../colaboradores/crud');
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
  db.slider.find({publicado:true}).sort('-fechaCreacion').exec(function(error, sliders){
    db.pagina.aggregate({$match: {publicar:true} },{$sort: {categoria:1}},{$group: {_id: "$categoria", 
      descripcion: {$last: "$descripcion" },
      nombreEnlace: {$last: "$nombreEnlace" },
      fechaCreacion: {$last: "$fechaCreacion" },
      categoria: {$last: "$categoria" },
      linkImagen: {$last: "$linkImagen" },
      idVideo: {$last: "$idVideo" },
      titulo: {$last: "$titulo" }
    }},
          function(error, ultimasEntradasPrimarias){ 
          var array=[];
          if(ultimasEntradasPrimarias[0]) 
            array.push(ultimasEntradasPrimarias[0].nombreEnlace);
          if(ultimasEntradasPrimarias[1]) 
            array.push(ultimasEntradasPrimarias[1].nombreEnlace);
          if(ultimasEntradasPrimarias[3]) 
            array.push(ultimasEntradasPrimarias[3].nombreEnlace);

        db.pagina.find({publicar:true,categoria:{$ne:"sinCategoria"}, nombreEnlace:{$nin:array}}, 'descripcion nombreEnlace fechaCreacion categoria linkImagen idVideo titulo').sort('-fechaCreacion').limit(3).exec(function(error, ultimasEntradas){
            res.render('index', {
              title : 'Conexión Bienestar',
              ultimasEntradas:ultimasEntradas,
              ultimasEntradasPrimarias:ultimasEntradasPrimarias,
              sliders:sliders
            });
      });
    });
  });
});
app.route('/agregarContenidoScroll')
.post(function(req, res){
  var indice=req.body.indice;
  db.pagina.find({publicar:true,categoria:{$ne:"sinCategoria"}}, 'descripcion nombreEnlace fechaCreacion categoria idVideo linkImagen titulo').sort('-fechaCreacion').skip(indice).limit(4).exec(function(error, entradas){
        res.send(entradas);
  });
});

app.route('/todocontenido')
.get(function(req, res){
  db.pagina.find({publicar:true}, 'nombreEnlace titulo descripcion categoria').exec(function(error, paginas){
    db.menu.find().exec(function(errorMenu, menus){
      res.render('todocontenido', {
        paginas: paginas,
        title : 'Conexion bienestar'
      });
    });
  });
});

app.route('/hacerdonacion')
.get(function(req, res){
  var datosDonacion=req.session.datosDonacion;
  req.session.datosDonacion=null;
  var datosEncryptados;
  if(datosDonacion && datosDonacion.dinero){

    //espacio al final de cada String
      var dineroDonado=datosDonacion.cantidad+".00"
      var comercio = "4";

    var exec = require('child_process').exec;
    var command = 'php -f encrypt.php '+dineroDonado;
    
    exec(command,
      function (error, stdout, stderr) {
        // nodejs error
        if (error !== null) {
          console.log('exec error: ' + error);
        }
        else {
          var resultado = stdout.replace(" ","");
          datosEncryptados={};
          datosEncryptados.comercio=comercio;
          datosEncryptados.json= resultado;
          datosEncryptados.comercio=new Buffer(datosEncryptados.comercio).toString('base64');
          }
      res.render('hacerdonacion',{
        title : 'Conexión Bienestar',
        datosEncryptados: datosEncryptados,
        datosDonacion: datosDonacion
      });
    });
  }else{
        res.render('hacerdonacion',{
        title : 'Conexión Bienestar',
        datosDonacion: datosDonacion
      });
  }
})
.post(function(req, res){
  crudColaboradores.create(req, res, function(err, colaborador, flash){
    req.session.datosDonacion=req.body;
    res.redirect('/hacerdonacion');
  });
});

app.route('/estrellas')
.get(function(req, res){
 var datosDonacion=req.session.datosDonacion;
  req.session.datosDonacion=null;
  var datosEncryptados;
    if(datosDonacion && datosDonacion.estrellas){
      var date=new Date();
      var fechaCobroRecurrente=date.getFullYear().toString()+"-"+("0"+(date.getMonth()+2)).slice(-2).toString()+"-"+("0"+date.getDate()).slice(-2).toString();
      var estrellas=datosDonacion.estrellas;
      var valor=datosDonacion.valorEstrellas;
      valor+=".00";
      var comercio = "4";

    var exec = require('child_process').exec;
    var command = 'php -f encrypt2.php '+valor+' '+fechaCobroRecurrente;
    
    exec(command,
      function (error, stdout, stderr) {
        // nodejs error
        if (error !== null) {
          console.log('exec error: ' + error);
        }
        else {
          var resultado = stdout.replace(" ","");
          datosEncryptados={};
          datosEncryptados.comercio=comercio;
          datosEncryptados.json= resultado;
          datosEncryptados.comercio=new Buffer(datosEncryptados.comercio).toString('base64');
          }
      res.render('estrellas',{
        title : 'Conexión Bienestar',
        datosEncryptados: datosEncryptados,
        datosDonacion: datosDonacion
      });
    });
     }else{
        res.render('estrellas',{
        title : 'Conexión Bienestar',
        datosDonacion: datosDonacion
      });
      }
})
.post(function(req, res){
    req.session.datosDonacion=req.body;
    res.redirect('/estrellas');
});

app.route('/respuestaAddCelColombia')
.post(function(req,res){
  req.flash('message', 'Donacion exitosa');
  res.redirect('/');
});

app.route('/contacto')
.get(function(req, res){
  res.render('contacto',{
    title : 'Conexión Bienestar'
  });
});

app.route('/enviarContacto')
.post(function(req,res){
  var smtpTransport = nodemailer.createTransport("SMTP",{
      service: "Gmail",
    auth: {
      user: "fcbcontacto@gmail.com",
      pass: "fundacionconexionbienestar"
    }
  });
  var mailOptions = {
    from: "Correo Contacto <fcbcontacto@gmail.com>", // sender address
    to: "<relo.c@hotmail.com>", // list of receivers
    subject: "Solicitud de Contacto", // Subject line
    text: "Nombre: "+req.body.nombre+"\nApellido: "+req.body.apellido+"\nMail: "+req.body.email+
      "\nTelefono: "+req.body.telefono+"\nComentario: "+req.body.comentario
  }
  smtpTransport.sendMail(mailOptions, function(error, response){
      if(error){
        req.flash('message', 'Error al enviar correo vuelve a intentarlo por favor');
        res.redirect('/contacto');
      }else{
        req.flash('message', 'Mensaje enviado, gracias por contactarnos, espera nuestra respuesta');
        res.redirect('/');
      }
  }); 
});

app.route('/:pagina')
.get(function(req, res) {
  db.pagina.findOne({ nombreEnlace: req.params.pagina }, function(error, pagina){
    db.menu.find().exec(function(errorMenu, menus){
      if(pagina){
        res.render('pagina', {
          pagina: pagina,
          title : 'Conexión Bienestar'
  		  });
  	   }else{
        //Can not find the record, renders not found
          res.render('../../../views/error', {
            error: {stack:"not found"}
          });
       }
    });
  });
});
