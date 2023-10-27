import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot('mongodb+srv://ugyendora:JnYdWkWTXxYIymEs@cluster0.iq6nlmm.mongodb.net/?retryWrites=true&w=majority'),
  ]
})
export class AppModule {}
