var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schemaProduct = new Schema({
    name: { type: String, required: [true, 'The name is required'] },
    price: { type: Number, required: [true, 'The price is required'] },
    description: { type: String, required: false },
    available: { type: Boolean, required: true, default: true },
    img: {type: String, required: false },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});


module.exports = mongoose.model('Product', schemaProduct);