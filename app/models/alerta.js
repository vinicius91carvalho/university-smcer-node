	var connection = require('../../config/database');
var Sequelize = require('sequelize');

module.exports = function() { 

	var Usuario, Circuito, Alerta;

	Usuario = connection.import(__dirname + '/usuario');
	Circuito = connection.import(__dirname + '/circuito');

	Alerta = connection.define('alerta', {
		id: {
			type: Sequelize.INTEGER
			, field: 'id'
			, unique: true
			, primaryKey: true
			, autoIncrement: true 
		}, 
		nome: {
			type: Sequelize.STRING
			, field: 'nome'
		}, 
		potencia: {
			type: Sequelize.FLOAT
			, field: 'potencia'
		}, 
		habilitado: {
			type: Sequelize.BOOLEAN 
			, field: 'habilitar'
		}					
	}, 
	{ 
		tableName: 'alerta'
		, timestamps: false		
	});

	Usuario.hasMany(Alerta, { 
		foreignKey: { 
			name: 'idUsuario'
			, field: 'id_usuario_fk' 
		} 
	});
	Alerta.belongsTo(Usuario, { 
		foreignKey: { 
			name: 'idUsuario'
			, field: 'id_usuario_fk' 
		} 
	});	

	Circuito.hasMany(Alerta, { 
		onDelete: 'restrict'
		, foreignKey: { 
			name: 'idCircuito'
			, field: 'id_circuito_fk' 
		}
	});
	Alerta.belongsTo(Circuito, { 
		foreignKey: { 
			name: 'idCircuito'
			, field: 'id_circuito_fk' 
		} 
	});

	return Alerta;
}