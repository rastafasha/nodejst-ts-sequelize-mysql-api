"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConnect_1 = __importDefault(require("../../config/dbConnect"));
class SubMenu extends sequelize_1.Model {
}
SubMenu.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.BIGINT
    },
    masterMenuId: {
        allowNull: true,
        type: sequelize_1.DataTypes.BIGINT
    },
    name: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING
    },
    title: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING
    },
    url: {
        allowNull: true,
        type: sequelize_1.DataTypes.TEXT
    },
    icon: {
        allowNull: true,
        type: sequelize_1.DataTypes.TEXT
    },
    ordering: {
        allowNull: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    isTargetSelf: {
        allowNull: true,
        type: sequelize_1.DataTypes.BOOLEAN
    },
    active: {
        allowNull: true,
        type: sequelize_1.DataTypes.BOOLEAN
    }
}, {
    timestamps: true,
    sequelize: dbConnect_1.default,
    underscored: false
});
exports.default = SubMenu;
