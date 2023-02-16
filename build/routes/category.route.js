"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoute = void 0;
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const requireToken_1 = require("../middleware/requireToken");
const categoryRoute = () => {
    const router = (0, express_1.Router)();
    router.post('/category', requireToken_1.requiredToken, category_controller_1.createCategory);
    router.get('/category', requireToken_1.requiredToken, category_controller_1.getAllCategories);
    router.get('/category/:id', requireToken_1.requiredToken, category_controller_1.getCategory);
    router.patch('/category/:id', requireToken_1.requiredToken, category_controller_1.updateCategory);
    router.delete('/category/:id', requireToken_1.requiredToken, category_controller_1.deleteCategory);
    return router;
};
exports.categoryRoute = categoryRoute;
