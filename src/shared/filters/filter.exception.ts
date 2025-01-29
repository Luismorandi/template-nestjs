import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
  } from '@nestjs/common';
  import { Response } from 'express';
  
  @Catch()
  export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
  
      if (exception instanceof HttpException) {
        return response.status(exception.getStatus()).json({
          statusCode: exception.getStatus(),
          message: exception.message,
        });
      }
  
      // Si no es una excepción HTTP, devolvemos un 500 genérico
      console.error('Unexpected error:', exception);
      return response.status(500).json({
        statusCode: 500,
        message: 'Unexpected error occurred',
      });
    }
  }