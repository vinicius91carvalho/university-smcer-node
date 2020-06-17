var connection = require('../../config/database');
var Sequelize = require('sequelize');

module.exports = function() { 
		
	var Circuito = connection.define('circuito', {
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
		}
	}, 
	{
    	tableName: 'circuito'
		, timestamps: false		
	});

	return Circuito;
}