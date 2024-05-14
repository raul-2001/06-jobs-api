const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')
const bcrypt = require('bcryptjs')


const register = async (req, res) => {
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res
        .status(StatusCodes.CREATED)
        .json({user: {name: user.name}, token, msg: 'User created'})
}

const logon = async (req, res) => {
    console.log(req.body)
    const {email, password}  = req.body
    if (!email || !password) {
        console.log(email, password)
        throw new BadRequestError('Please provide email and password!')
    }

    const user = await User.findOne({ email })
    if (!user) {
        throw new UnauthenticatedError('Invalid Creadentials user!')
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Creadentials password !')
    }

    const token = user.createJWT()

    res.status(StatusCodes.OK).json({user: {name: user.name}, token, msg: `Success: ${user.name} signed in`})
}


module.exports = {register, logon}