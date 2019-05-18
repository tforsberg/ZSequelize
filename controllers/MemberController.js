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
				
		// let create = await ZSequelize.insertValues(value, 'MemberModel');
		// console.log(create);
		// MemberModel.create(value).then(function(result) {
		// 	res.status(201).json({
		// 		message: 'Success created.'
		// 	});
		// });
	},

	processUpdate: function(req, res) {
		let id = req.params.id;
		let name = req.body.name;
		let password = req.body.password;

		let value = {
			name: name,
			password: password,
		};
		
		MemberModel.update(value, { where: { id: id } }).then((result) => {
			res.status(200).json({
				message: 'Success updated.',
			});
		});	
	},

	processDelete: async function(req, res) {
		let id = req.params.id;
		
		let where = {'id': id};
		let create = await ZSequelize.destroyValues(where, 'MemberModel');
		console.log(create);
	}
}