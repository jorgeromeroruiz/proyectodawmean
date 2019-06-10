const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemSchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    photo:{ type: String ,required: true}
});

module.exports = mongoose.model('Item', ItemSchema);
