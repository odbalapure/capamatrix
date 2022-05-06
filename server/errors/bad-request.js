const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

className BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
