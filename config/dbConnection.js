import mongoose from "mongoose";
import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
const databaseConnection = async () => {
    console.log(process.env.MONGO_URI);
    const con = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to database : ${con.connection.name}`)
    
}

export default databaseConnection