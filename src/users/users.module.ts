import { Module } from '@nestjs/common';
import { UsersService } from './application/users.service';
import { UsersController } from './application/users.controller';


@Module({
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
