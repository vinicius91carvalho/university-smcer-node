module.exports = function(app){

 	var circuito = app.controllers.circuito;

 	app.route('/circuitos')
		.get(circuito.getAll)
		.post(circuito.saveCircuito);

	app.route('/circuitos/:id')
		.get(circuito.getCircuito)
		.put(circuito.updateCircuito)
		.delete(circuito.deleteCircuito);
}