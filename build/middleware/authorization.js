"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = __importDefault(require("../helpers/helper"));
const Authenticated = (req, res, next) => {
    try {
        const authtoken = req.headers['authorization'];
        const token = authtoken && authtoken.split(" ")[1];
        if (token === null) {
            return res.status(401).send(helper_1.default.ResponseData(401, "Unauthorized", null, null));
        }
        const result = helper_1.default.ExtractToken(token);
        if (!result) {
            return res.status(401).send(helper_1.default.ResponseData(401, "Unauthorized", null, null));
        }
        res.locals.userEmail = result === null || result === void 0 ? void 0 : result.email;
        res.locals.roleId = result === null || result === void 0 ? void 0 : result.roleId;
        next();
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
};
const SuperAdminRole = (req, res, next) => {
    try {
        const roleId = res.locals.roleId;
        if (roleId !== 1) {
            return res.status(401).send(helper_1.default.ResponseData(401, "Forbidden", null, null));
        }
        next();
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
};
const AdminRole = (req, res, next) => {
    try {
        const roleId = res.locals.roleId;
        if (roleId !== 2) {
            return res.status(401).send(helper_1.default.ResponseData(401, "Forbidden", null, null));
        }
        next();
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
};
const UserRole = (req, res, next) => {
    try {
        const roleId = res.locals.roleId;
        if (roleId !== 3) {
            return res.status(401).send(helper_1.default.ResponseData(401, "Forbidden", null, null));
        }
        next();
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
};
exports.default = {
    Authenticated,
    SuperAdminRole,
    AdminRole,
    UserRole
};
