var connection = require('../../config/database');
var Sequelize = require('sequelize');

module.exports = function() { 

	var Circuito, Instantaneo;

	Circuito = connection.import(__dirname + '/circuito');

	Instantaneo = connection.define('instantaneo', {
		hora: {
			type: Sequelize.DATE
			, field: 'hora'
			, primaryKey: true
		},
		potencia: {
			type: Sequelize.FLOAT
			, field: 'potencia'
		}
	}, 
	{ 
		tableName: 'instantaneo'
		, timestamps: false		
	});

	Circuito.hasMany(Instantaneo, { 
		foreignKey: { 
			name: 'idCircuito'
			, field: 'id_circuito_fk' 
			, primaryKey: true
		} 
	});
	Instantaneo.belongsTo(Circuito, { 
		foreignKey: { 
			name: 'idCircuito'
			, field: 'id_circuito_fk'
			, primaryKey: true 
		} 
	});	

	return Instantaneo;
}