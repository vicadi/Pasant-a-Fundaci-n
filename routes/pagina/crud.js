//Create and save a record in the DB
module.exports.create = function(req, res, done) {
  console.log(req.body);
  var nombreEnlace=req.body.nombreEnlace.replace(" ","");
  var fs = require('fs');
  db.pagina.findOne({ "nombreEnlace" :  req.body.nombreEnlace }, function(err, pagina) {
    if (err)
      return done(err);
    if (pagina) {
      return done(new Error("Page is not created"), false, req.flash('message', 'That page link is already taken.'));
    }else {
      var newPagina = new db.pagina();
        newPagina.nombreEnlace = nombreEnlace;
        newPagina.titulo = req.body.titulo;
        newPagina.descripcion = req.body.descripcion;
        newPagina.contenido =req.body.contenido;
        newPagina.fechaCreacion = new Date();
        newPagina.UserModificacion = req.session.user.nickName;
        newPagina.categoria =req.body.categoria;
        newPagina.idVideo = req.body.idVideo;
        if(req.body.soloRegistrados=="on")
          newPagina.soloRegistrados = true;
        else
          newPagina.soloRegistrados = false;
        if(req.body.publicar)
          newPagina.publicar = true;
        else
          newPagina.publicar = false;  
        if(req.files.image.name){
          fs.readFile(req.files.image.path, function (err, data) {
          var imageName = req.files.image.name
          var newPath ='./public/imagesUploads/'+ imageName;
            fs.writeFile(newPath, data, function (err) {
              newPagina.linkImagen='/imagesUploads/'+imageName;   
              newPagina.save(function(errSave, paginaSave){
                if(errSave)
                  return done(errSave);          
                else
                  return done(null, req.flash('message', 'page save'));          
              });
            });
          });
        }else{
          newPagina.save(function(errSave, paginaSave){
          if(errSave)
            return done(errSave);          
          else
            return done(null, req.flash('message', 'page save'));
          });
        }
    }
  });
}
module.exports.read = function(req, res, done) {
  db.pagina.findOne({ "nombreEnlace" : req.params.pagina }, function(error, pagina){
          if (error){
              return done(error);          
          }else{
              return done(null, pagina);
          }
      });
}
module.exports.deleter = function(req, res, done) {
  db.pagina.findOneAndRemove({ "nombreEnlace" : req.params.pagina},
    function(error){
      if (error)
          return done(error);          
      else
        return done(null, req.flash('message', 'page delete'));
    }
  );
}
module.exports.update = function(req, res, done) {

  var nombreEnlaceUpdate=req.body.nombreEnlace.replace(" ","");
  var nombreEnlace=req.body.nombreEnlaceOriginal; 
  var fs = require('fs');
  
  var update= {};
      update.nombreEnlace = nombreEnlaceUpdate;
      update.titulo = req.body.titulo;
      update.descripcion = req.body.descripcion;
      update.contenido =req.body.contenido;
      update.UserModificacion = req.session.user.nickName;
      update.categoria =req.body.categoria;
      update.fechaCreacion = new Date();
      update.idVideo = req.body.idVideo;
      if(req.body.publicar){
        update.publicar = true;
      }else{
        update.publicar = false;
      }
      if(req.files.image.name){
        fs.readFile(req.files.image.path, function (err, data) {
        var imageName = req.files.image.name
        var newPath ='./public/imagesUploads/'+ imageName;
          fs.writeFile(newPath, data, function (err) {
            update.linkImagen='/imagesUploads/'+imageName;       
            db.pagina.findOneAndUpdate({ "nombreEnlace" : nombreEnlace},{$set:update},
              function(error){
                if (error)
                  return done(error);          
                else
                  return done(null, false, req.flash('message', 'page edited'));
              }
            );
          });
        });
      }else{
        update.linkImagen=req.body.imagenAnterior;
        db.pagina.findOneAndUpdate({ "nombreEnlace" : nombreEnlace},{$set:update},
          function(error){
            if (error)
              return done(error);          
            else
              return done(null, false, req.flash('message', 'page edited'));
          }
        );
      }
}
module.exports.updateEstado = function(req, res, done) {
  db.pagina.findOne({ "nombreEnlace" : req.params.pagina }, function(error, pagina){
    if (error)
      return done(error);          
    else{
      var estado=pagina.publicar;
        db.pagina.findOneAndUpdate({ "nombreEnlace" : req.params.pagina },{$set:{publicar:!estado}},
          function(error){
            if (error)
              return done(error);          
            else
              return done(null, false, req.flash('message', 'page edited'));
           }
        );
    }
  });
}