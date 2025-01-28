import { Body, ConflictException, Controller, Get, InternalServerErrorException, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../domain/user.domain';
import { CreateUserInput } from '../domain/user.types';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){

    }
    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<User> {
        const response =await this.usersService.get(id);
        console.log('pase')
        if (response instanceof Error) {
            console.log('pase')
            throw new Error(response.message);
        }
        return response;
    }

    @Post('')
    async createUser(@Body() input: CreateUserInput): Promise<User> {
        try {
            const newUser = await this.usersService.create(input);
      
            return newUser;
          } catch (error) {
            if (error instanceof ConflictException) {
              throw new ConflictException(error.message);
            } else if (error instanceof InternalServerErrorException) {
              throw new InternalServerErrorException(error.message);
            } else {
              throw new InternalServerErrorException('Unexpected error occurred');
            }
    }
}
}