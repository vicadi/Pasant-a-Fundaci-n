module.exports = function(mongoose){

var Schema = mongoose.Schema;
var menuSchema = new Schema({
	posicion : Number,
	color : String, 
	titulo : String,
	urlInterna : String,
	urlExterna : String,
	UserModificacion : String,
	fechaCreacion : String,
    submenus : [{
					titulo : String,
					urlExterna : String,
					urlInterna : String
		}]
});
return mongoose.model('menu', menuSchema);
}