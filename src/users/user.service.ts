import {Injectable,BadRequestException} from '@nestjs/common';
import {CreateUserDto} from './create-user.dto';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {HashService} from './hash.service';
import {User,UserDocument} from './user.schema';
import { LoggerService } from './../users/logger.service';
  
  @Injectable()
  export class UserService {
  
  constructor(@InjectModel(User.name) private userModel: Model < UserDocument > , 
  private hashService: HashService,
   private logger:  LoggerService) {}
  
    async getUserByUsername(username: string) {
      return this.userModel.findOne({username}).exec();
    }
  
    async registerUser(createUserDto: CreateUserDto) {
      // validate DTO
  
      const createUser = new this.userModel(createUserDto);
      // check if user exists
      const user = await this.getUserByUsername(createUser.username);
      if (user) {
        throw new BadRequestException();
      }
      // Hash Password
      createUser.password = await this.hashService.hashPassword(createUser.password);
  
      return createUser.save();
    }
   //read user collection
    async readUser(){
      return this.userModel.find({})
       .then((user)=>{return user})
       .catch((err)=>console.log(err)) 
      }

      //deleting the data

    async deleteUser(id){
      return this.userModel.findByIdAndRemove(id)
    }

    //upadating the data

    async updateUser(id,data):Promise<User>{
      //log details to databse
      this.logger.log({
        user_id:id,
        user_activity: "update",
        created_at:new Date()
      })
      return this.userModel.findByIdAndUpdate(id,data,{new:true})
    }
  }