const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schemaCategory = new Schema({
    description: {
        type: String,
        unique: true,
        required: [true, 'The description is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Category', schemaCategory);