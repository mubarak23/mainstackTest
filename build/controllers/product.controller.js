"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.deleteProduct = exports.getProduct = exports.paginateProductList = exports.getAllProduct = exports.productImageUpload = exports.createProduct = void 0;
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const Fs = __importStar(require("fs"));
const ProductImageUploadService = __importStar(require("../service/uploadService"));
const uuid_1 = require("uuid");
const fs_1 = require("fs");
const category_model_1 = require("../models/category.model");
const product_model_1 = require("../models/product.model");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, quantity, category } = req.body;
    try {
        if (!name || !description || !quantity) {
            return res.status(422).json({ message: 'The fields name, description and quantity are required' });
        }
        const categoryExist = yield category_model_1.Category.findById({ _id: category }).exec();
        if (!categoryExist) {
            return res.status(404).json({ message: 'Category Does not exist' });
        }
        const productInput = {
            name,
            description,
            quantity,
            user: req.user,
            category: categoryExist
        };
        const productExist = yield product_model_1.Product.findOne({ name }).exec();
        if (productExist) {
            return res.status(422).json({ message: 'Product the provided Name already exist' });
        }
        const productCreated = yield product_model_1.Product.create(productInput);
        // update product count
        return res.status(201).json({ data: productCreated });
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
exports.createProduct = createProduct;
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_model_1.Product.find().populate('user').populate('category').sort('-createdAt').exec();
    return res.status(200).json({ data: products });
});
exports.getAllProduct = getAllProduct;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield product_model_1.Product.findOne({ _id: id }).populate('user').populate('category').exec();
    if (!product) {
        return res.status(404).json({ message: `Product with id "${id}" not found.` });
    }
    return res.status(200).json({ data: product });
});
exports.getProduct = getProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield product_model_1.Product.findOne({ _id: id });
        if (!product) {
            return res.status(404).json({ message: `Product with id "${id}" not found.` });
        }
        yield product_model_1.Product.updateOne({ _id: id }, req.body);
        const productUpdated = yield product_model_1.Product.findById(id);
        return res.status(200).json({ data: productUpdated });
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
exports.updateProduct = updateProduct;
const productImageUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file)
        return res.status(400).json({ message: `A file was not uploaded` });
    const id = req.params.id;
    const fileUploadDirectory = path_1.default.join(os_1.default.tmpdir(), "file-uploads");
    if (!Fs.existsSync(fileUploadDirectory)) {
        Fs.mkdirSync(fileUploadDirectory);
    }
    const randomFileName = (0, uuid_1.v4)();
    const uploadFilePath = path_1.default.join(os_1.default.tmpdir(), "file-uploads", randomFileName);
    yield fs_1.promises.writeFile(uploadFilePath, req.file.originalname);
    const fileData = {
        filePath: uploadFilePath,
        mimeType: req.file.mimetype,
        sizeInBytes: req.file.size
    };
    const productImagePayload = { fileUuid: randomFileName, file: fileData };
    const productImage = yield ProductImageUploadService.cloudUpload(productImagePayload);
    yield fs_1.promises.unlink(uploadFilePath);
    yield product_model_1.Product.updateOne({ _id: id }, { $push: { images: productImage } });
    return res.status(200).json({ message: `File Uploaded Successfully` });
});
exports.productImageUpload = productImageUpload;
const paginateProductList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit } = req.query;
    try {
        const posts = yield product_model_1.Product.find()
            .limit(Number(limit) * 1)
            .skip((Number(page) - 1) * Number(limit))
            .exec();
        const count = yield product_model_1.Product.count();
        return res.json({
            posts,
            totalPages: Math.ceil(count / Number(limit)),
            currentPage: page
        });
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
exports.paginateProductList = paginateProductList;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield product_model_1.Product.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Product deleted successfully.' });
});
exports.deleteProduct = deleteProduct;
