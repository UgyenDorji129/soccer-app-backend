import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';


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
        return await this.authService.signup({name, email, password:hashedPassword});
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
  
}
