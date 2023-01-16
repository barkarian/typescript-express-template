class AppError extends Error{
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);

    Object.setPrototypeOf(this, AppError.prototype);
    this.name = Error.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this);
  }
}

export default AppError;