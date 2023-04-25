"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConnect_1 = __importDefault(require("../../config/dbConnect"));
const user_1 = __importDefault(require("./user"));
const review_1 = __importDefault(require("./review"));
const comment_1 = __importDefault(require("./comment"));
const category_1 = __importDefault(require("./category"));
class Product extends sequelize_1.Model {
}
Product.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.BIGINT
    },
    name: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING
    },
    image: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING
    },
    price: {
        allowNull: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    description: {
        allowNull: true,
        type: sequelize_1.DataTypes.TEXT
    },
    published: {
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
Product.belongsTo(user_1.default, { foreignKey: "userId" });
Product.belongsTo(review_1.default, { foreignKey: "productId" });
Product.belongsTo(comment_1.default, { foreignKey: "productId" });
Product.belongsTo(category_1.default, { foreignKey: "productId" });
exports.default = Product;
