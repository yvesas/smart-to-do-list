import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        const ctx = context.switchToHttp();
        // const response = ctx.getResponse();
        const request = ctx.getRequest();

        const status =
          error instanceof HttpException
            ? error.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const message =
          error instanceof HttpException
            ? error.message
            : 'Internal server error';

        const errorResponse = {
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          message,
        };
        // Log the error details
        Logger.error(
          `Error: ${error.message} - method:${request.method} - URL: ${request.url} - stack: ${error.stack}`,
          HttpExceptionInterceptor.name,
        );

        return throwError(() => new HttpException(errorResponse, status));
      }),
    );
  }
}
