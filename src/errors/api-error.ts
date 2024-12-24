export class ApiError extends Error {
  status: number;
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}
