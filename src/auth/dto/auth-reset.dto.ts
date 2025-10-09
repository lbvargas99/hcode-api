import { IsEmail, IsJWT, MinLength } from "class-validator";

export class AuthResetDTO {
    @IsEmail()
    @MinLength(6)
    password: string;

    @IsJWT()
    token: string;
}