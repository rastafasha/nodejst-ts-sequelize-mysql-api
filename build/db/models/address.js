"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConnect_1 = __importDefault(require("../../config/dbConnect"));
const user_1 = __importDefault(require("./user"));
class Address extends sequelize_1.Model {
}
Address.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.BIGINT
    },
    userId: {
        allowNull: true,
        type: sequelize_1.DataTypes.BIGINT
    },
    type: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING
    },
    phone1: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING
    },
    phone2: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING
    },
    city: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING
    },
    state: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING
    },
    zip: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING
    },
}, {
    timestamps: true,
    sequelize: dbConnect_1.default,
    underscored: false
});
Address.belongsTo(user_1.default, { foreignKey: "userId" });
exports.default = Address;
