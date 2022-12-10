import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<TypegooseModuleOptions> => {
  return {
    uri: getMongoString(configService),
    ...getMongoOptions(),
  };
};
const getMongoString = (configService: ConfigService) =>
  // "mongodb://" +
  // configService.get("MONGO_LOGIN") +
  // ":" +
  // configService.get("MONGO_PASSWORD") +
  // "@" +
  // configService.get("MONGO_HOST") +
  // ":" +
  // configService.get("MONGO_PORT") +
  // "/" +
  // configService.get("MONGO_AUTH_DATABASE");
  'mongodb+srv://Pogun:diqGvhr2@cluster0.c3tqnta.mongodb.net/?retryWrites=true&w=majority';

const getMongoOptions = () => ({
  useNewUrlParser: true,
  // useCreateIndex:true,
  useUnifiedTopology: true,
});
