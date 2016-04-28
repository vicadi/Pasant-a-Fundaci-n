//Create and save a record in the DB
module.exports.create = function(req, res, done) {
    console.log(req.body);
  	var newMenu = new db.menu();
  	newMenu.titulo=req.body.tituloMenu;
    newMenu.posicion = req.body.numeroMenu;
    newMenu.color= req.body.colorMenu;
    if(req.body.urlInterna!=='none'){
      newMenu.urlInterna=req.body.urlInterna;
      newMenu.urlExterna="";
    }else if(req.body.urlExterna!==''){
      newMenu.urlExterna=req.body.urlExterna;
      newMenu.urlInterna='none';
    }
    newMenu.submenus=[];
    if(req.body.tituloSubmenu){
   	  for(var i=0;i<req.body.tituloSubmenu.length;i++){
        if(req.body.urlInternaSubmenu[i]!=='none'){
          newMenu.submenus.push({titulo:req.body.tituloSubmenu[i],urlInterna:req.body.urlInternaSubmenu[i],urlExterna:''});
        }else{
   			  newMenu.submenus.push({titulo:req.body.tituloSubmenu[i],urlExterna:req.body.urlExternaSubmenu[i], urlInterna:'none'});
      }}
    }
    newMenu.fechaCreacion = dateFormateada();
    newMenu.UserModificacion = req.session.user.nickName;
    newMenu.save(function(errSave, MenuSave){
      if(errSave)
        return done(errSave);          
      else
        return done(null, false, req.flash('message', 'menu save'));          
    });
}
module.exports.read = function(req, res, done) {
  db.menu.find().exec(function(error, menus){
    if (error)
      return done(error);          
    else
      return done(null, menus);     
  });
}
module.exports.deleter = function(req, res, done) {
  db.menu.findOneAndRemove({ "titulo" : req.params.menu},
    function(error){
      if (error)
        return done(error);          
      else
        return done(null, false, req.flash('message', 'menu borrado'));
    }
  );
}
module.exports.update = function(req, res, done) {
  var update= {};
  update.titulo=req.body.tituloMenu;
  update.posicion = req.body.numeroMenu;
  update.color= req.body.colorMenu;
  if(req.body.urlInterna!=='none'){
    update.urlInterna=req.body.urlInterna;
    update.urlExterna="";
  }else if(req.body.urlExterna!==''){
    update.urlExterna=req.body.urlExterna;
    update.urlInterna='none'
  }
  console.log(req.body);
  update.submenus=[];
  if(req.body.tituloSubmenu){
      for(var i=0;i<req.body.tituloSubmenu.length;i++){
        if(req.body.urlInternaSubmenu[i]!=='none'){
          update.submenus.push({titulo:req.body.tituloSubmenu[i],urlInterna:req.body.urlInternaSubmenu[i],urlExterna:''});
        }else{
        update.submenus.push({titulo:req.body.tituloSubmenu[i],urlExterna:req.body.urlExternaSubmenu[i], urlInterna:'none'});
      }}
  }
  update.fechaCreacion = dateFormateada();
  update.UserModificacion = req.session.user.nickName;
    db.menu.findOneAndUpdate({ "titulo" : req.body.tituloMenuOriginal},update,
      function(error){
        if (error)
          return done(error);        
        else
          return done(null, false, req.flash('message', 'menu edited'));
      }
    );
}

function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}
function dateFormateada(){
  var date = new Date()
  return pad(date.getDay())+"/"+pad(date.getMonth())+"/"+date.getFullYear()+" "+pad(date.getHours())+":"+pad(date.getMinutes());
}