import { User } from './../users/user.schema';
import { UserUpdateDto } from './userUpdate.dto';
import {Controller,Get,Post,Body,Param,UseGuards,Delete,Put,Req,Res} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './create-user.dto';
import {AuthGuard} from '@nestjs/passport';
  
  @Controller('register')
  export class UserController {
    constructor(private readonly userService: UserService) {}
    public jwtToken = {access_token: ''}; 
  
    @UseGuards(AuthGuard('jwt'))
    @Get('username')
    getUserByUsername(@Param() param) {
      return this.userService.getUserByUsername(param.username);
    }
    @Post()
    registerUser(@Body() createUserDto: CreateUserDto) {
      return this.userService.registerUser(createUserDto);
    }
    @Get('/get')
    readUser(){
    return this.userService.readUser()
   }

   @UseGuards(AuthGuard('jwt'))
   @Delete(':id')
    async deleteUser(@Param('id') id:String){
    return this.userService.deleteUser(id)
   }

   @UseGuards(AuthGuard('jwt'))
   @Put(':id')
    async updateUser(
    @Param('id') id:string, @Body() updateData:UserUpdateDto
    ):Promise<User>{
    return this.userService.updateUser(id,updateData)
   }
}
  