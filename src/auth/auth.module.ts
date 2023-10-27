import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    JwtModule, PassportModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthModule,AuthService],
})
export class AuthModule {}
