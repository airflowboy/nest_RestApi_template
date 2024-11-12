import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/UserEntity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class UsersService {
    constructor(private dataSource: DataSource) {}

    findAll(): Promise<UserEntity[]> {
        const userRepository = this.dataSource.getRepository(UserEntity);
        try {
            return userRepository.find();
        }catch(e) {
            throw e;
        }
    }
    
    findOne(id: number): Promise<UserEntity | null> {
        const userRepository = this.dataSource.getRepository(UserEntity);
        try {
            return userRepository.findOneBy({ id });
        }catch(e) {
            throw e;
        }
    }

    async remove(id: number): Promise<void> {
        const userRepository = this.dataSource.getRepository(UserEntity);
        try {
            await userRepository.delete(id);
        }catch(e) {
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
            throw e;
        }finally {
            await queryRunner.release();
        }
    }

    async update(id: number, user: UserEntity): Promise<boolean>{
        const userRepository = this.dataSource.getRepository(UserEntity);
        try {
            await userRepository.update(id, user);
            return true;
        }catch(e) {
            throw e;
        }
    }
}

