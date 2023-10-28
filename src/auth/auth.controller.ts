import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './jwt.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("")
  sayHello(){
    return "Hello World"
  }

  @Post("signup")
    async signup(
        @Body("name") name : string,
        @Body("password") password : string,
        @Body("email") email: string,
    ){
        const hashedPassword = await bcrypt.hash(password,12);
        return await this.authService.signup({name, email, password:hashedPassword, isAdmin:false});
    }

  @Post("signin")
  async signin(
    @Body("email") email : string,
    @Body("password") password : string,
    @Body("isAdmin") isAdmin : boolean,
    @Res() res : Response
    
  ){
    try{
      return await this.authService.signin(email, isAdmin, password, res);
  }
  catch(e){
      return e;
  }
  }

  @Get('signout')
  signout( @Res() res: Response) {
    return this.authService.signout(res);
  }

  @UseGuards(JwtAuthGuard)
  @Get("user")
  getUser(){
    return this.authService.getUser();
  }
  
}
