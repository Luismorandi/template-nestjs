import { Module } from '@nestjs/common';
import { UsersService } from './application/users.service';
import { UsersController } from './application/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/user.entity';
import { UserRepository } from './infrastructure/user.repository';


@Module({
  imports:[TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersService, UserRepository],
  controllers: [UsersController]
})
export class UsersModule {}
