import {IsDefined, IsEmail, IsInt, IsOptional, IsString, Min} from "class-validator";

export class User {

    @IsOptional()
    public id: number;

    @IsDefined()
    @IsEmail()
    public email: string;

    @IsDefined()
    @IsString()
    public name: string;


    @IsDefined()
    @IsString()
    public password: string;

    @IsOptional()
    @IsString()
    public icon: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    public score: number;

    @IsOptional()
    @IsInt()
    @Min(1)
    public rankId: number;

    constructor(id: number, email: string, name: string, password: string, icon: string, score: number, rankId: number) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password;
        this.icon = icon;
        this.score = score;
        this.rankId = rankId;
    }

    toString(): string {
        return JSON.stringify(this);
    }

}
