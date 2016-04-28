module.exports = function(mongoose){
	var Schema = mongoose.Schema;
	var paginaSchema = new Schema({
		nombreEnlace : String,
		titulo : String,
		descripcion : String,
		contenido : String,
		publicar : Boolean,
		fechaCreacion : Date,
		categoria : String,
		UserModificacion : String,
		idVideo: String,
		linkImagen: String,
		soloRegistrados : Boolean
	});
	return mongoose.model('pagina', paginaSchema);
}
