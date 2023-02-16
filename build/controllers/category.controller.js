"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategory = exports.getCategory = exports.getAllCategories = exports.deleteCategory = exports.createCategory = void 0;
const category_model_1 = require("../models/category.model");
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(422).json({ message: 'The fields email, fullName and password are required' });
    }
    const categoryInput = {
        name,
        description,
        user: req.user
    };
    const userCreated = yield category_model_1.Category.create(categoryInput);
    return res.status(201).json({ data: userCreated });
});
exports.createCategory = createCategory;
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield category_model_1.Category.find().sort('-createdAt').exec();
    console.log(req.user);
    return res.status(200).json({ data: users });
});
exports.getAllCategories = getAllCategories;
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield category_model_1.Category.findOne({ _id: id }).exec();
    if (!user) {
        return res.status(404).json({ message: `Category with id "${id}" not found.` });
    }
    return res.status(200).json({ data: user });
});
exports.getCategory = getCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description } = req.body;
    const user = yield category_model_1.Category.findOne({ _id: id });
    if (!user) {
        return res.status(404).json({ message: `Category with id "${id}" not found.` });
    }
    if (!name || !description) {
        return res.status(422).json({ message: 'The fields fullName and email are required' });
    }
    yield category_model_1.Category.updateOne({ _id: id }, { name, description });
    const categoryUpdated = yield category_model_1.Category.findById(id);
    return res.status(200).json({ data: categoryUpdated });
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield category_model_1.Category.findByIdAndDelete(id);
    return res.status(200).json({ message: 'User deleted successfully.' });
});
exports.deleteCategory = deleteCategory;
