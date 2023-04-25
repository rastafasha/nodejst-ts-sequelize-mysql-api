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
const submenu_1 = __importDefault(require("../db/models/submenu"));
const helper_1 = __importDefault(require("../helpers/helper"));
const CreateSubmenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, masterMenuId, url, title, icon, ordering, isTargetSelf } = req.body;
        const submenu = yield submenu_1.default.create({
            name, masterMenuId, url, title, icon, ordering, isTargetSelf,
            active: true
        });
        return res.status(201).send(helper_1.default.ResponseData(201, "Created", null, submenu));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const GetListSubmenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const submenu = yield submenu_1.default.findAll({
            where: {
                active: true
            }
        });
        return res.status(200).send(helper_1.default.ResponseData(200, "OK", null, submenu));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const GetAllSubmenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const submenu = yield submenu_1.default.findAll();
        return res.status(200).send(helper_1.default.ResponseData(200, "OK", null, submenu));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const GetDetailSubmenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const submenu = yield submenu_1.default.findOne({
            where: {
                id: id,
                active: true
            }
        });
        if (!submenu) {
            return res.status(404).send(helper_1.default.ResponseData(404, "NotFound", null, null));
        }
        return res.status(200).send(helper_1.default.ResponseData(200, "OK", null, submenu));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const UpdateSubmenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, masterMenuId, url, title, icon, ordering, isTargetSelf } = req.body;
        const submenu = yield submenu_1.default.findOne({
            where: {
                id: id,
                active: true
            }
        });
        if (!submenu) {
            return res.status(404).send(helper_1.default.ResponseData(404, "NotFound", null, null));
        }
        submenu.name = name;
        submenu.masterMenuId = masterMenuId;
        submenu.url = url;
        submenu.title = title;
        submenu.icon = icon;
        submenu.ordering = ordering;
        submenu.isTargetSelf = isTargetSelf;
        yield submenu.save();
        return res.status(200).send(helper_1.default.ResponseData(200, "Updated", null, null));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const SoftDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const submenu = yield submenu_1.default.findOne({
            where: {
                id: id,
                active: true
            }
        });
        if (!submenu) {
            return res.status(404).send(helper_1.default.ResponseData(404, "NotFound", null, null));
        }
        submenu.active = false;
        yield submenu.save();
        return res.status(200).send(helper_1.default.ResponseData(200, "Removed", null, null));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
const DeletePermanent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const submenu = yield submenu_1.default.findOne({
            where: {
                id: id,
                active: true
            }
        });
        if (!submenu) {
            return res.status(404).send(helper_1.default.ResponseData(404, "NotFound", null, null));
        }
        yield submenu.destroy();
        return res.status(200).send(helper_1.default.ResponseData(200, "Deleted", null, submenu));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "", error, null));
    }
});
exports.default = {
    CreateSubmenu,
    GetListSubmenu,
    GetAllSubmenu,
    GetDetailSubmenu,
    UpdateSubmenu,
    SoftDelete,
    DeletePermanent
};
