
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();


const url = process.env.DB_URL as string

const connectDb = async () => {
    try {
        await mongoose.connect(url)
        console.log('Database Connected Successfully...')
    } catch (error: any) {
        console.log(error.message)
        setTimeout(connectDb, 500)
    }
}

export default connectDb
