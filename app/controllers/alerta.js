
module.exports =  function (app){ 

	var Alerta = app.models.alerta; 
	var Usuario = app.models.usuario; 
	var Circuito = app.models.circuito; 

	var controller = {
		 getAll: function (req, resp){
			var _id = req.params.idUser;
			Alerta.findAll( 
				{ 	where: { idUsuario : _id}
					, include: [ { 
						model: Circuito 
					} ]
				}
			)
			.then(function (success) {
				var returN = success;
				if( !(Object.prototype.toString.call(success) === '[object Array]') ) {
					returN = new Array();
					returN.push(success);
				}
				resp.json(returN);
			}, function (error){
				resp.status(500).end();
				return console.error(error);
			})
		}, 		
		getAlerta: function (req, resp){
			Alerta.findOne( 
				{ 	where: { id: req.params.id } 
					, include: [ { 
						model: Circuito 
					} ]
				} 
			)
			.then(function (success) {
				resp.json(success);
				resp.status(204).end();
			}, function (error){
				resp.status(500).end();
				return console.error(error);
			})
		}, 
		saveAlerta: function (req, resp){
			var alerta = {
				potencia: req.body.potencia
				, habilitado: req.body.habilitado
				, nome: req.body.nome
				, idCircuito: req.body.circuito.id
				, idUsuario: req.body.usuario.id
			};
			if (!alerta.habilitado){
				alerta.habilitado = false;
			}
			Alerta.build( alerta )
			.save()
			.then(function (success){
				resp.json(success);
				resp.status(204).end();
			}, function (error){
				resp.status(500).end();
				return console.error(error);
			})
		}, 
		updateAlerta: function (req, resp){
			var alerta = {
				potencia: req.body.potencia
				, habilitado: req.body.habilitado
				, nome: req.body.nome
				, idCircuito: req.body.circuito.id
				, idUsuario: req.body.usuario.id
			};	
			Alerta.update( alerta, { where: { id: req.params.id } } )
			.then(function (success){
				resp.status(204).end();
			}, function (error){
				resp.status(500).end();
				return console.error(error);
			})
		},
		deleteAlerta: function (req, resp){
			Alerta.destroy( { where: 
				{ id: req.params.id } 
			} )
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