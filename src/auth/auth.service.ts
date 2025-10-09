import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly JwtService: JwtService,
        private readonly prisma: PrismaService
    ) { }

    async createToken() {
        // return this.JwtService.sign();
    }

    async checkToken(token: string) {
        return this.JwtService.verify(token);
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findFirst({
            where: { email, password }
        })

        if (!user) {
            throw new UnauthorizedException('Email ou senha incorretos.')
        }

        return user;
    }

    async forget(email: string) {
        const user = await this.prisma.user.findFirst({
            where: { email }
        })

        if (!user) throw new UnauthorizedException('Email não encontrado.')

        //TO DO: enviar email
        return !!user;
    }

    async reset(password: string, token: string) {
        //TO DO: validar token
        const id = 0;

        await this.prisma.user.update({
            where: { id },
            data: { password }
        })

        return true;
    }
}