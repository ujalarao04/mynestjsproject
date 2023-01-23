import {AuthService} from './auth.service';
  import {Controller,Req,UseGuards,Post} from '@nestjs/common';
  import {AuthGuard} from '@nestjs/passport';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
    
    @UseGuards(AuthGuard('local'))
    @Post(`/login`)
    async login(@Req() req) {
      return this.authService.login(req.user);
    }
}