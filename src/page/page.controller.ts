import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { PageModel } from "./page.model";
import { FindPageDto } from "./dto/find-page.dto";
import { ConfigService } from "@nestjs/config";

@Controller('page')
export class PageController {
  constructor(private readonly configService:ConfigService) {
  }
  @Post("create")
  async create(@Body() dto: Omit<PageModel, "_id">) {

  }

  @Get(":id")
  async get(@Param("id") id: string) {
    this.configService.get('T')
  }

  @Patch(":id")
  async patch(@Param("id") id: string, @Body() dto:PageModel) {

  }

  @Delete(":id")
  async delete(@Param("id") id: string) {

  }
  @HttpCode(200)
  @Post("find")
  async find(@Body() dto:FindPageDto){

  }
}
