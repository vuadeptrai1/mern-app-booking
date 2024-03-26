export default class CustomError extends Error {
  statusCode: number;
  status: string;
  isOperational?: boolean;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode <= 500 ? "failed" : "error";
    // this.isOperational = true;
  }
}
