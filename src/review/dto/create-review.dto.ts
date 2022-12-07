import { IsString, IsNumber, Max, Min } from "class-validator";

export class CreateReviewDto{
  @IsString()
  name: string;
  @IsString()
  title: string;
  @IsString()
  description: string;
  @Max(5,{message:'Rating must not be big than 5'})
  @Min(1,{message:'Rating must not be less than 1'})
  @IsNumber()
  rating: number;
  @IsString()
  productId:string;
}
