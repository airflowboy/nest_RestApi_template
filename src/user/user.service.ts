import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/UserEntity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>,
                private dataSource: DataSource) {}

    findAll(): Promise<UserEntity[]> {
        try {
            return this.usersRepository.find();
        }catch(e) {
            console.error(e);
            throw e;
        }
    }
    
    findOne(id: number): Promise<UserEntity | null> {
        try {
            return this.usersRepository.findOneBy({ id });
        }catch(e) {
            console.error(e);
            throw e;
        }
    }

    async remove(id: number): Promise<void> {
        try {
            await this.usersRepository.delete(id);
        }catch(e) {
            console.error(e);
            throw e;
        }
    }

    async create(user: UserEntity): Promise<UserEntity> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const userRepository = queryRunner.manager.getRepository(UserEntity);   

        try {
            const savedUser = await userRepository.save(user);
            await queryRunner.commitTransaction();
            return savedUser;
        }catch(e) {
            await queryRunner.rollbackTransaction();
            console.error(e);
            throw e;
        }finally {
            await queryRunner.release();
        }
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

