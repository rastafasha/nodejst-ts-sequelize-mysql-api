"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConnect_1 = __importDefault(require("../../config/dbConnect"));
const role_1 = __importDefault(require("./role"));
class User extends sequelize_1.Model {
}
User.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.BIGINT
    },
    firstName: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING
    },
    lastName: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING
    },
    password: {
        allowNull: true,
        type: sequelize_1.DataTypes.TEXT
    },
    roleId: {
        allowNull: true,
        type: sequelize_1.DataTypes.BIGINT
    },
    verified: {
        allowNull: true,
        type: sequelize_1.DataTypes.BOOLEAN
    },
    accessToken: {
        allowNull: true,
        type: sequelize_1.DataTypes.TEXT
    },
    image: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING
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
User.belongsTo(role_1.default, { foreignKey: "roleId" });
exports.default = User;
