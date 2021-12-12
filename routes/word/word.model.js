const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const WordSchema = new Schema({
    word: {type: String, required: true, unique: true},
    tags: {type: [String], required: false},
    examples: {type: [String], required: false},
    pronunciation: {type: String, required: false},
    meaning: {type: String, required: false}
});

module.exports = Word = mongoose.model("Word", WordSchema)