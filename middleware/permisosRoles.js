module.exports.isAuthenticated = function(req, res, next) {
  if (req.sesion.user)
        return next();

     req.flash('message', 'No estas autenticado.');
     res.redirect('/users');
}

module.exports.isAdmin = function(req, res, next) {

	if(req.session.user){
    	if (req.user.nickName=="admin"){
        	return next();
    	}
	}

     req.flash('message', 'No eres administrador.');
     res.redirect('/');
}