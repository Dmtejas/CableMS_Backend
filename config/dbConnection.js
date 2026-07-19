import mongoose from "mongoose";

const databaseConnection = async () => {
    const con = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to database : ${con.connection.name}`)
    
}

export default databaseConnection