import { Module } from '@nestjs/common';
import { SitemapController } from './sitemap.controller';
import { PageModule } from "../page/page.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports:[PageModule,ConfigModule],
  controllers: [SitemapController]
})
export class SitemapModule {}
