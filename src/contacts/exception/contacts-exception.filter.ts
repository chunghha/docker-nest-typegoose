import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { Logger } from 'winston';

import {
  ContactsCreateException,
  ContactsException
} from './contacts-exception';

@Catch()
export class ContactsExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject('winston') private readonly logger: Logger,
    private readonly httpAdapterHost: HttpAdapterHost
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const adapter = this.httpAdapterHost.httpAdapter;
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

    const replyError = this.dispatchContactsException(error, request);

    this.logger.error(replyError);

    adapter.reply(response, replyError, code);
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
