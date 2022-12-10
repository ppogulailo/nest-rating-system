import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';
export interface ReviewModel extends Base {}

export class ReviewModel extends TimeStamps {
  @prop()
  name: string;
  @prop()
  title: string;
  @prop()
  description: string;
  @prop()
  rating: string;

  @prop()
  productId: Types.ObjectId;
}
