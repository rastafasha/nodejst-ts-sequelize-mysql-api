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
const review_1 = __importDefault(require("../db/models/review"));
const helper_1 = __importDefault(require("../helpers/helper"));
const user_1 = __importDefault(require("../db/models/user"));
const product_1 = __importDefault(require("../db/models/product"));
const tutorial_1 = __importDefault(require("../db/models/tutorial"));
const GetReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield review_1.default.findAll();
        return res.status(200).send(helper_1.default.ResponseData(200, "OK", null, reviews));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const CreateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rating, productId, userId, tutorialId, description } = req.body;
        const review = yield review_1.default.create({
            rating,
            productId,
            userId,
            tutorialId,
            description
        });
        return res.status(201).send(helper_1.default.ResponseData(201, "Created", null, review));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const DeleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const review = yield review_1.default.findOne({
            where: {
                id: id
            }
        });
        if (!review) {
            return res.status(404).send(helper_1.default.ResponseData(404, "NotFound", null, null));
        }
        yield review.destroy();
        return res.status(200).send(helper_1.default.ResponseData(200, "Deleted", null, review));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const GetReviewByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const review = yield review_1.default.findOne({
            where: {
                userId: userId
            },
            include: {
                model: user_1.default,
                attributes: ["id", "firstName"]
            }
        });
        if (!review) {
            return res.status(404).send(helper_1.default.ResponseData(404, "Review not found", null, null));
        }
        return res.status(200).send(helper_1.default.ResponseData(200, "OK", null, review));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const GetReviewByProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const review = yield review_1.default.findOne({
            where: {
                productId: productId
            },
            include: {
                model: product_1.default,
                attributes: ["id", "name"]
            }
        });
        if (!review) {
            return res.status(404).send(helper_1.default.ResponseData(404, "Review not found", null, null));
        }
        return res.status(200).send(helper_1.default.ResponseData(200, "OK", null, review));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const GetReviewByTutorial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tutorialId } = req.params;
        const review = yield review_1.default.findOne({
            where: {
                tutorialId: tutorialId
            },
            include: {
                model: tutorial_1.default,
                attributes: ["id", "name"]
            }
        });
        if (!review) {
            return res.status(404).send(helper_1.default.ResponseData(404, "Review not found", null, null));
        }
        return res.status(200).send(helper_1.default.ResponseData(200, "OK", null, review));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
exports.default = {
    GetReviews,
    CreateReview,
    DeleteReview,
    GetReviewByUser,
    GetReviewByProduct,
    GetReviewByTutorial
};
