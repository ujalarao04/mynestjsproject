import { UserLog,UserLogSchema } from './../users/user_log.schema';
import { LoggerService } from './../users/logger.service';
import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {User,UserSchema} from 'src/users/user.schema';
import {JwtModule} from '@nestjs/jwt';
import {jwtConstants} from 'src/strategy/constants';
import {UserService} from 'src/users/user.service';
import {HashService} from 'src/users/hash.service';
import {LocalStrategy} from 'src/strategy/local.strategy';
  
  @Module({
    imports: [
     MongooseModule.forFeature([{
        name: User.name,
        schema: UserSchema

      },{
        name: UserLog.name,
        schema: UserLogSchema 
      }]),

     JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: {
          expiresIn: '1000s'
        },
      }),
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService, LocalStrategy, HashService,LoggerService],
  })
  export class AuthModule {}

  