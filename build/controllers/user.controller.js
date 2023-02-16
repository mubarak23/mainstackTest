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
exports.updateUser = exports.getUser = exports.getAllUsers = exports.deleteUser = exports.createUser = void 0;
const auth_1 = require("../utils/auth");
const user_model_1 = require("../models/user.model");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, fullName, password } = req.body;
    try {
        if (!email || !fullName || !password) {
            return res.status(422).json({ message: 'The fields email, fullName and password are required' });
        }
        const userInput = {
            fullName,
            email,
            password: yield (0, auth_1.generatePasswordHash)(password),
        };
        const userCreated = yield user_model_1.User.create(userInput);
        return res.status(201).json({ message: 'User registered Successfully' });
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
exports.createUser = createUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find().sort('-createdAt').select("-password").exec();
    console.log(req.user);
    return res.status(200).json({ data: users });
});
exports.getAllUsers = getAllUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_model_1.User.findOne({ _id: id }).exec();
    if (!user) {
        return res.status(404).json({ message: `User with id "${id}" not found.` });
    }
    return res.status(200).json({ data: user });
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { email, fullName } = req.body;
    const user = yield user_model_1.User.findOne({ _id: id });
    if (!user) {
        return res.status(404).json({ message: `User with id "${id}" not found.` });
    }
    if (!fullName || !email) {
        return res.status(422).json({ message: 'The fields fullName and email are required' });
    }
    yield user_model_1.User.updateOne({ _id: id }, { email, fullName });
    const userUpdated = yield user_model_1.User.findById(id);
    return res.status(200).json({ data: userUpdated });
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield user_model_1.User.findByIdAndDelete(id);
    return res.status(200).json({ message: 'User deleted successfully.' });
});
exports.deleteUser = deleteUser;
