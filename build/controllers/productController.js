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
const product_1 = __importDefault(require("../db/models/product"));
const helper_1 = __importDefault(require("../helpers/helper"));
const user_1 = __importDefault(require("../db/models/user"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const GetProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.default.findAll({
            where: {
                active: true
            }
        });
        return res.status(200).send(helper_1.default.ResponseData(200, "OK", null, products));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const GetProductsPublished = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.default.findAll({
            where: {
                published: true
            }
        });
        return res.status(200).send(helper_1.default.ResponseData(200, "OK", null, products));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const CreateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, image, price, description, published, active } = req.body;
        const product = yield product_1.default.create({
            name,
            image: image.file.path,
            price,
            description,
            published,
            active
        });
        return res.status(201).send(helper_1.default.ResponseData(201, "Created", null, product));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const UpdateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, image, price, description, published, active } = req.body;
        const product = yield product_1.default.findByPk(id);
        if (!product) {
            return res.status(404).send(helper_1.default.ResponseData(404, "NotFound", null, null));
        }
        product.name = name;
        product.image = image.file.path;
        product.price = price;
        product.description = description;
        product.published = published;
        product.active = active;
        yield product.save();
        return res.status(200).send(helper_1.default.ResponseData(200, "OK", null, product));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const DeleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield product_1.default.findByPk(id);
        if (!product) {
            return res.status(404).send(helper_1.default.ResponseData(404, "Not Found", null, null));
        }
        yield product.destroy();
        return res.status(200).send(helper_1.default.ResponseData(200, "OK", null, product));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const GetProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield product_1.default.findByPk(id);
        if (!product) {
            return res.status(404).send(helper_1.default.ResponseData(404, "Not Found", null, null));
        }
        return res.status(200).send(helper_1.default.ResponseData(200, "OK", null, product));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const GetProductByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const product = yield product_1.default.findOne({
            where: {
                userId: userId
            },
            include: {
                model: user_1.default,
                attributes: ["id", "firstName"]
            }
        });
        if (!product) {
            return res.status(404).send(helper_1.default.ResponseData(404, "Product not found", null, null));
        }
        return res.status(200).send(helper_1.default.ResponseData(200, "OK", null, product));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
// 8. Upload Image Controller
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/products/');
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
    GetProducts,
    GetProductsPublished,
    CreateProduct,
    UpdateProduct,
    DeleteProduct,
    GetProductById,
    GetProductByUser,
    upload
};
