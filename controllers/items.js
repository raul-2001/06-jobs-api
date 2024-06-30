const { BadRequestError, NotFoundError } = require('../errors')
const Item = require('../models/item')
const {StatusCodes} = require('http-status-codes')

const getAllItems = async (req, res) => {
    const items = await Item.find().sort('-createdAt')
    res.status(StatusCodes.OK).json({items})
}

const getItem = async (req, res) => {
    const {user: {userId}, params: {id: itemId}} = req
    const item = await Item.findOne({_id: itemId, createdBy: userId})
    if (!item) { 
        throw new NotFoundError(`No item with id ${itemId}`)
    }

    res.status(StatusCodes.OK).json({ item })
}

const createItem = async (req, res) => {
    req.body.createdBy = req.user.userId

    const itemCount = await Item.estimatedDocumentCount()
    req.body.itemCount = itemCount + 1

    const item = await Item.create(req.body)
    res.status(StatusCodes.CREATED).json({ item })
}

const deleteItem = async (req, res) => {
    const {user: {userId}, params: {id: itemId}} = req
    const item = await Item.findOneAndDelete({_id: itemId, createdBy: userId})
    if (!item) { 
        throw new NotFoundError(`No item with id ${itemId}`)
    }

    res.status(StatusCodes.OK).send("item deleted")
}

const updateItem = async (req, res) => {
    const {body: {price, quantity}, user: {userId}, params: {id: itemId}} = req

    if (price === '') {
        throw new BadRequestError('price and quantity can not be empty!')
    }
            
    const item = await Item.findByIdAndUpdate({_id: itemId, createdBy: userId}, req.body, {new: true, runValidators: true})
    if (!item) {
        throw new NotFoundError(`No item with id ${itemId}`)
    }        

    res.status(StatusCodes.OK).json({ item })
}

module.exports = {getAllItems, getItem, createItem, deleteItem, updateItem}