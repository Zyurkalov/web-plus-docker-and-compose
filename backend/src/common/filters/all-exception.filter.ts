import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { EntityNotFoundError } from 'typeorm';

import { MAP_ERRORS } from 'src/constants/constants';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    // значения по умолчанию:
    // let status = MAP_ERRORS.default.statusCode;
    // let message = MAP_ERRORS.default.message;

    let errorException: HttpException = new InternalServerErrorException(
      'Ошибка сервера',
    );
    const status = errorException.getStatus();

    console.log('------------------ExceptionFilter------------------------');

    if (exception instanceof HttpException) {
      if (exception instanceof UnauthorizedException) {
        errorException = exception;
        errorException.message =
          errorException.message || MAP_ERRORS.unauthorized.message;
      }
      if (exception instanceof EntityNotFoundError) {
        errorException = exception;
        errorException.message =
          errorException.message || MAP_ERRORS.notFound.message;
      }
      if (exception instanceof ConflictException) {
        errorException = exception;
        errorException.message =
          errorException.message || MAP_ERRORS.userAlreadyExists.message;
      }
      if (exception instanceof NotFoundException) {
        errorException = exception;
        errorException.message =
          errorException.message || MAP_ERRORS.notFound.message;
      } else {
        errorException = exception;
      }
    }
    // if (exception instanceof EntityNotFoundError) {
    //   status = MAP_ERRORS.notFound.statusCode;
    //   message = MAP_ERRORS.notFound.message;
    // } else if (exception instanceof ConflictException) {
    //   status = MAP_ERRORS.userAlreadyExists.statusCode;
    //   message = exception.message || MAP_ERRORS.userAlreadyExists.message;
    // } else if (exception instanceof NotFoundException) {
    //   status = MAP_ERRORS.notFound.statusCode;
    //   message = MAP_ERRORS.notFound.message;
    // } else if (exception instanceof UnauthorizedException) {
    //   status = MAP_ERRORS.unauthorized.statusCode;
    //   message = MAP_ERRORS.unauthorized.message;
    // } else if (exception instanceof HttpException) {
    //   const responseBody = exception.getResponse() as { message?: string };
    //   status = exception.getStatus();
    //   message = responseBody.message || MAP_ERRORS.default.message;
    // }

    response.status(status).json({
      error: {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: errorException.message,
      },
    });
  }
}
