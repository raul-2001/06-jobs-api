const express = require('express')
const router = express.Router()

const {getAllItems, 
    getItem, 
    createItem, 
    deleteItem, 
    updateItem} = require('../controllers/items')


router.route('/').get(getAllItems).post(createItem)
router.route('/:id').get(getItem).delete(deleteItem).patch(updateItem)


module.exports = router

