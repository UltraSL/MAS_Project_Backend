const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const giftSchema = new Schema({
    user_id: {
        type: String,
    },
    count: {
        type: String,
    },

});

const Gift = mongoose.model('gift', giftSchema);
module.exports = Gift;