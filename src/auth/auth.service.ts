/* eslint-disable @typescript-eslint/no-empty-function */
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto:AuthDto) {
    const { email , password } = dto;

    const foundUser = await this.prisma.user.findUnique({where: {email}})

    if(foundUser){
      throw new BadRequestException('Email already exists');
    }

    const hashPassword = await this.hashPassword(password)

    await this.prisma.user.create({
      data: {
        email,
        hashPassword
      }
    });

    return { message: 'signup was succefull' };
  }
  async signin() {
    return '';
  }
  async signout() {
    return '';
  }

  async hashPassword(password:string) {
    const saltOrRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    return hashedPassword;

  }
}
