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
const address_1 = __importDefault(require("../db/models/address"));
const helper_1 = __importDefault(require("../helpers/helper"));
const user_1 = __importDefault(require("../db/models/user"));
const GetAddresses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phone1, phone2, userId, type, city, state, zip } = req.body;
        const addresses = yield address_1.default.create({
            phone1, phone2, type, city, state, zip
        });
        return res.status(201).send(helper_1.default.ResponseData(201, "Created", null, addresses));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const CreateAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const address = yield address_1.default.findAll();
        return res.status(200).send(helper_1.default.ResponseData(200, "OK", null, address));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const UpdateAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { phone1, phone2, userId, type, city, state, zip } = req.body;
        const address = yield address_1.default.findOne({
            where: {
                id: id
            }
        });
        if (!address) {
            return res.status(404).send(helper_1.default.ResponseData(404, "NotFound", null, null));
        }
        address.phone1 = phone1;
        address.phone2 = phone2;
        address.userId = userId;
        address.type = type;
        address.city = city;
        address.state = state;
        address.zip = zip;
        yield address.save();
        return res.status(200).send(helper_1.default.ResponseData(200, "Updated", null, address));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const DeleteAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const address = yield address_1.default.findByPk(id);
        if (!address) {
            return res.status(404).send(helper_1.default.ResponseData(404, "Not Found", null, null));
        }
        yield address.destroy();
        return res.status(200).send(helper_1.default.ResponseData(200, "Deleted", null, address));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const AddressDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.userId;
        const address = yield address_1.default.findOne({
            where: {
                userId: userId
            },
            include: {
                model: user_1.default,
                attributes: ["id", "userId"]
            }
        });
        if (!address) {
            return res.status(404).send(helper_1.default.ResponseData(404, "Address not found", null, null));
        }
        return res.status(200).send(helper_1.default.ResponseData(200, "OK", null, address));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
exports.default = {
    GetAddresses,
    CreateAddress,
    UpdateAddress,
    DeleteAddress,
    AddressDetail
};
