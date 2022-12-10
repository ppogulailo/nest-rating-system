import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { PageModel, TopLevelCategory } from './page.model';
import { CreatePageDto } from './dto/create-page.dto';

@Injectable()
export class PageService {
  constructor(
    @InjectModel(PageModel) private readonly pageModel: ModelType<PageModel>,
  ) {}

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
    return this.pageModel.findOne({ alias }).exec();
  }

  async findByCategories(categories: TopLevelCategory) {
    return this.pageModel
      .aggregate([
        {
          $match: { categories },
        },
        {
          $group: {
            _id: { secondCategory: '$secondCategory' },
            pages: { $push: { alias: '$alias', title: '$title' } },
          },
        },
      ])
      .exec();
  }

  async findByText(text) {
    return this.pageModel
      .find({ $text: { $search: text, $caseSensitive: false } })
      .exec();
  }
  async findAll() {
    return this.pageModel.find({}).exec();
  }
  async updateById(id: string, dto: CreatePageDto) {
    return this.pageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }
}
