import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
    fullName: String,
    mobileNo: String,
    boxNo: String,
    totalBalance: Number,
    monthlyCharge: Number
},
{
    timestamps: true
}

)

const customerModel = mongoose.model('customer', customerSchema)

export default customerModel