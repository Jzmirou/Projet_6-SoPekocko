const jwt = require('jsonwebtoken')
const Users = require('../models/Users')
const GeneralError = require('../untils/error')

exports.isAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) throw new Error

        const token = authHeader.split(' ')[1]
        if (!token) throw new Error

        const decodedToken = jwt.verify(token, 'S3CR3TE')

        const user = await Users.findById(decodedToken._id)
        if (!user) next(new GeneralError('No user found with this token', 404))

        req.userId = user._id
        next()

    } catch (err) {
        next(new GeneralError("Access Denied", 401))
    }
}

