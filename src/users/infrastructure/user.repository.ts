import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../domain/user.domain';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>, // Inyectamos el repositorio base
    ) {}

    async getByEmail(email: string): Promise<UserEntity | null> {
        return this.userRepository
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .getOne();
    }

    async getUsersWithCustomFilter(filters: any): Promise<UserEntity[]> {
        const queryBuilder = this.userRepository.createQueryBuilder('user');

        if (filters.name) {
            queryBuilder.andWhere('user.name LIKE :name', { name: `%${filters.name}%` });
        }

        if (filters.email) {
            queryBuilder.andWhere('user.email LIKE :email', {
                email: `%${filters.email}%`,
            });
        }

        return queryBuilder.getMany();
    }

    async save(user: User): Promise<UserEntity> {
        const newUser = this.toDomain(user);
        return this.userRepository.save(newUser);
    }

    private toDomain(user: User): UserEntity {
        const userEntity: UserEntity = {
            id: user.id,
            last_name: user.lastName,
            first_name: user.firstName,
            email: user.email,
            created_at: user.createdAt,
            updated_at: user.updatedAt,
        };
        return userEntity;
    }
}
