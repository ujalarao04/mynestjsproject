import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { UserSchema } from './users/user.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://ujalarao:urmilabalwant@cluster0.oshajvc.mongodb.net/techstack?retryWrites=true&w=majority'),
  MongooseModule.forFeature([{name:'user',schema:UserSchema}]),
  //MongooseModule.forFeature([{name:'userhistory',schema:UserSchema}]),
  UserModule,
  AuthModule
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
