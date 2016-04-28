//Create and save a record in the DB
module.exports.create = function(req, res, done) {
  var fs = require('fs');
  db.slider.findOne({ "titulo" :  req.body.descripcion }, function(err, slider) {
    if (err)
      return done(err);
    if (slider) {
      return done(new Error("Slider is not created"), false, req.flash('message', 'That slider image is already taken.'));
    }else {
      var newSlider = new db.slider();
        newSlider.titulo = req.body.titulo;
        newSlider.descripcion = req.body.descripcion;
        newSlider.enlace = req.body.enlace;
        newSlider.fechaCreacion = new Date();
        newSlider.publicado = req.body.publicado;
        if(req.files.image.name){
          fs.readFile(req.files.image.path, function (err, data) {
          var imageName = req.files.image.name
          var newPath ='./public/imagesUploads/'+ imageName;
            fs.writeFile(newPath, data, function (err) {
              newSlider.linkImagen='/imagesUploads/'+imageName;   
              newSlider.save(function(errSave, sliderSave){
                if(errSave)
                  return done(errSave);          
                else
                  return done(null, req.flash('message', 'slider save'));          
              });
            });
          });
        }else{
          newSlider.save(function(errSave, sliderSave){
          if(errSave)
            return done(errSave);          
          else
            return done(null, req.flash('message', 'slider save'));
          });
        }
    }
  });
}

module.exports.read = function(req, res, done) {
  db.slider.find().exec(function(error, slider){
    if (error)
      return done(error);          
    else
      return done(null, slider);     
      console.log(slider);
  });
}

module.exports.deleter = function(req, res, done) {
  db.slider.findOneAndRemove({ "titulo" : req.params.slider},
    function(error){
      if (error)
        return done(error);          
      else
        return done(null, false, req.flash('message', 'slider borrado'));
    }
  );
}
module.exports.update = function(req, res, done) {
  console.log(req.body);
  var update= {};
  var fs = require('fs');
  var tituloSliderOriginal = req.body.tituloSliderOriginal;
  update.titulo=req.body.titulo;
  update.descripcion= req.body.descripcion;
  update.enlace= req.body.enlace;
  update.fechaCreacion = new Date();
  update.publicado = req.body.publicado;
  if(req.files.image.name){
    fs.readFile(req.files.image.path, function (err, data) {
    var imageName = req.files.image.name
    var newPath ='./public/imagesUploads/'+ imageName;
      fs.writeFile(newPath, data, function (err) {
        update.linkImagen='/imagesUploads/'+imageName;       
        db.slider.findOneAndUpdate({ "titulo" : tituloSliderOriginal},{$set:update},
          function(error){
            if (error)
              return done(error);          
            else
              return done(null, false, req.flash('message', 'slider edited'));
          }
        );
      });
    });
  }else{
    update.linkImagen=req.body.imagenAnterior;
    db.slider.findOneAndUpdate({ "titulo" : tituloSliderOriginal},{$set:update},
      function(error){
        if (error)
          return done(error);          
        else
          return done(null, false, req.flash('message', 'slider edited'));
      }
    );
  }
}