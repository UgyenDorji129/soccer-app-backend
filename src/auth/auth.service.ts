import { ForbiddenException, Injectable, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './dto/auth.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(@InjectModel("User") private readonly userModel: Model<UserDto>,private jwt: JwtService){}
    async signup(
        user: RegisterDto
        ){
        
        try{
            if(await this.userModel.findOne({email: user.email}) ){
                throw new NotAcceptableException("Invlaid Credientials");
            }
            const newUser =  new this.userModel({name:user.name, password:user.password, email:user.email, isAdmin: user.isAdmin}).save();
          
              return {
                user: user,
                success: true
              };
        }
        catch(e){                       
            return  {
                message: e,
                success: false
            };
        }
    }

    async signin(email: string, isAdmin: boolean, password: string, res: Response){
        try{
            const user = await this.validateUser(email, password);
            const token = await this.signToken({
                userId: user._id.toString(),
                email: user.email,
              });
          
              if (!token) {
                throw new ForbiddenException('Could not signin');
              }
          
            res.cookie('token', token, {});
            return  res.send({
                id: token,
                success : true
            });
           }
           catch(e){
             return {
               message : e,
               success : false
             };
           }
    }

    async signout(res: Response) {
      res.clearCookie('token');
      return res.send({ message: 'Logged out succefully', succuess:true });
    }

    async getUser(){
      return this.userModel.find();
    }

    private async validateUser(email:string, password: string){
          
        const foundUser = await this.userModel.findOne({email});
        if(!foundUser){
          throw new NotFoundException("Invalid creditential")
        }
        if (await bcrypt.compare(password,foundUser.password)) {
          return foundUser;
        }
    
        else{
          throw new UnauthorizedException("Invalid Credientials");
        }
      }

      async signToken(args: { userId: string; email: string }) {
        const payload = {
          id: args.userId,
          email: args.email,
        };
    
        const token = await this.jwt.signAsync(payload, {
          secret: "secret",
        });
    
        return token;
      }
}
