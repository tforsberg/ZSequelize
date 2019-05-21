const MemberModel = require('../models/MemberModel');
const ZSequelize = require('../libraries/ZSequelize');

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
		console.log(update);
	},

	processDelete: async function(req, res) {
		let id = req.params.id;
		
		let where = {'id': id};
		let create = await ZSequelize.destroyValues(where, 'MemberModel');
		console.log(create);
	},

	processGetArticle: async function(req, res) {
		let field = '*';
		let where = false;
		let orderBy = false;
		let model = 'ArticleModel';
		let result = await ZSequelize.fetchAll(field, where, orderBy, model);
		res.status(200).json({
			message: 'Success created.',
			data : result
		});
	}
}