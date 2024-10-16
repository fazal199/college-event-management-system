class ApiError extends Error {
    constructor(statusCode, message = "something went wrong",clientMessage, errors = []) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.success = false;
        this.clientMessage = clientMessage;
        this.devMessage = message
        this.errors = errors
    }
}

module.exports = ApiError;