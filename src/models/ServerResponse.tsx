export default class ServerResponse {
  status?: number;
  success?: boolean;
  message?: string;
  additionalParam?: string;

  constructor(
    status?: number,
    success: boolean = false,
    message?: string,
    additionalParam?: string
  ) {
    this.status = status;
    this.success = success;
    this.message = message;
    this.additionalParam = additionalParam;
  }
}
