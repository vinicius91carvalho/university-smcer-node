module.exports =  function (app){ 

	var HoraAberta = app.models.horaAberta; 
	var Circuito = app.models.circuito;

	var controller = {
		getAll: function (req, resp){
			HoraAberta.findAll()
			.then(function (success) {
				resp.json(success);
				resp.status(204).end();
			}, function (error){
				resp.status(500).end();
				return console.error(error);
			})
		}, 
		getIntervalHoraAberta: function (req, resp){
			var _id = req.params.circuito,
				dataInicial = req.params.dataInicial,
				dataFinal = req.params.dataFinal;
			HoraAberta.findAll( 
				{ 
					include: [{
						model: Circuito
						, where: { id: _id }
					}],
					where: connection.and({ 
						dataHora: { $between: [dataInicial, dataFinal] } 
					})
				}
			)
			.then(function (success) {
				resp.json(success);
				resp.status(204).end();
			}, function (error){
				resp.status(500).end();
				return console.error(error);
			})
		}
	};
	return controller;
}