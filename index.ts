import express from 'express';
import dotenv from 'dotenv';

import connectDb from './dbconnect';
import { authRoute } from './routes/auth.route';
import { userRoute } from './routes/user.route';
import { categoryRoute } from './routes/category.route'
import { productRoute } from './routes/product.route'

dotenv.config();

const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '4500');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', authRoute());
app.use('/api', userRoute());
app.use('/api', categoryRoute());
app.use('/api', productRoute());

app.get('/', (req, res) => {
  return res.json({ message: 'Hello World!' });
});

app.listen(PORT, async () => {
  await connectDb();

  console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});