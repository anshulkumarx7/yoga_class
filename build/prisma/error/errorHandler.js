"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const APIerror_1 = __importDefault(require("./APIerror"));
function errorHandler(err, req, res, next) {
    if (err instanceof APIerror_1.default) {
        res.status(err.code).message({ message: err.message });
        return;
    }
    res.status(500).json({
        message: "something went wrong to the server"
    });
}
exports.default = errorHandler;
