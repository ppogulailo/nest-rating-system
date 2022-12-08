import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ReviewModel } from "./review.model";
import { CreateReviewDto } from "./dto/create-review.dto";
import { ReviewService } from "./review.service";
import { REVIEW_NOT_FOUND } from "./review.constant";
import { JwtGuard } from "../auth/guards/jwt.guard";
import { UserEmailDecorator } from "../decorators/user-email.decorator";
import { IdValidationPipe } from "../pipes/id-validation.pipe";


@Controller("review")
export class ReviewController {
  constructor(private readonly reviewService:ReviewService) {}

  @UsePipes(new ValidationPipe())
  @Post("create")
  async create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto)
  }

  @Delete(":id")
  async delete(@Param("id",IdValidationPipe) id: string) {
    const deletedDoc = await this.reviewService.delete(id);
    if (!deletedDoc){
      throw new HttpException(REVIEW_NOT_FOUND,HttpStatus.NOT_FOUND)
    }
  }
  @UseGuards(JwtGuard)
  @Get('byProduct/:productID')
  async get(@Param('productID',IdValidationPipe)productID:string,@UserEmailDecorator() email:string){
    console.log(email)
    return this.reviewService.findByProductId(productID)
  }
}
