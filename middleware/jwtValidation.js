import jwt from 'jsonwebtoken'
import expressAsyncHandler from 'express-async-handler'
import User from '../model/userModel.js'

const jwtValidator = expressAsyncHandler( async (req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader) {
        res.status(401)
        throw new Error(`Authorization Header is Empty`)
    }

    const token = authHeader.split(" ")[1]
    if(!token) {
        res.status(401)
        throw new Error(`Token is required`)
    }

    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET   
    )

    const user = User.findById(decoded._id)
    if(!user) {
        res.status(401)
        throw new Error('Authorization Error')
    }

    req.user = user
    next()
})

export default jwtValidator