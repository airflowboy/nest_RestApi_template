import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsersService } from "./user.service";
import { UserEntity } from "./entities/UserEntity";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get("/findAll")
    findAll(): Promise<UserEntity[]> {
        return this.usersService.findAll();
    }

    @Get("/findOne/:id")
    findOne(@Param("id") id: number): Promise<UserEntity | null> {
        return this.usersService.findOne(id);
    }

    @Delete("/remove/:id")
    remove(@Param("id") id: number): Promise<void> {
        return this.usersService.remove(id);
    }

    @Post("/create")
    create(@Body() user: UserEntity): Promise<UserEntity> {
        return this.usersService.create(user);
    }

    @Put("/update/:id")
    update(@Param("id") id: number, @Body() user: UserEntity): Promise<boolean> {
        return this.usersService.update(id, user);
    }
}
