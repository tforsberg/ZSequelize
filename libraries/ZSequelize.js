
const Sequelize = require('sequelize');
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
	}else{
		modelName = modelName;
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

exports.fetchOneJoins = function(anyField, anyWhere, orderBy, groupBy, modelName, modelJoins, include) {
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
	}else{
		modelName = modelName;
	}

	if (!Array.isArray(modelJoins)) {
		console.log('model join selected harus array');
		process.exit();
	}else{
		modelJoins = modelJoins;
	}

	let includes = [];
	for (let join_number = 0; join_number < modelJoins.length; join_number++) {
		let include_object = {};

		const ModelOne = require('../models/'+ modelJoins[join_number][0].fromModel);
		const ModelTwo = require('../models/'+ modelJoins[join_number][0].toModel);
		if (modelJoins[join_number][0].bridgeType === 'hasMany') {
			ModelOne.hasMany(ModelTwo, {foreignKey:modelJoins[join_number][0].toKey})
		}else if (modelJoins[join_number][0].bridgeType === 'belongsTo') {
			ModelOne.belongsTo(ModelTwo, {foreignKey:modelJoins[join_number][0].fromKey})
		}

		let where_object = {};
		where_object[modelJoins[join_number][0].toKey] = Sequelize.col(modelJoins[join_number][0].fromKey);

		include_object['attributes'] = modelJoins[join_number][0].attributes;
		include_object['model'] = ModelTwo;
		include_object['where'] = where_object;
		
		includes.push(include_object);
	}

	const Model = require('../models/'+ modelName);
    return new Promise((resolve, reject) => {
		Model
            .findOne({
				attributes: anyField,
				include: includes,
				where: anyWhere,
				order: orderBy,
				group : groupBy
			  })
			.then((result) => resolve({
				result: result !== null ? 1 : 0,
				dataValues: result === null ? [] : result
			}))
			.catch((err) => reject(err));
	});
};