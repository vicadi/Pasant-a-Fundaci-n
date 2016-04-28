module.exports = function(mongoose){
  var Schema = mongoose.Schema;
  var videoSchema = new Schema({
    titulo : String,
    idVideo : String,
    descripcion : String,
    fechaCreacion : String,
    publicado : Boolean
  });
return mongoose.model('video', videoSchema);
}