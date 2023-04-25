"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbName = process.env.DB_NAME;
const dbHost = process.env.DB_HOST;
const dbUserName = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbDialect = 'mysql';
const sequelizeConnection = new sequelize_1.Sequelize(dbName, dbUserName, dbPassword, {
    host: dbHost,
    dialect: dbDialect,
    port: 8889,
});
exports.default = sequelizeConnection;
