import { Router } from "express";
import { register, login } from "../controllers/userController.js";
const userRouter = Router()

userRouter.route('/register').post(register)
userRouter.route('/login').post(login)

export default userRouter