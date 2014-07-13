var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var compressedLogSchema = new Schema({
    _id: mongoose.Schema.ObjectId,
    CompressedEvents: String,
    ApplicationName: String,
    State: Number
}, {
    collection: 'LOG_TABLE'
});

module.exports = mongoose.model('compressedLogSchema', compressedLogSchema);