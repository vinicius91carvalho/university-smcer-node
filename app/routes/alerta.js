module.exports = function(app){

 	var alerta = app.controllers.alerta;

 	app.route('/alertas')
		.get(alerta.getAll)
		.post(alerta.saveAlerta);

	app.route('/alertas/:id')
		.get(alerta.getAlerta)
		.put(alerta.updateAlerta)
		.delete(alerta.deleteAlerta);
	
	app.route('/alertas/user/:idUser')
		.get(alerta.getAll);
}