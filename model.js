const mongoose = require('mongoose');

const BrandName = mongoose.Schema({
	brandName:{
		type: String,
		required:true
	},
	date:{
		type:Date,
		default:Date.now
	}
})

module.exports = mongoose.model('BrandName',BrandName)