
module.exports = function (app){ 
	
	var Circuito = app.models.circuito;

	var controller = {
		getAll: function (req, resp){
			Circuito.findAll()
			.then(function (success) {
				var returN = success;
				if( !(Object.prototype.toString.call(success) === '[object Array]') ) {
					returN = new Array();
					returN.push(success);
				}
				resp.json(returN);
				resp.status(204).end();				
			}, function (error){
				resp.status(500).end();
				return console.error(error);
			})
		},
		getCircuito: function (req, resp){
			Circuito.findOne( { where: { id: req.params.id } } )
			.then(function (success){
				resp.json(success);
				resp.status(204).end();				
			}, function (error){
				resp.status(500).end();
				return console.error(error);
			})
		},
		saveCircuito: function (req, resp){
			var circuito = { nome: req.body.nome };
			Circuito.build( circuito )
			.save()
			.then(function (success){
				resp.json(success);
			}, function (error){
				resp.status(500).end();
				return console.error(error);
			})
		},
		updateCircuito: function (req, resp) {
			var circuito = { nome: req.body.nome };
			Circuito.update(circuito, { where: { id: req.params.id } } )
			.then(function (success){
				resp.status(204).end();
			}, function (error){
				resp.status(500).end();
				return console.error(error);
			})
		},
		deleteCircuito: function (req, resp){
			Circuito.destroy( { where: { id: req.params.id } } )
			.then(function (success){
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