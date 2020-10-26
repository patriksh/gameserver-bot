const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

module.exports = mongoose.model('Server', new mongoose.Schema({
    guild: { type: String },
    name: { type: String },
    game: { type: String },
    host: { type: String },
    port: { type: Number }
}).plugin(AutoIncrement, { inc_field: 'id' }));
