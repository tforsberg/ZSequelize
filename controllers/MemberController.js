const MemberModel = require('../models/MemberModel');
const ZSequelize = require('../libraries/ZSequelize');
const Sequelize = require('sequelize');

module.exports = {
	index: function(req, res) {
		res.send(Myaccount.tes);
	},

	processAdd: async function(req, res) {
		let name = req.body.name;
		let password = req.body.password;

		let value = {
			name: name,
			password: password,
		};
				
		let create = await ZSequelize.insertValues(value, 'MemberModel');
		console.log(create);
	},

	processUpdate: async function(req, res) {
		let id = req.params.id;
		let name = req.body.name;
		let password = req.body.password;

		let value = {
			name: name,
			password: password,
		};
		
		let where = {'id': id};

		let update = await ZSequelize.updateValues(value, where, 'MemberModel');
		res.status(200).json({
			message: 'Success POST.',
			data : result
		});
	},

	processDelete: async function(req, res) {
		let id = req.params.id;
		
		let where = {'id': id};
		let create = await ZSequelize.destroyValues(where, 'MemberModel');
		res.status(200).json({
			message: 'Success PUT.',
			data : result
		});
	},

	processGetMember: async function(req, res) {
		let field = ['id', [ Sequelize.fn('count', Sequelize.col('id')), 'count_same_name' ], 'name'];
		let where = {
				id: 1,
		  	};
		let orderBy = [['id', 'DESC']];
		let groupBy = ['name'];
		let model = 'MemberModel';
		let result = await ZSequelize.fetchAll(field, where, orderBy, groupBy, model);
		res.status(200).json({
			message: 'Success GET.',
			data : result
		});
	},

	processGetMemberArticle: async function(req, res) {
		let field = ['id', 'name'];
		let where = {
			id: 4,
		  };;
		let orderBy = false;
		let groupBy = false;
		let model = 'MemberModel'
		let joins = [
			['MemberModel', 'id', 'hasMany', 'ArticleModel', 'memberid']
		];
		let result = await ZSequelize.fetchOneJoins(field, where, orderBy, groupBy, model, joins);
		res.status(200).json({
			message: 'Success GET.',
			data : result
		});
	}
}