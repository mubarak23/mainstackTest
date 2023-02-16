"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const requireToken_1 = require("../middleware/requireToken");
const userRoute = () => {
    const router = (0, express_1.Router)();
    router.post('/users', user_controller_1.createUser);
    router.get('/users', requireToken_1.requiredToken, user_controller_1.getAllUsers);
    router.get('/users/:id', user_controller_1.getUser);
    router.patch('/users/:id', user_controller_1.updateUser);
    router.delete('/users/:id', user_controller_1.deleteUser);
    return router;
};
exports.userRoute = userRoute;
