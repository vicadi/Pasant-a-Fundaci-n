module.exports = function(mongoose){
  var Schema = mongoose.Schema;
  var userSchema = new Schema({
    nombre : String,
    apellido : String,
    telefono : String,
    email : String,
    especie: String,
    tiempo: String,
    dinero: String,
    cantidad: String,
    recurrente: String,
    fecha: String
  });
return mongoose.model('colaboradores', userSchema);
}