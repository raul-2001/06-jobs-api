const jwt = require('jsonwebtoken')
const UnauthenticatedError = require('../errors')

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        throw new UnauthenticatedError('Authentication Invalid!')
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = {userId: payload.userId, name: payload.name}
        next()
    } catch (error) {
        throw new UnauthenticatedError('Authentication Invalid!')
    }
}


module.exports = auth