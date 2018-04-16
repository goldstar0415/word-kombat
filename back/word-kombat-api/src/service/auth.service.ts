import * as jwt from 'jsonwebtoken';
import {Component} from '@nestjs/common';
import {UserRepository} from "../repository/user/user.repository";
import {MessageCodeError} from "../config/error";

@Component()
export class AuthService {

    constructor(private readonly userRepository: UserRepository) {
    }

    private _options = {
        algorithm: 'HS256',
        expiresIn: '2 days',
    };

    get options() {
        return this._options;
    }

    set options(value: any) {
        this._options.algorithm = value.algorithm;
    }

    async sign(credentials: { email: string, password: string }): Promise<string> {
        const user = await this.userRepository.findByEmail(credentials.email);
        if (!user) throw new MessageCodeError('user:notFound');
        const payload = { id: user.id };
        return await jwt.sign(payload, process.env.JWT_KEY || '', this._options);
    }
}
