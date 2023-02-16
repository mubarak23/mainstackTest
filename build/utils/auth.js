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
exports.generatePasswordHash = exports.issueToken = exports.validPassword = void 0;
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "../.env" });
const validPassword = (password, hash, salt) => {
    //  const salt = crypto.randomBytes(16).toString('hex');
    const verify = crypto_1.default
        .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
        .toString('hex');
    return hash === verify;
};
exports.validPassword = validPassword;
const issueToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = user;
    const expiresIn = '1d';
    const jwtSecret = process.env.JWT_KEY_SECRET;
    const generatedToken = jsonwebtoken_1.default.sign({ _id }, jwtSecret, {
        expiresIn
    });
    return {
        token: `${generatedToken}`,
        expiresIn: expiresIn,
    };
});
exports.issueToken = issueToken;
const generatePasswordHash = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10;
    const passwordSalt = yield bcryptjs_1.default.genSalt(saltRounds);
    return bcryptjs_1.default.hash(password, passwordSalt);
});
exports.generatePasswordHash = generatePasswordHash;
