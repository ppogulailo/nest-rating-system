import { Injectable } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { ProductModel } from "../product/product.model";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { PageModel } from "./page.model";
import { CreateProductDto } from "../product/dto/create-product.dto";
import { CreatePageDto } from "./dto/create-page.dto";
import { ReviewModel } from "../review/review.model";
import { FindPageDto } from "./dto/find-page.dto";

@Injectable()
export class PageService {
  constructor(@InjectModel(PageModel) private readonly pageModel: ModelType<PageModel>) {
  }

  async create(dto: CreatePageDto) {
    return this.pageModel.create(dto);
  }

  async delete(id: string) {
    return this.pageModel.findByIdAndDelete(id).exec();
  }

  async findById(id: string) {
    return this.pageModel.findById(id).exec();
  }
  async findByAlias(alias: string) {
    return this.pageModel.findOne({alias}).exec();
  }
  async updateById(id: string,dto:CreatePageDto) {
    return this.pageModel.findByIdAndUpdate(id,dto,{new:true}).exec();
  }

  async findWithReviews(dto: FindPageDto) {
    return await this.pageModel.aggregate().exec() as (ProductModel &{review:ReviewModel[],reviewCount:number,reviewAvg:number})[];
  }
}
