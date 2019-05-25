
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

exports.fetchAll = function(anyField, anyWhere, orderBy, groupBy, modelName) {
	if (!Array.isArray(anyField)) {
		console.log('field selected harus array');
		process.exit();
	}else{
		anyField = anyField;
	}

	if (modelName == '' || modelName == null) {
		console.log('model tidak ada');
		process.exit();
	}

	if (anyWhere === false) {
		anyWhere = '';
	}else{
		anyWhere = anyWhere;
	}

	if (orderBy === false) {
		orderBy = '';
	}else{
		orderBy = orderBy;
	}

	if (groupBy === false) {
		groupBy = '';
	}else{
		groupBy = groupBy;
	}

	const Model = require('../models/'+ modelName);
    return new Promise((resolve, reject) => {
		Model
            .findAll({
				attributes: anyField,
				where: anyWhere,
				order: orderBy,
				group : groupBy
			  })
			.then((result) => resolve({
				result: result.length > 0 ? 1 : 0,
				dataValues: result
			}))
			.catch((err) => reject(err));
	});
};

// exports.fetchJoins = function(anyField, anyWhere, orderBy, groupBy, modelName) {
// 	if (!Array.isArray(anyField)) {
// 		console.log('field selected harus array');
// 		process.exit();
// 	}else{
// 		anyField = anyField;
// 	}

// 	if (modelName == '' || modelName == null) {
// 		console.log('model tidak ada');
// 		process.exit();
// 	}

// 	if (anyWhere === false) {
// 		anyWhere = '';
// 	}else{
// 		anyWhere = anyWhere;
// 	}

// 	if (orderBy === false) {
// 		orderBy = '';
// 	}else{
// 		orderBy = orderBy;
// 	}

// 	if (groupBy === false) {
// 		groupBy = '';
// 	}else{
// 		groupBy = groupBy;
// 	}

// 	const Model = require('../models/'+ modelName);
//     return new Promise((resolve, reject) => {
// 		Model
//             .findAll({
// 				attributes: anyField,
// 				where: anyWhere,
// 				order: orderBy,
// 				group : groupBy
// 			  })
// 			.then((result) => resolve({
// 				result: result.length > 0 ? 1 : 0,
// 				dataValues: result
// 			}))
// 			.catch((err) => reject(err));
// 	});
// };