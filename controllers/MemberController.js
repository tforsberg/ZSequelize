const MemberModel = require('../models/MemberModel');
const Sequelize = require('sequelize');

module.exports = {
	index: function(req, res) {
		res.send(Myaccount.tes);
		},

	processAdd: function(req, res) {
		let name = req.body.name;
		let password = req.body.password;

		let value = {
			name: name,
			password: password,
				};
				
		MemberModel.Member.create(value).then(function(result) {
			res.status(201).json({
				message: 'Success created.'
			});
		});
	},

	processUpdate: function(req, res) {
		let id = req.params.id;
		let name = req.body.name;
		let password = req.body.password;

		let value = {
			name: name,
			password: password,
		};
		
		MemberModel.Member.update(value, { where: { id: id } }).then((result) => {
			res.status(200).json({
				message: 'Success updated.',
			});
		});	
	},
}