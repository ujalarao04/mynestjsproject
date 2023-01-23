import {AuthService} from './auth.service';
  import {
    Controller,
    Req,
    UseGuards,
    Post,
    Res,
    Get  
  } from '@nestjs/common';
  import {
    AuthGuard
  } from '@nestjs/passport';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
    
    @UseGuards(AuthGuard('local'))
    @Post(`/login`)
    async login(@Req() req) {
      return this.authService.login(req.user);
    }

    // @Get('logout')
    // async logout(@Req() req, @Res() res) {
    // const jwt = await this.authService.login('');
    // this.jwtToken = jwt;
    //  return 'successfully logout'
    //}

    //    @Get('/logout')
    //     logout(@Req() req): any {
    //       req.session.destroy();
    //       return { msg: 'The user session has ended' }
    //     }
  }