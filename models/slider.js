module.exports = function(mongoose){
	var Schema = mongoose.Schema;
	var sliderSchema = new Schema({
		titulo : String,
		enlace : String,
		descripcion : String,
		linkImagen: String,
		fechaCreacion : String,
		publicado: Boolean
	});
	return mongoose.model('slider', sliderSchema);
}