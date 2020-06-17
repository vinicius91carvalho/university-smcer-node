module.exports = function(app){

 	var horaAberta = app.controllers.horaAberta;

	app.route('/grafico')
		.get(horaAberta.getAll);

	app.route('/grafico/:dataInicial/:dataFinal')
		.get(horaAberta.getIntervalHoraAberta);
}