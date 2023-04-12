import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor() {}

    async signup() {
        return { message : 'signup was succefull' };
}
    async signin() {
        return '';
    }
    async signout() {
        return '';
    }
}
