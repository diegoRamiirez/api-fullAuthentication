import { Injectable, Param } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async getMyUser(id: string) {

    }

    async getUsers() {
        return await this.prisma.user.findMany({
            select: { id: true, email: true },
        });
    }
}
