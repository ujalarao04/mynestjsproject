import { LoggerService } from './../users/logger.service';
import {UserService} from 'src/users/user.service';
import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {HashService} from 'src/users/hash.service';

  @Injectable()
  export class AuthService {
    constructor(private userService: UserService,
      private hashService: HashService,
      private jwtService: JwtService,
      private logger:  LoggerService) {}
  
    async validateUser(username: string, pass: string): Promise < any > {
      const user = await this.userService.getUserByUsername(username);
      if (user && (await this.hashService.comparePassword(pass, user.password))) {
        return user;
      }
      return null;
    }
  
    async login(user: any) {
      const payload = {
        username: user.email,
        sub: user.id
      };
      //log  to database
        this.logger.log({
        user_id: user.id,
        user_activity: "login",
        created_at:new Date()})

      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }