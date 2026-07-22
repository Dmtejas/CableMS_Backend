import { Router } from "express";
import {
    addCustomer,
    deleteCustomer,
    getCustomer,
    getCustomers,
    searchCustomer,
    updateCustomer
} from "../controllers/customerController.js";
import jwtValidator from "../middleware/jwtValidation.js";

const customerRouter = Router()

customerRouter.route('/search').get(jwtValidator, searchCustomer)
customerRouter.route('/').get(jwtValidator ,getCustomers)
customerRouter.route('/:id').get(jwtValidator, getCustomer)
customerRouter.route('/').post(jwtValidator, addCustomer)
customerRouter.route('/:id').put(jwtValidator, updateCustomer)
customerRouter.route('/:id').delete(jwtValidator, deleteCustomer)


export default customerRouter