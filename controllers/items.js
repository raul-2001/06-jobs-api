const { BadRequestError, NotFoundError } = require('../errors')
const Item = require('../models/item')
const {StatusCodes} = require('http-status-codes')

const getAllItems = async (req, res) => {
    const items = await Item.find().sort('-createdAt')
    res.status(StatusCodes.OK).json({items})
}

const getItem = async (req, res) => {
    res.send("get single item")
}

const createItem = async (req, res) => {
    req.body.createdBy = req.user.userId
    const item = await Item.create(req.body)
    res.status(StatusCodes.CREATED).json({ item })
}

const deleteItem = async (req, res) => {
    res.send("delete item")
}

const updateItem = async (req, res) => {
    res.send("update item")
}


module.exports = {getAllItems, getItem, createItem, deleteItem, updateItem}