var connection = require('../../config/database');
var Sequelize = require('sequelize');

module.exports = function() { 

	var Circuito, HoraFechada;

	Circuito = connection.import(__dirname + '/circuito');

	HoraFechada = connection.define('mediaHoraFechada', {
		dataHora: {
			type: Sequelize.DATE
			, field: 'data_hora'
			, primaryKey: true
		},
		potencia: {
			type: Sequelize.FLOAT
			, field: 'potencia'
		}	
	},
	{ 
		tableName: 'media_hora_fechada'
		, timestamps: false		
	});

	Circuito.hasMany(HoraFechada, { 
		foreignKey: { 
			name: 'idCircuito'
			, field: 'id_circuito_fk' 
			, primaryKey: true
		} 
	});
	HoraFechada.belongsTo(Circuito, { 
		foreignKey: { 
			name: 'idCircuito'
			, field: 'id_circuito_fk' 
			, primaryKey: true
		} 
	});

	return HoraFechada;
}