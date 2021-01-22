const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const schema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    temperature: Number,
    humidity: Number,
    createdDate: {
        type: Date,
        default: Date.now
    },
    modifiedDate: {
        type: Date,
        default: Date.now
    }
});

var Figures = mongoose.model("figures", schema, 'figures');
module.exports = Figures;