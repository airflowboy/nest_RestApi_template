import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/UserEntity';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';

@Module(
    {
        imports: [TypeOrmModule.forFeature([UserEntity])],
        providers: [UsersService],
        controllers: [UsersController],
      }
)
export class UserModule {}
