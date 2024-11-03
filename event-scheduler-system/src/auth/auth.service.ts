import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
      private usersService: UsersService,
      private jwtService: JwtService
    ) {}
  
    async signIn(email: string, pass: string): Promise<{ access_token: string }> {
      console.log(email, pass);
      if(!email || !pass) {
        console.log('Email or password can"t be empty or null');
        throw new UnauthorizedException();
      }
      const user = await this.usersService.findByEmail(email);
      console.log(user);
      if (user?.password !== pass) {
        throw new UnauthorizedException();
      }
      const payload = { userId: user.id, email: user.email, name: user.name};
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
  }