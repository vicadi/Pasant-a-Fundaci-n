module.exports.create = function(req, res, done) {
  if (req.body.nickName)
    var nickName = req.body.nickName.toLowerCase(); 
    db.user.findOne({ "nickName" :  nickName }, function(err, user) {
      if (err)
        return done(err);
      if (user) 
        return done(new Error("User not created"), false, req.flash('message', 'El nickName '+nickName+' ya existe.'));
       else {
          var correo = req.body.email.toLowerCase();
          db.user.findOne({"correo":correo}, function(err, userCorreo){
            if (err)
              return done(err);
            if (userCorreo)
              return done(new Error("User not created"), false, req.flash('message', 'El correo '+correo+' ya existe'));
            else{
              var newUser= new db.user();
              newUser.nombre = req.body.nombre;
              newUser.apellido = req.body.apellido;
              newUser.nickName = nickName;
              newUser.correo = req.body.email;
              newUser.contrasena = req.body.contrasena;
              if(req.body.rol){
                newUser.rol = req.body.rol;
              }else{
                newUser.rol = "usuario";
              }
              newUser.save(function(error, user) {
                  if (error)
                      return done(error);          
                  if(user){
                      return done(null, user, req.flash('message', 'Registro exitoso ¡Gracias!'));   
                  }
                });
              }
          });
              
        }
    });
}
//solo valido para administrador  
module.exports.read = function(req, res ,done) {
  db.user.find().exec(function (error, users) { 
      if (error){
          return done(error);          
      }else{
          return done(null, users);
      }
  });
}

module.exports.update = function (req, res, done) {
  var nickName=req.body.nickNameOriginal||req.session.user.nickName;
  var update= {};
  var newUser= new db.user();
      if(req.body.nombre)
          update.nombre = req.body.nombre;
      if(req.body.apellido)
          update.apellido = req.body.apellido;
      if(req.body.nickName)
          update.nickName = req.body.nickName.toLowerCase();
      if(req.body.contrasena)
          update.contrasena = req.body.contrasena;
      if(req.body.email)
          update.correo = req.body.email;
      if(req.body.rol)
          update.rol = req.body.rol;
      else
          newUser.rol = "usuario";

  db.user.findOneAndUpdate({ "nickName" : nickName},{$set:update},
      function(error, user){
          if (error)
              return done(error);          
          else{
               return done(null, user, req.flash('message', 'usuario editado'));   
          }
      }
  );
}

module.exports.deleter = function (req, res, done) {
  var nickName = req.params.nickName;
  db.user.findOneAndRemove({ "nickName" : nickName},
      function(error){
          if (error)
              return done(error);    
          else
              return done(null, req.flash('message', 'user delete'));            
    }
  );
}