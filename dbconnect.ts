
import mongoose from "mongoose";
import dotenv from 'dotenv';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);

// const __dirname = path.dirname(__filename);

// dotenv.config({path:__dirname+'/./../../.env'});

// dotenv.config();
// require('dotenv').config({path:__dirname+'/./../../.env'}) 

const url = process.env.DB_URL as string

const connectDb = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/stacktest')
        console.log('Database Connected Successfully...')
    } catch (error: any) {
        console.log(error.message)
        setTimeout(connectDb, 500)
    }
}

export default connectDb
