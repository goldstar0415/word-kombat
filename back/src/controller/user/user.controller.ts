import * as _ from 'lodash';
import * as bcrypt from 'bcryptjs';
import * as cloudinary from 'cloudinary';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
} from '@nestjs/common';
import { UserRepository } from '../../repository/user/user.repository';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { User } from '../../entity/user.entity';
import { UserDto } from '../../model/user.model';

@ApiUseTags('user')
@ApiBearerAuth()
@Controller('/api/users')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @Get('/')
  async getAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  @Get('/:id')
  async getUserById(@Param('id') id: number): Promise<Partial<User>> {
    return this.userRepository.findById(id).then(result => {
      return _.omit(result.dataValues, ['password']);
    });
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() user: Partial<UserDto>,
  ): Promise<Partial<User>> {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 8);
    }

    return this.userRepository.update(id, user);
  }

  @Patch('/:id/image')
  async updateImage(
    @Param('id') id: number,
    @Body() req: { image: string },
  ): Promise<void> {
    cloudinary.uploader.upload(
      req.image,
      async result => {
        if (result.url) {
          return this.userRepository.update(id, { icon: result.url } as any);
        }
      },
      { public_id: String(process.env.CLOUDINARY_USER_ICONS_FOLDER) + id },
    );
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
