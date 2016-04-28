module.exports.create = function(req, res, done) {
    var newUser= new db.colaboradores();
      newUser.nombre = req.body.nombre;
      newUser.apellido = req.body.apellido;
      newUser.telefono = req.body.telefono;
      newUser.email = req.body.email;
      if(req.body.tiempo)
          newUser.tiempo = req.body.tiempo;
      if(req.body.especie)
          newUser.especie = req.body.especie;
      if(req.body.dinero){
        newUser.dinero = req.body.dinero;
        newUser.cantidad = req.body.cantidad;
      }
      newUser.comentario = req.body.comentario;

                newUser.save(function(error, user) {
                    if (error)
                        return done(error);          
                    if(user){
                        return done(null, user, req.flash('message', 'nuevo colaborador creado'));   
                    }
                });
}
//solo valido para administrador  
module.exports.read = function(req, res ,done) {
           
}

module.exports.update = function (req, res, done) {
   
}

module.exports.deleter = function (req, res, done) {

}