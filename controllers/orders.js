const { BadRequestError, NotFoundError } = require('../errors')
const Order = require('../models/order')
const {StatusCodes} = require('http-status-codes')

const getAllOrders = async (req, res) => {
    const orders = await Order.find().sort('-createdAt')
    res.status(StatusCodes.OK).json({ orders })
}

const getOrder = async (req, res) => {
    res.send("get single order")
}

const createOrder = async (req, res) => {
    req.body.createdBy = req.user.userId
    const order = await Order.create(req.body)
    res.status(StatusCodes.CREATED).json({ order })
}

const deleteOrder = async (req, res) => {
    res.send("delete order")
}

const updateOrder = async (req, res) => {
    res.send("update order")
}


module.exports = {getAllOrders,getOrder,createOrder,deleteOrder,updateOrder }