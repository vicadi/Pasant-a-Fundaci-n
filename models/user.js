module.exports = function(mongoose){

var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
var userSchema = new Schema({
	nombre : String,
	apellido : String,
	nickName : String,
    contrasena : String,
    rol : String,
    correo : String
});
//generates an encrypted password
userSchema.methods.generateHash = function(contrasena) {
    return bcrypt.hashSync(contrasena, bcrypt.genSaltSync(8), null);
};
// checking if password is valid
userSchema.methods.validPassword = function(contrasena) {
    return bcrypt.compareSync(contrasena, this.contrasena);
};

return mongoose.model('user',userSchema);
}