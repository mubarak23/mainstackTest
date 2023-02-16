import { Request, Response } from 'express';
import path from 'path'
import os from 'os'
import * as Fs from 'fs'
import { FileData } from '../interface/fileData';
import * as ProductImageUploadService from '../service/uploadService'
import { v4 as uuidv4 } from "uuid";
import { promises as fsAsync } from 'fs';
import { Category } from '../models/category.model';
import { Product, ProductInput } from '../models/product.model';
import { UploadRequest } from '../interface/uploadInterface';


const createProduct = async (req: Request, res: Response) => {
  const { name, description, quantity, category } = req.body;
  try {
    if (!name || !description || !quantity ) {
      return res.status(422).json({ message: 'The fields name, description and quantity are required' });
    }
  
    const categoryExist = await Category.findById({ _id: category }).exec()
    if (!categoryExist){
      return res.status(404).json({message: 'Category Does not exist'})
    }
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
  
    // update product count
  
    return res.status(201).json({ data: productCreated });

  } catch (error: any) {
    return res.status(500).send(error.message)
  }
}

  const getAllProduct = async (req: Request, res: Response) => {
    const products = await Product.find().populate('user').populate('category').sort('-createdAt').exec();
    return res.status(200).json({ data: products });
  }

const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await Product.findOne({ _id: id }).populate('user').populate('category').exec();

  if (!product) {
    return res.status(404).json({ message: `Product with id "${id}" not found.` });
  }

  return res.status(200).json({ data: product });
};

const updateProduct= async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ _id: id });

    if (!product) {
      return res.status(404).json({ message: `Product with id "${id}" not found.` });
    }
  
  
    await Product.updateOne({ _id: id }, req.body);
  
    const productUpdated = await Product.findById(id);
  
    return res.status(200).json({ data: productUpdated });
  } catch (error: any) {
    return res.status(500).send(error.message)
  }
 
};

const productImageUpload = async (req: Request, res: Response) => {
  if (!req.file) return res.status(400).json({message: `A file was not uploaded`})

  const id = req.params.id

  const fileUploadDirectory = path.join(os.tmpdir(), "file-uploads");

  if (!Fs.existsSync(fileUploadDirectory)) {
    Fs.mkdirSync(fileUploadDirectory)
  }
  const randomFileName = uuidv4();

  const uploadFilePath: string = path.join(os.tmpdir(), "file-uploads", randomFileName)

  await fsAsync.writeFile(uploadFilePath, req.file.originalname);

  const fileData: FileData = {
    filePath: uploadFilePath,
    mimeType: req.file.mimetype,
    sizeInBytes: req.file.size
  }

  const productImagePayload: UploadRequest = {fileUuid: randomFileName, file: fileData}
  const productImage = await ProductImageUploadService.cloudUpload(productImagePayload)


  await fsAsync.unlink(uploadFilePath)

  
  await Product.updateOne({ _id: id }, { $push: {images: productImage } });

  return res.status(200).json({message: `File Uploaded Successfully`})
}

const paginateProductList = async (req: Request, res: Response) => {
  
  const { page, limit   } = req.query;

  try {
    const posts = await Product.find()
    .limit(Number(limit) * 1)
    .skip((Number(page) - 1) * Number(limit))
    .exec();

  const count = await Product.count();
 return res.json({
    posts,
    totalPages: Math.ceil(count / Number(limit)),
    currentPage: page
  });
  } catch (error: any) {
    return res.status(500).send(error.message)
    
  }

};


const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  await Product.findByIdAndDelete(id);

  return res.status(200).json({ message: 'Product deleted successfully.' });
};



export { createProduct, productImageUpload, getAllProduct, paginateProductList, getProduct, deleteProduct, updateProduct };
