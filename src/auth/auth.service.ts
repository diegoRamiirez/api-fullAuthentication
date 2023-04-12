/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}

  async signup() {
    return { message: 'signup was succefull' };
  }
  async signin() {
    return '';
  }
  async signout() {
    return '';
  }
}
