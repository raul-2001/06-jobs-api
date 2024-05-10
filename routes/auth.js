const express = require('express')
const router = express.Router()


const {register, logon} = require('../controllers/auth')

router.post('/register', register)
router.post('/logon', logon)

module.exports = router