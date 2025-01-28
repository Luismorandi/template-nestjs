import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/infrastructure/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [  ConfigModule.forRoot({
    isGlobal: true, // Esto hace que las variables de entorno estén disponibles globalmente
    envFilePath: '.env', // Ruta del archivo .env
  }),  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [UserEntity],
    synchronize: true,
  }),UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
