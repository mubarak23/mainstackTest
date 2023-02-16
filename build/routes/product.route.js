"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const product_controller_1 = require("../controllers/product.controller");
const requireToken_1 = require("../middleware/requireToken");
const upload = (0, multer_1.default)({ dest: "uploads/" });
const productRoute = () => {
    const router = (0, express_1.Router)();
    router.post('/product', requireToken_1.requiredToken, product_controller_1.createProduct);
    router.post('/product/upload-image/:id', requireToken_1.requiredToken, upload.single('file'), product_controller_1.productImageUpload);
    router.get('/product', requireToken_1.requiredToken, product_controller_1.getAllProduct);
    router.get('/product/paginate', requireToken_1.requiredToken, product_controller_1.paginateProductList);
    router.get('/product/:id', requireToken_1.requiredToken, product_controller_1.getProduct);
    router.patch('/product/:id', requireToken_1.requiredToken, product_controller_1.updateProduct);
    router.delete('/product/:id', requireToken_1.requiredToken, product_controller_1.deleteProduct);
    return router;
};
exports.productRoute = productRoute;
