"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const authRoute = () => {
    const router = (0, express_1.Router)();
    router.post('/auth/login', auth_controller_1.login);
    return router;
};
exports.authRoute = authRoute;
