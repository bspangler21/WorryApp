const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: false,
	},
	intensity: {
		type: Number,
		required: true,
		unique: false,
	},
	judgments: {
		type: String,
		required: true,
		unique: false,
	},
	dateRecorded: {
		type: Date,
		required: true,
		unique: false,
	},
});

module.exports = mongoose.model.Items || mongoose.model("Items", ItemSchema);
