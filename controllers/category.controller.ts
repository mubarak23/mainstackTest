import { Request, Response } from 'express';
import {generatePasswordHash } from '../utils/auth'

import { Category, CategoryInput } from '../models/category.model';


const createCategory= async (req: Request, res: Response) => {
  const { name, description } = req.body;

  if (!name || !description ) {
    return res.status(422).json({ message: 'The fields email, fullName and password are required' });
  }

  const categoryInput: CategoryInput = {
    name,
    description,
    user: req.user
  };

  const userCreated = await Category.create(categoryInput);

  return res.status(201).json({ data: userCreated });
};

const getAllCategories = async (req: Request, res: Response) => {
  const users = await Category.find().sort('-createdAt').exec();
    console.log(req.user)
  return res.status(200).json({ data: users });
};

const getCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await Category.findOne({ _id: id }).exec();

  if (!user) {
    return res.status(404).json({ message: `Category with id "${id}" not found.` });
  }

  return res.status(200).json({ data: user });
};

const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const user = await Category.findOne({ _id: id });

  if (!user) {
    return res.status(404).json({ message: `Category with id "${id}" not found.` });
  }

  if (!name || !description ) {
    return res.status(422).json({ message: 'The fields fullName and email are required' });
  }

  await Category.updateOne({ _id: id }, {  name, description });

  const categoryUpdated = await Category.findById(id);

  return res.status(200).json({ data: categoryUpdated });
};

const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  await Category.findByIdAndDelete(id);

  return res.status(200).json({ message: 'User deleted successfully.' });
};

export { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory };