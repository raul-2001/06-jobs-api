const { BadRequestError, NotFoundError } = require('../errors')
const Order = require('../models/order')
const {StatusCodes} = require('http-status-codes')
const Item = require('../models/item')

const getAllOrders = async (req, res) => {
    const orders = await Order.find({createdBy: req.user.userId}).sort('-createdAt')

    if (!orders) {
        throw new NotFoundError('no orders')
    }
    // console.log(orders[orders.length - 1].orderTotal)
    res.status(StatusCodes.OK).json({ orders })
}


const getOrder = async (req, res) => {
    const {user: {userId}, params: {id: orderId}} = req
    const order = await Order.findOne({
        _id: orderId,
        createdBy: userId,
    }).populate('items')

    if(!order) {
        throw new NotFoundError(`No order with id ${orderId}`)
    }

    res.status(StatusCodes.OK).json({ order })
}

const createOrder = async (req, res) => {

    req.body.createdBy = req.user.userId

    const orderCount = await Order.estimatedDocumentCount()
    req.body.orderNumber = orderCount + 1

    const order = await Order.create(req.body)
    res.status(StatusCodes.CREATED).json({ order })
}

const deleteOrder = async (req, res) => {
    const {user: {userId}, params: {id: orderId}} = req
    const order = await Order.findByIdAndDelete({_id: orderId, createdBy: userId})
    if (!order) {
        throw new NotFoundError(`No order with id ${orderId}`)
    }
    res.status(StatusCodes.OK).send('order deleted')
}



const updateOrder = async (req, res) => {

    
    const {body: {orderStatus},
        user: {userId},
        params: {id: orderId}} = req
        if (orderStatus === '') {
            throw new BadRequestError('Status and item price can not be empty!')
        }
        

        const order = await Order.findByIdAndUpdate({_id: orderId, createdBy: userId}, req.body, {
            new: true, runValidators: true
        })

        if (!order) {
            throw new NotFoundError(`No order with id ${orderId}`)
        }

    res.status(StatusCodes.OK).json({ order })
}


module.exports = {getAllOrders,getOrder,createOrder,deleteOrder,updateOrder }