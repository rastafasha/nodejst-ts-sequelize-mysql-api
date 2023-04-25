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
const comment_1 = __importDefault(require("../db/models/comment"));
const helper_1 = __importDefault(require("../helpers/helper"));
const user_1 = __importDefault(require("../db/models/user"));
const product_1 = __importDefault(require("../db/models/product"));
const tutorial_1 = __importDefault(require("../db/models/tutorial"));
const GetComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield comment_1.default.findAll();
        return res.status(200).send(helper_1.default.ResponseData(200, "OK", null, comments));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const CreateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, productId, userId, tutorialId, text } = req.body;
        const comment = yield comment_1.default.create({
            name,
            productId,
            userId,
            tutorialId,
            text
        });
        return res.status(201).send(helper_1.default.ResponseData(201, "Created", null, comment));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const DeleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const comment = yield comment_1.default.findOne({
            where: {
                id: id
            }
        });
        if (!comment) {
            return res.status(404).send(helper_1.default.ResponseData(404, "NotFound", null, null));
        }
        yield comment.destroy();
        return res.status(200).send(helper_1.default.ResponseData(200, "Deleted", null, comment));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const GetCommentByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const comment = yield comment_1.default.findOne({
            where: {
                userId: userId
            },
            include: {
                model: user_1.default,
                attributes: ["id", "firstName"]
            }
        });
        if (!comment) {
            return res.status(404).send(helper_1.default.ResponseData(404, "Comment not found", null, null));
        }
        return res.status(200).send(helper_1.default.ResponseData(200, "OK", null, comment));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const GetCommentByProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const comment = yield comment_1.default.findOne({
            where: {
                productId: productId
            },
            include: {
                model: product_1.default,
                attributes: ["id", "name"]
            }
        });
        if (!comment) {
            return res.status(404).send(helper_1.default.ResponseData(404, "Comment not found", null, null));
        }
        return res.status(200).send(helper_1.default.ResponseData(200, "OK", null, comment));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const GetCommentByTutorial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tutorialId } = req.params;
        const comment = yield comment_1.default.findOne({
            where: {
                tutorialId: tutorialId
            },
            include: {
                model: tutorial_1.default,
                attributes: ["id", "name"]
            }
        });
        if (!comment) {
            return res.status(404).send(helper_1.default.ResponseData(404, "Comment not found", null, null));
        }
        return res.status(200).send(helper_1.default.ResponseData(200, "OK", null, comment));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
exports.default = {
    GetComments,
    CreateComment,
    DeleteComment,
    GetCommentByUser,
    GetCommentByProduct,
    GetCommentByTutorial
};
