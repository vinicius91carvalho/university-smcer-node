module.exports = function(app){

 	var instantaneo = app.controllers.instantaneo;

 	app.route('/instantaneo')
        .get(instantaneo.getAll);
}