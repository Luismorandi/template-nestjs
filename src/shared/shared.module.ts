import { Global, Module } from '@nestjs/common';
import { GlobalExceptionFilter } from './filters/filter.exception';
import { AppLogger } from './logger/logger.service';


@Global()
@Module({
  imports:[],
  providers: [GlobalExceptionFilter,AppLogger],
  exports: [GlobalExceptionFilter,AppLogger],
  controllers: []
})
export class SharedModule {}
