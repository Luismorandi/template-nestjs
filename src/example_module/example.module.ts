//-
import { Module } from '@nestjs/common';

import { ExampleController } from './application/example.controller';
import { ExampleService } from './application/example.service';
import { ExampleRepository } from './infrastructure/example.reposirory';

//-
@Module({
  imports:[],
  providers: [ExampleService,ExampleRepository],
  controllers: [ExampleController]
})
export class ExamplesModule {}
