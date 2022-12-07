import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { prop } from "@typegoose/typegoose";

export enum TopLevelCategory{
  Courses,
  Services,
  Books,
  Products ,
}
export interface PageModel extends Base{

}

export class HhData{
  @prop()
  count:number;
  @prop()
  juniorSalary:number;
  @prop()
  middleSalary:number;
  @prop()
  seniorSalary:number;
}
export  class PageAdvantage{
  @prop()
  title:string;
  @prop()
  description:string;
}
export class PageModel extends TimeStamps{
  @prop({enum:TopLevelCategory})
  firstCategory:TopLevelCategory;
  @prop()
  secondCategory:string;
  @prop({unique:true})
  alias:string
  @prop()
  title:string;
  @prop()
  category:string;
  @prop({type:()=>HhData})
  hh?:HhData
  @prop({type:()=>[PageAdvantage]})
  advantages:PageAdvantage[];
  @prop()
  seoText:string;
  @prop()
  tagsTitle:string;
  @prop({type:()=>[String]})
  tags?:string[]
}
