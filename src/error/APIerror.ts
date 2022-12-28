
class APIerror {
    message : string;
    code : number;

    constructor (message:string, code: number) {
        this.message = message;
        this.code = code;
    }

    static badRequest (message: string = "Bad Request") {
        return new APIerror (message, 400);
    }

    static unathorized (message: string = "Unauthorized Access") {
        return new APIerror (message, 401);
    }

    static internalServerError (message: string = "Something went wrong") {
        return new APIerror (message, 500);
    }
}

export default APIerror;