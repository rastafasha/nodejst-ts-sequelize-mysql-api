"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const Routes_1 = __importDefault(require("./routes/Routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    return res.status(200).send({
        response: 'Express Typescript'
    });
});
app.use(Routes_1.default);
app.listen(process.env.APP_PORT, () => {
    console.log(`${process.env.APP_NAME} running on port ${process.env.APP_PORT}`);
});
