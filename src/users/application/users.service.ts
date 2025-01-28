import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from '../domain/user.domain';
import { CreateUserInput } from '../domain/user.types';
import { UserRepository } from '../infrastructure/user.repository';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository) {}

    async create(input: CreateUserInput): Promise<User> {
        try {
            const email = input.email.toLowerCase();
            const existingUser = await this.userRepository.getByEmail(email);
    
            if (existingUser) {
                throw new ConflictException('User with this email already exists'); 
            }
    
            const newUser = new User(
                null, 
                input.firstName,
                input.lastName,
                email,
                new Date(), 
                new Date()  
            );
    
            await this.userRepository.save(newUser);
    
            return newUser;
        } catch (error) {
            if (error instanceof ConflictException) {
                throw error; // Ya lanzamos el error con código 409 en el caso de conflicto
              } else {
                // Si ocurre un error inesperado con la base de datos
                throw new InternalServerErrorException('Failed to create user'); // Error 500
              }        }
    }
    

    async get(email: string): Promise<User | Error> {
        try {
            const user = await this.userRepository.getByEmail(email);

            if (!user) {
                throw new Error(`User with email ${email} dont exist.`);
            }
            const newUser = new User(
                user.id,
                user.firstName,
                user.lastName,
                email,
                new Date(),
                new Date(),
            );

            await this.userRepository.save(newUser);
            
            return newUser;
        } catch (err) {
            throw new Error(`Error trying get user  with email ${email}.`);
        }
    }
}
