import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
        if (response instanceof Error) {
            console.log('pase')
            throw new Error(response.message);
        }
        return response;
    }

    @Post('')
    async createUser(@Body() input: CreateUserInput): Promise<User> {
            const newUser = await this.usersService.create(input);
            return newUser;
      
    }
}
