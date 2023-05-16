/* eslint-disable @typescript-eslint/no-empty-function */
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from '../utils/constants';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

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
  async signin(dto: AuthDto) {
    const {email,password} = dto

    const foundUser = await this.prisma.user.findUnique({where: {email}})

    if(!foundUser){
      throw new BadRequestException('wrong Credentials');
    }

    const isMatch = await this.comparePasswords({password,hash: foundUser.hashedPassword});

    if(!isMatch){
      throw new BadRequestException('wrong Credentials');
    }



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
  
  async comparePasswords(args: {password:string ,hash:string}){
    return await bcrypt.compare(args.password,args.hash );
  }

  async singToken( args: {id:string, email: string}){
    const payload = args;

    this.jwt.signAsync(payload, {secret: jwtSecret})
  }
}
