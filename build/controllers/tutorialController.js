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
const tutorial_1 = __importDefault(require("../db/models/tutorial"));
const helper_1 = __importDefault(require("../helpers/helper"));
const user_1 = __importDefault(require("../db/models/user"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const GetTutorials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tutorials = yield tutorial_1.default.findAll({
            where: {
                active: true
            }
        });
        return res.status(200).send(helper_1.default.ResponseData(200, "OK", null, tutorials));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const GetTutorialsPublished = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tutorials = yield tutorial_1.default.findAll({
            where: {
                published: true
            }
        });
        return res.status(200).send(helper_1.default.ResponseData(200, "OK", null, tutorials));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const CreateTutorial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, image, price, description, published, active } = req.body;
        const tutorial = yield tutorial_1.default.create({
            name,
            image: image.file.path,
            price,
            description,
            published,
            active
        });
        return res.status(201).send(helper_1.default.ResponseData(201, "Created", null, tutorial));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const UpdateTutorial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, image, price, description, published, active } = req.body;
        const tutorial = yield tutorial_1.default.findByPk(id);
        if (!tutorial) {
            return res.status(404).send(helper_1.default.ResponseData(404, "NotFound", null, null));
        }
        tutorial.name = name;
        tutorial.image = image.file.path;
        tutorial.price = price;
        tutorial.description = description;
        tutorial.published = published;
        tutorial.active = active;
        yield tutorial.save();
        return res.status(200).send(helper_1.default.ResponseData(200, "OK", null, tutorial));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const DeleteTutorial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tutorial = yield tutorial_1.default.findByPk(id);
        if (!tutorial) {
            return res.status(404).send(helper_1.default.ResponseData(404, "Not Found", null, null));
        }
        yield tutorial.destroy();
        return res.status(200).send(helper_1.default.ResponseData(200, "OK", null, tutorial));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const GetTutorialById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tutorial = yield tutorial_1.default.findByPk(id);
        if (!tutorial) {
            return res.status(404).send(helper_1.default.ResponseData(404, "Not Found", null, null));
        }
        return res.status(200).send(helper_1.default.ResponseData(200, "OK", null, tutorial));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const GetTutorialByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const tutorial = yield tutorial_1.default.findOne({
            where: {
                userId: userId
            },
            include: {
                model: user_1.default,
                attributes: ["id", "firstName"]
            }
        });
        if (!tutorial) {
            return res.status(404).send(helper_1.default.ResponseData(404, "Tutorial not found", null, null));
        }
        return res.status(200).send(helper_1.default.ResponseData(200, "OK", null, tutorial));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/tutorials/');
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
    GetTutorials,
    GetTutorialsPublished,
    CreateTutorial,
    UpdateTutorial,
    DeleteTutorial,
    GetTutorialById,
    GetTutorialByUser,
    upload
};
