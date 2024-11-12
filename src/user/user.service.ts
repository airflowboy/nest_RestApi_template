import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/UserEntity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>) {}

    findAll(): Promise<UserEntity[]> {
        return this.usersRepository.find();
      }
    
    findOne(id: number): Promise<UserEntity | null> {
    return this.usersRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
    }

    async create(user: UserEntity): Promise<UserEntity> {
        return this.usersRepository.save(user);
    }

    async update(id: number, user: UserEntity): Promise<boolean>{
        try {
            await this.usersRepository.update(id, user);
            return true;
        }catch(e) {
            console.error(e);
            return false;
        }
    
    }
}

