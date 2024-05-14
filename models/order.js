const mongoose = require('mongoose')
const allItems = require('./item')
const { required } = require('joi')

const OrderSchema = new mongoose.Schema({

    items: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
    orderNumber: {
        type: Number,
        required: true,
        default: 0,
    },
    orderTotal: {
        type: Number,
        max: 15,
    }, 
    orderStatus: {
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