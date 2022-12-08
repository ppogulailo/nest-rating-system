import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes, ValidationPipe
} from "@nestjs/common";
import { FindPageDto } from "./dto/find-page.dto";
import { PageService } from "./page.service";
import { CreatePageDto } from "./dto/create-page.dto";
import { PAGE_NOT_FOUND } from "./page.constant";

@Controller("page")
export class PageController {
  constructor(private readonly pageService: PageService) {
  }

  @Post("create")
  async create(@Body() dto: CreatePageDto) {
    return this.pageService.create(dto);
  }

  @Get(":id")
  async get(@Param("id") id: string) {
    const page = await this.pageService.findById(id);
    if (!page) {
      throw  new NotFoundException(PAGE_NOT_FOUND);
    }
    return page;
  }

  @Get("byAlias/:alias")
  async getByAlias(@Param("id") alias: string) {
    const page = await this.pageService.findByAlias(alias);
    if (!page) {
      throw  new NotFoundException(PAGE_NOT_FOUND);
    }
    return page;
  }

  @Patch(":id")
  async patch(@Param("id") id: string, @Body() dto: CreatePageDto) {
    const page = await this.pageService.updateById(id, dto);
    if (!page) {
      throw  new NotFoundException(PAGE_NOT_FOUND);
    }
    return page;
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    const page = await this.pageService.delete(id);
    if (!page) {
      throw  new NotFoundException(PAGE_NOT_FOUND);
    }
    return page;
  }


  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post("find")
  async find(@Body() dto: FindPageDto) {
    return this.pageService.findWithReviews(dto);
  }
}
