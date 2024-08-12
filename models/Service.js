const { Schema, model } = require('mongoose');


const serviceSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    deposit: {
        type: Number,
        required: true,
    }
    });

const Service = model('Service', serviceSchema);

module.exports = Service;