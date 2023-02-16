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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_1 = require("../utils/auth");
const user_model_1 = require("../models/user.model");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ message: 'The fields email, fullName and password are required' });
    }
    const user = yield user_model_1.User.findOne({ email });
    if (!user) {
        return res.status(422).json({ message: 'User with provided details does not exist' });
    }
    const match = yield bcryptjs_1.default.compare(password, user.password);
    if (!match) {
        return res.status(422).json({ message: "User credentials are wrong." });
    }
    const authtoken = yield (0, auth_1.issueToken)(user);
    return res.status(201).json({ data: authtoken });
});
exports.login = login;
