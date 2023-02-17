import express from 'express';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary'
import multer from 'multer'
import bodyParser from 'body-parser';
import connectDb from './dbconnect';
import { authRoute } from './routes/auth.route';
import { userRoute } from './routes/user.route';
import { categoryRoute } from './routes/category.route';
import { productRoute } from './routes/product.route';
import { errorHandler } from './middleware/errorhandle'

dotenv.config()


cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,  
  api_key: process.env.STORAGE_API_KEY, 
  api_secret: process.env.STORAGE_API_SECRET,  
})


const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '4500');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', authRoute());
app.use('/api', userRoute());
app.use('/api', categoryRoute());
app.use('/api', productRoute());

app.get('/', (req, res) => {
  return res.json({ message: 'Hello World!' });
});

 app.use(errorHandler);

app.listen(PORT, async () => {
  await connectDb();

  console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});