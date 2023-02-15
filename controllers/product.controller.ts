import { Request, Response } from 'express';
import { Category } from '../models/category.model';
import { Product, ProductInput } from '../models/product.model';


const createProduct = async (req: Request, res: Response) => {
  const { name, description, quantity, category } = req.body;

  if (!name || !description || !quantity ) {
    return res.status(422).json({ message: 'The fields name, description and quantity are required' });
  }

  const categoryExist = await Category.findById({ _id: category }).exec()
  console.log(categoryExist)
  const productInput: ProductInput = {
    name,
    description,
    quantity,
    user: req.user!,
    category: categoryExist!
  };
  const productExist = await Product.findOne({ name }).exec()
  if(productExist){
    return res.status(422).json({ message: 'Product the provided Name already exist' });
  }
  const productCreated = await Product.create(productInput);

  return res.status(201).json({ data: productCreated });
};

const getAllProduct = async (req: Request, res: Response) => {
  const products = await Product.find().sort('-createdAt').exec();
  return res.status(200).json({ data: products });
};

const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await Product.findOne({ _id: id }).exec();

  if (!product) {
    return res.status(404).json({ message: `Product with id "${id}" not found.` });
  }

  return res.status(200).json({ data: product });
};

const updateProduct= async (req: Request, res: Response) => {
  const { id } = req.params;
 
  const product = await Product.findOne({ _id: id });

  if (!product) {
    return res.status(404).json({ message: `Product with id "${id}" not found.` });
  }


  await Product.updateOne({ _id: id }, req.body);

  const productUpdated = await Product.findById(id);

  return res.status(200).json({ data: productUpdated });
};

const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  await Category.findByIdAndDelete(id);

  return res.status(200).json({ message: 'User deleted successfully.' });
};

export { createProduct, getAllProduct, getProduct, deleteProduct, updateProduct };