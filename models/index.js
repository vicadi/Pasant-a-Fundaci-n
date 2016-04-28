 // models/index.js
if (!global.hasOwnProperty('db')) {
 
  var mongoose = require('mongoose');

  //Prints the current environment variable 
  console.log(process.env.NODE_ENV);

  //Choose the DB according to your environment variable
  if(process.env.NODE_ENV==="production"){
    mongoose.connect('mongodb://arley:arley@ds045521.mongolab.com:45521/fundacion');
  }
  if(process.env.NODE_ENV==="test"){
    mongoose.connect('mongodb://localhost/testFundacion');
  }
  if(process.env.NODE_ENV==="development"||process.env.NODE_ENV==null){
    mongoose.connect('mongodb://localhost/fundacion');
  }

  //Creates a struct with models
  global.db = {
    //models
    pagina:require('./pagina')(mongoose),
    user:require('./user')(mongoose),
    menu:require('./menu')(mongoose),
    colaboradores:require('./colaboradores')(mongoose),
    slider:require('./slider')(mongoose),
    video:require('./video')(mongoose)
  };
}
 
module.exports = global.db;
