import { Injectable } from '@nestjs/common';
import { User } from '../domain/user.domain';
import { randomUUID } from 'crypto';
import { CreateUserInput } from '../domain/user.types';
import { UserRepository } from '../infrastructure/user.repository';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository) {}

    async create(input: CreateUserInput): Promise<User | Error> {
        try {
            const email= input.email.toLowerCase();
            const user = await this.userRepository.getByEmail(email);

            if (user) {
                throw new Error(`User with email ${input.email} already exists.`);
            }
            const newUser = new User(
                randomUUID(),
                input.firstName,
                input.lastName,
                email,
                new Date(),
                new Date(),
            );

            await this.userRepository.save(newUser);
            
            return newUser;
        } catch (err) {
            throw new Error(`User with email ${input.email} already exists.`);
        }
    }
}
