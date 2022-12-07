import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypegooseModule } from "nestjs-typegoose";
import { AuthModel } from "./auth.model";

@Module({
  controllers: [AuthController],
  imports:[
    TypegooseModule.forFeature([{
      typegooseClass:AuthModel,
      schemaOptions:{
          collection:'Auth'
      }
    }])
  ]

})
export class AuthModule {}
