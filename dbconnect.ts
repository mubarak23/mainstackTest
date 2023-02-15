// import mongoose, { ConnectionOptions } from 'mongoose';


// mongoose.Promise = global.Promise;



// const connectToDatabase = async (): Promise<void> => {
//   const options: ConnectionOptions = { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true };

//   await mongoose.connect(`mongodb://127.0.0.1:27017/fastFood`, options);
// };

// export { connectToDatabase };


import mongoose from "mongoose";

const url = 'mongodb://127.0.0.1:27017/stacktest'

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
