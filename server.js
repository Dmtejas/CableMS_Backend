import express from 'express'
import dotenv from 'dotenv'
import customerRouter from './routes/customerRoute.js'
import databaseConnection from './config/dbConnection.js'
import errorHandler from './middleware/errorHandler.js'
import userRouter from './routes/userRoute.js'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

databaseConnection()

app.use('/api/customers/', customerRouter)
app.use('/api/user/', userRouter)

app.use(errorHandler)
app.listen(process.env.PORT || 3000, (err) => {
    if(err)
        console.log('Error setting up the server');
    console.log(`Server is running at http://localhost:${process.env.PORT}`)    
})
