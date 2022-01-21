export class AppError {
  message!: string;
  statusCode!: number;
  details!: Array<string>;

  constructor(
    message: string = "Something went wrong",
    statusCode: number = 500,
    details: Array<string> = []
  ) {
    this.message = message;
    this.statusCode = statusCode;
    this.details = details;
  }
}

export class HttpErrors extends AppError {
  constructor() {
    super();
  }

  NotFound(msg: string = "Not Found") {
    this.message = msg;
    this.statusCode = 404;
    return this;
  }

  Forbidden(msg: string = "Forbidden") {
    this.message = msg;
    this.statusCode = 403;
    return this;
  }

  InvalidCredentials(msg: string = "Invalid credentials") {
    this.message = msg;
    this.statusCode = 400;
    return this;
  }
}
