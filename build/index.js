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
// Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const body_parser_1 = __importDefault(require("body-parser"));
const dbconnect_1 = __importDefault(require("./dbconnect"));
const auth_route_1 = require("./routes/auth.route");
const user_route_1 = require("./routes/user.route");
const category_route_1 = require("./routes/category.route");
const product_route_1 = require("./routes/product.route");
const errorhandle_1 = require("./middleware/errorhandle");
// dotenv.config({path:__dirname+'/./../../.env'});
// require('dotenv').config({path:__dirname+'/./../../.env'}) 
// cloudinary.v2.config({
//   cloud_name: process.env.CLOUD_NAME,  //|| 'techarewa-com',
//   api_key: process.env.STORAGE_API_KEY, // || '612574853735338',
//   api_secret: process.env.STORAGE_API_SECRET,  // || 'NOS5BEdabuSQaxB_bJRgSungo6A',
// })
cloudinary_1.default.v2.config({
    cloud_name: 'techarewa-com',
    api_key: '612574853735338',
    api_secret: 'NOS5BEdabuSQaxB_bJRgSungo6A',
});
const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '4500');
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// body parser configuration
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/api', (0, auth_route_1.authRoute)());
app.use('/api', (0, user_route_1.userRoute)());
app.use('/api', (0, category_route_1.categoryRoute)());
app.use('/api', (0, product_route_1.productRoute)());
app.get('/', (req, res) => {
    return res.json({ message: 'Hello World!' });
});
app.use(errorhandle_1.errorHandler);
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, dbconnect_1.default)();
    console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
}));
