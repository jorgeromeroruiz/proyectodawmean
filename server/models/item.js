const mongoose = require('mongoose');
const { Schema } = mongoose;

var moment = require('moment-timezone');
var horaMadrid = moment.tz(Date.now(), "Europe/Madrid");

const ItemSchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    photo: { type: String },
    date: { type: Date, default: horaMadrid },
    owner: { type: String, required: true}
});

module.exports = mongoose.model('Item', ItemSchema);
