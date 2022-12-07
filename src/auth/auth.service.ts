import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthDto } from "./dto/auth.dto";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { UserModel } from "./user.model";
import { InjectModel } from 'nestjs-typegoose';
import { genSalt, hash, compare}from 'bcryptjs'
import { USER_NOT_FOUND, USER_WRONG_PASSWORD } from "./auth.constants";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly userModel:ModelType<UserModel>,
    private readonly jwtService:JwtService
  ) {
  }
  // No correct by architecture but we only have admin authorization:)
  async createUser(dto:AuthDto){
    const salt=await genSalt(10);
    const newUser = new this.userModel({
      email:dto.login,
      passwordHash: await hash(dto.password,salt)
    });
    return newUser.save();
  }
  async findUser(email:string){
      return this.userModel.findOne({email}).exec()
  }
  async validateUser(email:string,password:string):Promise<Pick<UserModel,'email'>>{
      const user=await this.findUser(email);
      if (!user){
        throw new UnauthorizedException(USER_NOT_FOUND);
      }
      const isCorrectPassword = await compare(password,user.passwordHash);
      if (!isCorrectPassword){
        throw new UnauthorizedException(USER_WRONG_PASSWORD);
      }
      return {email:user.email}
  }
  async login(email:string){
    const payload = {email}
    return{
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}
