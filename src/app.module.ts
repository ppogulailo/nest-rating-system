import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { PageModule } from "./page/page.module";
import { ProductModule } from "./product/product.module";
import { ReviewModule } from "./review/review.module";
import { TypegooseModule } from "nestjs-typegoose";
import { getMongoConfig } from "./configs/mongo.config";
import { FilesModule } from './files/files.module';

import { SitemapModule } from './sitemap/sitemap.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig
    }),
    AuthModule,
    PageModule,
    ProductModule,
    ReviewModule,
    FilesModule,
    SitemapModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
