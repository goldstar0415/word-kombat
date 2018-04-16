import {Controller, Delete, Get, Param, Patch, Put} from '@nestjs/common';
import {UserRepository} from "../../repository/user/user.repository";
import {ApiBearerAuth, ApiUseTags} from "@nestjs/swagger";
import {User} from "../../entity/user.entity";

@ApiUseTags('user')
@ApiBearerAuth()
@Controller('/api/users')
export class UserController {

    constructor(private readonly userRepository: UserRepository) {}

    @Get('/')
    async getAll(): Promise<User[]> {
        return this.userRepository.findAll();
    }

    @Get('/:id')
    async getUserById(@Param('id') id: number): Promise<User> {
        return this.userRepository.findById(id);
    }

    @Get('/:name')
    async getUserByName(@Param('name') name: string): Promise<User> {
        return this.userRepository.findByName(name);
    }

    @Get('/:email')
    async getUserByEmail(@Param('email') email: string): Promise<User> {
        return this.userRepository.findByEmail(email);
    }

    @Put('/:id')
    async updateUser(@Param('id') id: number): Promise<void> {

    }

    @Patch('/:id/image')
    async updateImage(@Param('id') id: number): Promise<void> {

    }

    @Delete('/:id')
    async deleteUser(@Param('id') id: number): Promise<void> {

    }

}
