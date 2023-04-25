"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ResponseData = (status, message, error, data) => {
    if (error != null && error instanceof Error) {
        const response = {
            status: status,
            message: message,
            errors: error,
            data: null
        };
        return response;
    }
    const res = {
        status,
        message,
        errors: error,
        data: data
    };
    return res;
};
const GenerateToken = (data) => {
    const token = jsonwebtoken_1.default.sign(data, process.env.JWT_TOKEN, { expiresIn: "10m" });
    return token;
};
const GenerateFreshToken = (data) => {
    const token = jsonwebtoken_1.default.sign(data, process.env.JWT_REFRESH_TOKEN, { expiresIn: "1d" });
    return token;
};
const ExtractToken = (token) => {
    const secretKey = process.env.JWT_TOKEN;
    let respData;
    const res = jsonwebtoken_1.default.verify(token, secretKey, (err, decoded) => {
        if (err) {
            respData = null;
        }
        else {
            respData = decoded;
        }
    });
    if (respData) {
        const result = (respData);
        return result;
    }
    return null;
};
const ExtractRefreshToken = (token) => {
    const secretKey = process.env.JWT_REFRESH_TOKEN;
    let respData;
    const res = jsonwebtoken_1.default.verify(token, secretKey, (err, decoded) => {
        if (err) {
            respData = null;
        }
        else {
            respData = decoded;
        }
    });
    if (respData) {
        const result = (respData);
        return result;
    }
    return null;
};
exports.default = {
    ResponseData,
    GenerateToken,
    GenerateFreshToken,
    ExtractToken,
    ExtractRefreshToken
};
