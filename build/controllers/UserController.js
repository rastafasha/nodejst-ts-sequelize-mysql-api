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
const user_1 = __importDefault(require("../db/models/user"));
const role_1 = __importDefault(require("../db/models/role"));
const helper_1 = __importDefault(require("../helpers/helper"));
const passwordHelper_1 = __importDefault(require("../helpers/passwordHelper"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, roleId, password, confirmPassword } = req.body;
        const hashed = yield passwordHelper_1.default.PasswordHashing(password);
        const user = yield user_1.default.create({
            firstName,
            lastName,
            email,
            password: hashed,
            roleId: roleId,
            active: true,
            verified: true,
        });
        return res.status(201).send(helper_1.default.ResponseData(201, "Created", null, user));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const UserLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_1.default.findOne({
            where: {
                email: email
            }
        });
        if (!user) {
            return res.status(401).send(helper_1.default.ResponseData(401, "Unauthorized", null, null));
        }
        const matched = yield passwordHelper_1.default.PaswordCompare(password, user.password);
        if (!matched) {
            return res.status(401).send(helper_1.default.ResponseData(401, "Unauthorized", null, null));
        }
        const dataUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            roleId: user.roleId,
            verified: user.verified,
            active: user.active
        };
        const token = helper_1.default.GenerateToken(dataUser);
        const refreshToken = helper_1.default.GenerateFreshToken(dataUser);
        user.accessToken = refreshToken;
        yield user.save();
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        const responseUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            roleId: user.roleId,
            verified: user.verified,
            active: user.active,
            token: token
        };
        return res.status(200).send(helper_1.default.ResponseData(200, "Ok", null, responseUser));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const RefeshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const refreshToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken;
        if (!refreshToken) {
            return res.status(401).send(helper_1.default.ResponseData(401, "Unauthorized", null, null));
        }
        const decodedUser = helper_1.default.ExtractRefreshToken(refreshToken);
        if (!decodedUser) {
            return res.status(401).send(helper_1.default.ResponseData(401, "Unauthorized", null, null));
        }
        const token = helper_1.default.GenerateToken({
            firstName: decodedUser.firstName,
            lastName: decodedUser.lastName,
            email: decodedUser.email,
            roleId: decodedUser.roleId,
            verified: decodedUser.verified,
            active: decodedUser.active
        });
        const resultUser = {
            firstName: decodedUser.firstName,
            lastName: decodedUser.lastName,
            email: decodedUser.email,
            roleId: decodedUser.roleId,
            verified: decodedUser.verified,
            active: decodedUser.active,
            token: token
        };
        return res.status(200).send(helper_1.default.ResponseData(200, "Ok", null, resultUser));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const UserDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = res.locals.userEmail;
        const user = yield user_1.default.findOne({
            where: {
                email: email
            },
            include: {
                model: role_1.default,
                attributes: ["id", "roleName"]
            }
        });
        if (!user) {
            return res.status(404).send(helper_1.default.ResponseData(404, "User not found", null, null));
        }
        user.password = "";
        user.accessToken = "";
        return res.status(200).send(helper_1.default.ResponseData(200, "OK", null, user));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const UserLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const refreshToken = (_b = req.cookies) === null || _b === void 0 ? void 0 : _b.refreshToken;
        if (!refreshToken) {
            return res.status(200).send(helper_1.default.ResponseData(200, "User logout", null, null));
        }
        const email = res.locals.userEmail;
        const user = yield user_1.default.findOne({
            where: {
                email: email
            }
        });
        if (!user) {
            res.clearCookie('refreshToken');
            return res.status(200).send(helper_1.default.ResponseData(200, "User logout", null, null));
        }
        yield user.update({ accessToken: null }, { where: { email: email } });
        res.clearCookie('refreshToken');
        return res.status(200).send(helper_1.default.ResponseData(200, "User logout", null, null));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const UpdateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { firstName, lastName, } = req.body;
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            return res.status(404).send({
                status: 404,
                message: 'Data not found',
                data: null
            });
        }
        user.firstName = firstName;
        user.lastName = lastName;
        yield user.save();
        return res.status(200).send({
            status: 200,
            message: 'Ok',
            data: user
        });
    }
    catch (error) {
        if (error != null && error instanceof Error) {
            return res.status(500).send({
                status: 500,
                message: error.message,
                errors: error
            });
        }
        return res.status(500).send({
            status: 500,
            message: 'Internal server error',
            errors: error
        });
    }
});
const UpdateUserRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { roleId } = req.body;
        const user = yield user_1.default.findOne({
            where: {
                id: id
            }
        });
        if (!user) {
            return res.status(404).send(helper_1.default.ResponseData(404, "Not Found", null, null));
        }
        user.roleId = roleId;
        yield user.save();
        return res.status(200).send(helper_1.default.ResponseData(200, "Role Updated", null, user));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const ActivateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { active } = req.body;
        const user = yield user_1.default.findOne({
            where: {
                id: id
            }
        });
        if (!user) {
            return res.status(404).send(helper_1.default.ResponseData(404, "Not Found", null, null));
        }
        user.active = active;
        yield user.save();
        return res.status(200).send(helper_1.default.ResponseData(200, "User Activate", null, user));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/users/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        // fileSize: '1000000'
        fileSize: 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const mimeType = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path_1.default.extname(file.originalname));
        if (mimeType && extname) {
            return cb(null, true);
        }
        cb(new Error('Give proper files formate to upload'));
    }
}).single('image');
exports.default = {
    Register,
    UserLogin,
    RefeshToken,
    UserDetail,
    UserLogout,
    UpdateUser,
    UpdateUserRole,
    ActivateUser,
    upload
};
