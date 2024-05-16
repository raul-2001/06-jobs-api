const { required } = require('joi')
const mongoose = require('mongoose')

const ItemShcema = new mongoose.Schema({
    itemNumber: {
        type: Number,
        trim: true
    },
    itemName: {
        type: String,
        required: [true, 'Please provide item name'],
        maxlength: [50, 'Name can not be more than 50 characters'],
    },
    price: {
        type: Number,
        required: [true, 'Please provide item price'],
        min: 1,
        max: [15, 'Price can not be more than 15 characters '],
        
    },
    quantity: {
        type: Number,
        required: [true, 'Plase provide item quantity'],
        min: 1,
        max: [12, 'Quantity can not be more than 12 characters'],
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