import { Body, Controller, HttpException, HttpStatus, Logger, Post } from "@nestjs/common";
import { UserRepository } from "../../repository/user/user.repository";
import { ApiImplicitBody, ApiModelProperty, ApiOperation, ApiResponse, ApiUseTags } from "@nestjs/swagger";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import * as _ from "lodash";
import { User } from "../../entity/user.entity";
import { IsDefined, IsEmail, IsString, Length } from "class-validator";
import { Dto } from "nestjs-extensions";
import { UserDto } from "../../model/user.model";
import { MessageCodeError } from "../../config/error";

@Dto()
export class SignInRequest {

  @IsDefined()
  @IsString()
  @Length(2, 50)
  @ApiModelProperty()
  name: string;

  @IsDefined()
  @IsString()
  @Length(6, 50)
  @ApiModelProperty()
  password: string;
}

@Dto()
export class SignUpRequest {
  @IsDefined()
  @IsEmail()
  @ApiModelProperty()
  email: string;

  @IsDefined()
  @IsString()
  @Length(2, 50)
  @ApiModelProperty()
  username: string;

  @IsDefined()
  @IsString()
  @Length(2, 50)
  @ApiModelProperty()
  password: string;
}

export class AuthResponse {
  @ApiModelProperty()
  token: string;

  @ApiModelProperty({ type: UserDto })
  user: Partial<UserDto>;
}

@ApiUseTags("auth")
@Controller("/api/auth")
export class AuthController {
  private readonly ROBOHASH_URL = "https://robohash.org/";
  private readonly logger = new Logger("http");

  constructor(private readonly userRepository: UserRepository) {
  }

  @ApiOperation({ title: "Sign-ins as an existing user" })
  @ApiImplicitBody(SignInRequest)
  @ApiResponse({ status: 200, description: "User details and token", type: AuthResponse })
  @ApiResponse({ status: 400, description: "Bad Request", type: MessageCodeError })
  @ApiResponse({ status: 401, description: "Unauthorized", type: MessageCodeError })
  @Post("/signin")
  async signIn(@Body() req: SignInRequest): Promise<AuthResponse> {
    const user = await this.userRepository.findByEmailOrName(
      req.name,
      req.name
    );

    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    } else if (bcrypt.compareSync(req.password, user.password)) {
      const token = jwt.sign(
        { id: user.id, name: user.name },
        String(process.env.JWT_SECRET),
        {
          expiresIn: String(process.env.JWT_EXPIRES)
        }
      );

      return { token, user: _.pick(user, ["id", "name", "email"]) };
    } else {
      throw new HttpException("Incorrect password", HttpStatus.FORBIDDEN);
    }
  }

  @ApiOperation({ title: "Creates new user" })
  @ApiImplicitBody(SignUpRequest)
  @ApiResponse({ status: 201, description: "User details and token", type: AuthResponse })
  @ApiResponse({ status: 400, description: "Bad Request", type: MessageCodeError })
  @ApiResponse({ status: 401, description: "Unauthorized", type: MessageCodeError })
  @Post("/signup")
  async signUp(@Body() req: SignUpRequest): Promise<AuthResponse> {
    const searchResult = await this.userRepository.findByEmailOrName(
      req.email,
      req.username
    );

    if (searchResult) {
      throw new HttpException("User Already Exists", HttpStatus.CONFLICT);
    } else {
      const user = await this.userRepository.add({
        email: req.email,
        name: req.username,
        password: await bcrypt.hash(req.password, 8),
        icon: this.ROBOHASH_URL + req.username
      } as User);

      const token = jwt.sign({ id: user.id, name: user.name }, String(process.env.JWT_SECRET), {
          expiresIn: String(process.env.JWT_EXPIRES)
        }
      );

      return { token, user: _.pick(user, ["id", "name", "email"]) };
    }
  }
}
