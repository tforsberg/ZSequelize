
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

	if (modelName == '' || modelName == null) {
		console.log('model tidak ada');
		process.exit();
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

exports.fetchOneJoins = function(anyField, anyWhere, orderBy, groupBy, modelName, modelJoins) {
	if (!Array.isArray(anyField)) {
		console.log('field selected harus array');
		process.exit();
	}else{
		anyField = anyField;
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

	if (modelName == '' || modelName == null) {
		console.log('model tidak ada');
		process.exit();
	}

	if (!Array.isArray(modelJoins)) {
		console.log('model join selected harus array');
		process.exit();
	}else{
		modelJoins = modelJoins;
	}

	for (let join_number = 0; join_number < modelJoins.length; join_number++) {
		const ModelOne = require('../models/'+ modelJoins[0][0]);
		const ModelTwo = require('../models/'+ modelJoins[0][3]);
		if (modelJoins[0][2] === 'hasMany') {
			ModelOne.hasMany(ModelTwo, {foreignKey: modelJoins[0][4]})
		}
	}

    // return new Promise((resolve, reject) => {
	// 	Model
    //         .findAll({
	// 			attributes: anyField,
	// 			where: anyWhere,
	// 			order: orderBy,
	// 			group : groupBy
	// 		  })
	// 		.then((result) => resolve({
	// 			result: result.length > 0 ? 1 : 0,
	// 			dataValues: result
	// 		}))
	// 		.catch((err) => reject(err));
	// });
};