import * as _ from "lodash";
import * as bcrypt from "bcryptjs";
import * as cloudinary from "cloudinary";
import { Body, Controller, Delete, Get, Param, Patch, Put } from "@nestjs/common";
import { UserRepository } from "../../repository/user/user.repository";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags } from "@nestjs/swagger";
import { User } from "../../entity/user.entity";
import { UserDto } from "../../model/user.model";
import { MessageCodeError } from "../../config/error";

@ApiUseTags("user")
@ApiBearerAuth()
@Controller("/api/users")
export class UserController {

  constructor(private readonly userRepository: UserRepository) {
  }

  @ApiOperation({ title: "Retrieves all users" })
  @ApiResponse({ status: 200, description: "Retrieve users", isArray: true, type: User })
  @ApiResponse({ status: 400, description: "Bad Request", type: MessageCodeError })
  @ApiResponse({ status: 401, description: "Unauthorized", type: MessageCodeError })
  @Get("/")
  async getAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  @ApiOperation({ title: "Retrieves user by id" })
  @ApiResponse({ status: 200, description: "Retrieve user", type: User })
  @ApiResponse({ status: 400, description: "Bad Request", type: MessageCodeError })
  @ApiResponse({ status: 401, description: "Unauthorized", type: MessageCodeError })
  @Get("/:id")
  async getUserById(@Param("id") id: number): Promise<Partial<User>> {
    return this.userRepository.findById(id).then(result => {
      return _.omit(result.dataValues, ["password"]);
    });
  }

  @ApiOperation({ title: "Updates user" })
  @ApiResponse({ status: 200, description: "Updated user", type: User })
  @ApiResponse({ status: 400, description: "Bad Request", type: MessageCodeError })
  @ApiResponse({ status: 401, description: "Unauthorized", type: MessageCodeError })
  @Put("/:id")
  async updateUser(@Param("id") id: number,
                   @Body() user: Partial<UserDto>): Promise<Partial<User>> {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 8);
    }

    return this.userRepository.update(id, user);
  }

  @ApiOperation({ title: "Uploads user image" })
  @ApiResponse({ status: 200, description: "Uploaded image" })
  @ApiResponse({ status: 400, description: "Bad Request", type: MessageCodeError })
  @ApiResponse({ status: 401, description: "Unauthorized", type: MessageCodeError })
  @Patch("/:id/image")
  async updateImage(@Param("id") id: number,
                    @Body() req: { image: string }): Promise<void> {
    cloudinary.uploader.upload(req.image, async result => {
        if (result.url) {
          return this.userRepository.update(id, { icon: result.url } as any);
        }
      },
      { public_id: String(process.env.CLOUDINARY_USER_ICONS_FOLDER) + id }
    );
  }

  @ApiOperation({title: 'Deletes user by id'})
  @ApiResponse({status: 204, description: 'Deleted user'})
  @ApiResponse({status: 400, description: 'Bad Request', type: MessageCodeError})
  @ApiResponse({status: 401, description: 'Unauthorized', type: MessageCodeError})
  @Delete("/:id")
  async deleteUser(@Param("id") id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
