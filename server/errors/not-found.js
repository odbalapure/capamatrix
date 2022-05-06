const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

className NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
