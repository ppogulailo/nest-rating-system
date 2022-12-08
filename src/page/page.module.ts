import { Module } from '@nestjs/common';
import { PageController } from './page.controller';
import { TypegooseModule } from "nestjs-typegoose";
import { PageModel } from "./page.model";
import { ProductService } from "../product/product.service";
import { PageService } from './page.service';

@Module({
  controllers: [PageController],
  imports:[
    TypegooseModule.forFeature([{
      typegooseClass:PageModel,
      schemaOptions:{
        collection:'Page'
      }
    }])
  ],
  providers: [PageService],
  // providers: [PageSe]
})
export class PageModule {}
