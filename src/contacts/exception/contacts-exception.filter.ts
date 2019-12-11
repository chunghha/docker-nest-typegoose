import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from '@nestjs/common';

import {
  ContactsCreateException,
  ContactsException
} from './contacts-exception';

@Catch()
export class ContactsExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const code =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = this.getMessage(code, exception);

    const error: ContactsException = {
      code,
      endpoint: request.url,
      level: 'error',
      message,
      timestamp: new Date().toISOString()
    };

    response.status(code).json(this.dispatchContactsException(error, request));
  }

  private dispatchContactsException(error: ContactsException, request: any) {
    if (error.endpoint?.includes('create')) {
      error = this.getContactsCreateException(error, request);
    }

    return error;
  }

  private getContactsCreateException(error: ContactsException, request: any) {
    (error as ContactsCreateException).emailAddress = request.body.emailAddress;

    return error;
  }

  private getMessage(code: number, exception: HttpException): string {
    // just to return message as string without including exception.message object
    switch (code) {
      case HttpStatus.BAD_REQUEST:
      case HttpStatus.FORBIDDEN:
        return exception.message.message;
      default:
        return 'Internal Server Error';
    }
  }
}
