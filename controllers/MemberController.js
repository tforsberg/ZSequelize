const MemberModel = require('../models/MemberModel');

module.exports = {
	index: function(req, res) {
		res.send(Myaccount.tes);
    },

    processAdd: function(req, res) {
		// let name = req.body.name;
		// let password = req.body.password;

        console.log(req.body)
		// let value = {
		// 	name: name,
		// 	password: password,
        // };
        
		// MemberModel.Member.create(value).then(function(result) {
		// 	res.json({
		// 		result: true,
		// 		message: 'Success Retrive.'
		// 	});
		// });
	},
}