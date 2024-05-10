const { required } = require('joi')
const mongoose = require('mongoose')

const ItemShcema = new mongoose.Schema({
    itemNumber: {
        type: String,
        required: [true, "Please provide item number"]
    },
    itemName: {
        type: String,
        required: [true, 'Please provide item name'],
        maxlength: 50,
    },
    price: {
        type: Number,
        required: [true, 'Please provide item price'],
        maxlength: 15,
        min: 0
    },
    quantity: {
        type: Number,
        required: [true, 'Plase provide item quantity'],
        maxlength: 12,
    },
    madeIn: {
        type: String,
        maxlength: 50,
    },
    createdBy: {
        type:mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },


}, {timestamps: true})

module.exports = mongoose.model('Item', ItemShcema)
