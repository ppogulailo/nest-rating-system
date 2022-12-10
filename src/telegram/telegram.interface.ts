import { ModuleMetadata } from '@nestjs/common';

export interface ITelegramInterface {
  chatId: string;
  token: string;
}

export interface ITelegramModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (
    ...args: any[]
  ) => Promise<ITelegramInterface> | ITelegramInterface;
  inject?: any[];
}
