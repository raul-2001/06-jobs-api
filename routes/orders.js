const express = require('express')
const router = express.Router()

const {getAllOrders,getOrder,createOrder,deleteOrder,updateOrder} = require('../controllers/orders')


router.route('/').get(getAllOrders).post(createOrder)
router.route('/:id').get(getOrder).delete(deleteOrder).patch(updateOrder)


module.exports = router

