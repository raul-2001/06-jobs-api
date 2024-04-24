const { required } = require('joi')
const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    item: {
        itemNumber: {
            type: String,
            required: [true, 'Please provide item number'],
        },
        itemName: {
            type: String,
            required: [true, 'Please provide name'],
            maxLength: 50,
        },
        itemQuantity: {
            type: Number,
            required: [true, 'Please provide quantity'],
        },
        itemPrice: {
            type: Number,
            required: [true, 'Please provide price'],
            maxLength: 15,
        },
    },
    orderNumber: {
        type: String,
        required: [true, 'Please provide order number']
    },
    orderTotal: {
        type: Number,
        maxLength: 15,
    }, 
    OrderStatus: {
        type: String,
        enum: ['inProcess', 'declined', 'completed'],
        default: 'inProcess',
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Order', OrderSchema)