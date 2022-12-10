import { TopLevelCategory } from '../page.model';
import { IsEnum } from 'class-validator';

export class FindPageDto {
  @IsEnum(TopLevelCategory)
  firstCategory: TopLevelCategory;
}
