"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConnect_1 = __importDefault(require("../../config/dbConnect"));
const user_1 = __importDefault(require("./user"));
class Comment extends sequelize_1.Model {
}
Comment.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.BIGINT
    },
    productId: {
        allowNull: true,
        type: sequelize_1.DataTypes.BIGINT
    },
    userId: {
        allowNull: true,
        type: sequelize_1.DataTypes.BIGINT
    },
    tutorialId: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING
    },
    name: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING
    },
    text: {
        allowNull: true,
        type: sequelize_1.DataTypes.TEXT
    },
}, {
    timestamps: true,
    sequelize: dbConnect_1.default,
    underscored: false
});
Comment.belongsTo(user_1.default, { foreignKey: "userId" });
exports.default = Comment;
