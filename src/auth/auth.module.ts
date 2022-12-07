import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypegooseModule } from "nestjs-typegoose";
import { UserModel } from "./user.model";
import { AuthService } from './auth.service';
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { getJWTConfig } from "../configs/jwt.config";

@Module({
  controllers: [AuthController],
  imports:[
    TypegooseModule.forFeature([{
      typegooseClass:UserModel,
      schemaOptions:{
          collection:'User'
      }
    }]),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:getJWTConfig,
    })
  ],
  providers: [AuthService]

})
export class AuthModule {}
