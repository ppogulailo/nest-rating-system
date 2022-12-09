import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export enum TopLevelCategory{
  Courses,
  Services,
  Books,
  Products ,
}
export class HhDataDto{
  @IsNumber()
  count:number;
  @IsNumber()
  juniorSalary:number;
  @IsNumber()
  middleSalary:number;
  @IsNumber()
  seniorSalary:number;
}
export  class PageAdvantageDto{
  @IsString()
  title:string;
  @IsString()
  description:string;
}
export class CreatePageDto{

  @IsEnum(TopLevelCategory)
  firstCategory:TopLevelCategory;

  @IsString()
  secondCategory:string;

  @IsString()
  alias:string

  @IsString()
  title:string;

  @IsString()
  category:string;

  @IsOptional()
  @ValidateNested()
  @Type(()=>HhDataDto)
  hh?:HhDataDto

  @IsArray()
  @ValidateNested()
  @Type(()=>PageAdvantageDto)
  advantages:PageAdvantageDto[];

  @IsString()
  seoText:string;

  @IsString()
  tagsTitle:string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?:string[]
}
