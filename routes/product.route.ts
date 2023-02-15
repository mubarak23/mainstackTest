import { Router } from 'express';
import { createProduct, getAllProduct, getProduct, updateProduct, deleteProduct } from '../controllers/product.controller';
import { requiredToken } from '../middleware/requireToken'
const productRoute = () => {
  const router = Router();

  router.post('/product', requiredToken, createProduct);

  router.get('/product', requiredToken, getAllProduct);

  router.get('/product/:id', requiredToken, getProduct);

  router.patch('/product/:id', requiredToken,  updateProduct);

  router.delete('/product/:id', requiredToken, deleteProduct);

  return router;
};

export { productRoute };