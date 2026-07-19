import expressAsyncHandler from "express-async-handler";
import customerModel from "../model/customerSchema.js";

const getCustomers = expressAsyncHandler ( async (req, res) => {
    const customer = await customerModel.find()
    if(customer == null) {
        res.json({'message': 'Customer not found'})
    }
    res.status(200).json(customer)
})


const getCustomer = expressAsyncHandler ( async (req, res) => {
    const { id } = req.params
    const customer = await customerModel.findById(id)
    if(!customer) {
        res.status(404)
        throw new Error(`Customer not found`)
    }

    res.status(200).json(customer)
})


const addCustomer = expressAsyncHandler ( async (req, res) => {
    const customer = req.body;
    if(customer == null) {
        res.status(500)
        throw new Error('Customer data is null')
    }
    await customerModel.create(customer);
    res.status(201).json({"Message": "Customer created successfully"})

})



const updateCustomer = expressAsyncHandler (async (req, res) => {
    const updatedCustomer = req.body;
    const { id } = req.params
    const customer = await customerModel.findByIdAndUpdate(
        id,
        updatedCustomer,
        {
            new: true
        }
    )
    if(!customer) {
        res.status(404)
        throw new Error('Customer not found')
    } else {
        return res.status(201).json(customer)
    }
})

const deleteCustomer = expressAsyncHandler ( async (req, res) => {
    const { id } = req.params
    const deletedCustomer = await customerModel.findByIdAndDelete(id)

    if(!deletedCustomer) {
        res.status(404)
        throw new Error("Customer not found to delete")
    }

    res.status(200).json(deletedCustomer)
})


export {getCustomers, getCustomer, addCustomer, updateCustomer, deleteCustomer}