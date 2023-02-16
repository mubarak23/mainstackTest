import { Router } from 'express';
import multer from 'multer';
import { createProduct, productImageUpload, getAllProduct, paginateProductList, getProduct, updateProduct, deleteProduct } from '../controllers/product.controller';
import { requiredToken } from '../middleware/requireToken'

const upload = multer({ dest: "uploads/" });
const productRoute = () => {
  const router = Router();

  router.post('/product', requiredToken, createProduct);

  router.post('/product/upload-image/:id', requiredToken, upload.single('file'), productImageUpload )

  router.get('/product', requiredToken, getAllProduct);

  router.get('/product/paginate', requiredToken, paginateProductList);

  router.get('/product/:id', requiredToken, getProduct);

  router.patch('/product/:id', requiredToken,  updateProduct);

  router.delete('/product/:id', requiredToken, deleteProduct);

  return router;
};

export { productRoute };