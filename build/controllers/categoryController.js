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
const category_1 = __importDefault(require("../db/models/category"));
const helper_1 = __importDefault(require("../helpers/helper"));
const GetCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_1.default.findAll({
            where: {
                active: true
            }
        });
        return res.status(200).send(helper_1.default.ResponseData(200, "OK", null, categories));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const CreateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, active } = req.body;
        const category = yield category_1.default.create({
            name,
            description,
            active
        });
        return res.status(201).send(helper_1.default.ResponseData(201, "Created", null, category));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const UpdateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, description, active } = req.body;
        const category = yield category_1.default.findByPk(id);
        if (!category) {
            return res.status(404).send(helper_1.default.ResponseData(404, "NotFound", null, null));
        }
        category.name = name;
        category.description = description;
        category.active = active;
        yield category.save();
        return res.status(200).send(helper_1.default.ResponseData(200, "OK", null, category));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const DeleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield category_1.default.findByPk(id);
        if (!category) {
            return res.status(404).send(helper_1.default.ResponseData(404, "NotFound", null, null));
        }
        yield category.destroy();
        return res.status(200).send(helper_1.default.ResponseData(200, "OK", null, category));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const GetCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield category_1.default.findByPk(id);
        if (!category) {
            return res.status(404).send(helper_1.default.ResponseData(404, "NotFound", null, null));
        }
        return res.status(200).send(helper_1.default.ResponseData(200, "OK", null, category));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
exports.default = {
    GetCategory,
    CreateCategory,
    UpdateCategory,
    DeleteCategory,
    GetCategoryById
};
