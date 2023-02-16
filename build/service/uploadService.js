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
exports.cloudUpload = void 0;
const cloudinary_1 = require("cloudinary");
const cloudUpload = (uploadRequest) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const folderName = process.env.NODE_ENV !== "production" ? "dev" : "prod";
        const cloudinaryUploadResult = yield cloudinary_1.v2.uploader.upload(uploadRequest.file.filePath, { folder: folderName, resource_type: "auto" });
        console.log(cloudinaryUploadResult);
        if (!cloudinaryUploadResult.error) {
            const response = {
                url: cloudinaryUploadResult.secure_url,
                key: cloudinaryUploadResult.public_id,
            };
            return response;
        }
        //  console.log(cloudinaryUploadResult.error)
        throw new Error('Image Upload Fail');
    }
    catch (e) {
        // logger.error(e.message);
        console.log('cloudinary file upload error');
        console.log(e);
        throw new Error('Image Upload Fail');
    }
});
exports.cloudUpload = cloudUpload;
