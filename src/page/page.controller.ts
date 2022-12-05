import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { ProductModel } from "../product/product.model";
import { FindProductDto } from "../product/dto/find-product.dto";
import { PageModel } from "./page.model";
import { FindPageDto } from "./dto/find-page.dto";

@Controller('page')
export class PageController {
  @Post("create")
  async create(@Body() dto: Omit<PageModel, "_id">) {

  }

  @Get(":id")
  async get(@Param("id") id: string) {

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
