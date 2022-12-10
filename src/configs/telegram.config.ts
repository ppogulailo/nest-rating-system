import { ITelegramInterface } from "../telegram/telegram.interface";
import { ConfigService } from "@nestjs/config";

export const getTelegramConfig = (configService: ConfigService): ITelegramInterface => {
  const token = configService.get("TELEGRAM_TOKEN");
  if (!token) {
    throw new Error("TELEGRAM TOKEN not found")
  }
  return {
    token,
    chatId: configService.get("CHAT_ID")??''
  };
};
