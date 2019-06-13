const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, required: true },
    pwd: { type: String, required: true },
    admin: { type: Number, default: 0}
});

module.exports = mongoose.model('User', UserSchema);
