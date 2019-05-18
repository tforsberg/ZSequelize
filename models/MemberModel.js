const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Member = sequelize.define(
	'Member',
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: Sequelize.STRING(255)
		},
		password: {
			type: Sequelize.STRING(255)
		},
	},
	{
		timestamps: true, // true = ketambahan 2 kolom create_at & update_at (AUTO) klo false tidak ketambahan
		freezeTableName: true // true = nama table asli , false = nama table ketambahan 's' diakhir
	}
);