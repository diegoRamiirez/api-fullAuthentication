import { ForbiddenException, Injectable, NotFoundException, Param } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async getMyUser(id: string, req: Request) {

        const user = this.prisma.user.findUnique({ where: { id } })

        if(!user){
            throw new NotFoundException();
        }

        const decodedUser = req.user as { id: string, email: string }

        if(user.id !== decodedUser.id){
            throw new ForbiddenException()
        }

        delete user.hashedPassword;

        return { user };
    }

    async getUsers() {
        return await this.prisma.user.findMany({
            select: { id: true, email: true },
        });
    }
}
