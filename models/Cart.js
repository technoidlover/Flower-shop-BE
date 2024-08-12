const { Schema, model} = require('mongoose');

const cartSchema = new Schema({

    // userId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    // },
    services: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Service',
        },
    ],
    event: {
        type: String,
        required: true,
    },
 });
    
const Cart = model('Cart', cartSchema);

module.exports = Cart;