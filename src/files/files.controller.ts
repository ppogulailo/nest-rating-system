import { Controller, HttpCode, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { FileResponseElementResponse } from "./dto/file-response-element.response";
import { FilesService } from "./files.service";
import { MfileClass } from "./mfile.class";


@Controller("files")
export class FilesController {
  constructor(private readonly fileService: FilesService) {
  }

  @Post("upload")
  @HttpCode(200)
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor("files"))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<FileResponseElementResponse[]> {
    const saveArray: MfileClass[] = [new MfileClass(file)];
    if (file.mimetype.includes("image")) {
      const buffer = await this.fileService.convertToWebP(file.buffer);
      saveArray.push(new MfileClass({
        originalname: `${file.originalname.split('.')[0]}.webp`,
        buffer
      }));
    }
    return this.fileService.saveFiles([]);
  }
}
