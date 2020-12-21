const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const schema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    password: String,
    accessToken: String,
    createdDate: {
        type: Date,
        default: Date.now
    },
    modifiedDate: {
        type: Date,
        default: Date.now
    }
});

var User = mongoose.model("users", schema, 'users');
module.exports = User;