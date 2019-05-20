
/*
| -------------------------------------------------------------------
| INCLUDE MODEL
| -------------------------------------------------------------------
|
| -------------------------------------------------------------------
| Instructions
| -------------------------------------------------------------------
|
|
*/

exports.insertValues = function(values, modelName) {
    const Model = require('../models/'+ modelName);
    return new Promise((resolve, reject) => {
		Model
      		.create(values)
			.then((result) => resolve({result: result._options.isNewRecord == true ? 1 : 0, record: result.dataValues}))
			.catch((err) => reject(err));
	});
};

exports.updateValues = function(values, anyWhere, modelName) {
    const Model = require('../models/'+ modelName);
    return new Promise((resolve, reject) => {
		Model
      		.update(values, { where: anyWhere })
			.then((result) => resolve({result: result[0]}))
			.catch((err) => reject(err));
	});
};

exports.destroyValues = function(anyWhere, modelName) {
    const Model = require('../models/'+ modelName);
    return new Promise((resolve, reject) => {
		Model
            .destroy({where: anyWhere})
			.then((result) => resolve({result: result}))
			.catch((err) => reject(err));
	});
};

exports.fetchAll = function(anyField, anyWhere, modelName) {
	const Model = require('../models/'+ modelName);
	if (anyField === false || anyField == '') {
		console.log('salah')
		process.exit();
	}
    return new Promise((resolve, reject) => {
		Model
            .findAll({
				where: anyWhere
			  })
			.then((result) => resolve({result: result}))
			.catch((err) => reject(err));
	});
};

// exports.fetchAll = function(anyField, anyWhere, orderBy, orderType, limit, modelName) {
//     const Model = require('../models/'+ modelName);
//     return new Promise((resolve, reject) => {
// 		Model
//             .findAll({
// 				attributes: anyField,
// 				raw: true
// 			})
// 			.then((result) => resolve({result: result}))
// 			.catch((err) => reject(err));
// 	});
// };