import { Router } from 'express';
import { createCategory, getAllCategories, getCategory, updateCategory, deleteCategory } from '../controllers/category.controller';
import { requiredToken } from '../middleware/requireToken'
const categoryRoute = () => {
  const router = Router();

  router.post('/category', requiredToken, createCategory);

  router.get('/category', requiredToken, getAllCategories);

  router.get('/category/:id', requiredToken, getCategory);

  router.patch('/category/:id', requiredToken,  updateCategory);

  router.delete('/category/:id', requiredToken, deleteCategory);

  return router;
};

export { categoryRoute };