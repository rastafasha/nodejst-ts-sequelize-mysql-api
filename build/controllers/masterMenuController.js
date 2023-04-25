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
const mastermenu_1 = __importDefault(require("../db/models/mastermenu"));
const helper_1 = __importDefault(require("../helpers/helper"));
const CreateMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, icon, ordering } = req.body;
        const mastermenu = yield mastermenu_1.default.create({
            name, icon, ordering,
            active: true
        });
        return res.status(201).send(helper_1.default.ResponseData(201, "Created", null, mastermenu));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const GetListMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menu = yield mastermenu_1.default.findAll({
            where: {
                active: true
            }
        });
        return res.status(200).send(helper_1.default.ResponseData(200, "OK", null, menu));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const GetAllMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menu = yield mastermenu_1.default.findAll();
        return res.status(200).send(helper_1.default.ResponseData(200, "OK", null, menu));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const GetDetailMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const menu = yield mastermenu_1.default.findOne({
            where: {
                id: id,
                active: true
            }
        });
        if (!menu) {
            return res.status(404).send(helper_1.default.ResponseData(404, "Not Found", null, null));
        }
        return res.status(200).send(helper_1.default.ResponseData(200, "Ok", null, menu));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const UpdateMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, icon, ordering } = req.body;
        const menu = yield mastermenu_1.default.findOne({
            where: {
                id: id,
                active: true
            }
        });
        if (!menu) {
            return res.status(404).send(helper_1.default.ResponseData(404, "Not Found", null, null));
        }
        menu.name = name;
        menu.icon = icon;
        menu.ordering = ordering;
        yield menu.save();
        return res.status(200).send(helper_1.default.ResponseData(200, "Ok", null, menu));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const SoftDeleteMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const menu = yield mastermenu_1.default.findOne({
            where: {
                id: id,
                active: true
            }
        });
        if (!menu) {
            return res.status(404).send(helper_1.default.ResponseData(404, "Not Found", null, null));
        }
        menu.active = false;
        yield menu.save();
        return res.status(200).send(helper_1.default.ResponseData(200, "Removed", null, menu));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const DeletePermanentMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const menu = yield mastermenu_1.default.findByPk(id);
        if (!menu) {
            return res.status(404).send(helper_1.default.ResponseData(404, "Not Found", null, null));
        }
        yield menu.destroy();
        return res.status(200).send(helper_1.default.ResponseData(200, "Deleted", null, menu));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
exports.default = {
    CreateMenu,
    GetListMenu,
    GetAllMenu,
    GetDetailMenu,
    UpdateMenu,
    SoftDeleteMenu,
    DeletePermanentMenu,
};
