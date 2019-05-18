
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

// exports.insertValues = function(values, modelName) {
//     const Model = require('../models/'+ modelName);
//     return new Promise((resolve, reject) => {
// 		Model
//             .create(value)
// 			.then((result) => resolve({result: result}))
// 			.catch((err) => reject(err));
// 	});
// };

exports.destroyValues = function(values, modelName) {
    const Model = require('../models/'+ modelName);
    return new Promise((resolve, reject) => {
		Model
            .destroy({where: values})
			.then((result) => resolve({result: result}))
			.catch((err) => reject(err));
	});
};