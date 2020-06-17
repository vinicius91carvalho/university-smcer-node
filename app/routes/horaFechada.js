module.exports = function(app){

 	var horaFechada = app.controllers.horaFechada;

	app.route('/horaFechada')
		.get(horaFechada.getAll);

	app.route('/horaFechada/:dataInicial/:dataFinal/:circuito')
		.get(horaFechada.getIntervalHoraFechada);	
}