class ApiResponse {
    constructor(statusCode, data, message = "Success",clientMessage) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = true;
        this.clientMessage  = clientMessage
    }
}
module.exports = ApiResponse;
