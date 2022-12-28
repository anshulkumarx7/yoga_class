"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class APIerror {
    constructor(message, code) {
        this.message = message;
        this.code = code;
    }
    static badRequest(message = "Bad Request") {
        return new APIerror(message, 400);
    }
    static unathorized(message = "Unauthorized Access") {
        return new APIerror(message, 401);
    }
    static internalServerError(message = "Something went wrong") {
        return new APIerror(message, 500);
    }
}
exports.default = APIerror;
