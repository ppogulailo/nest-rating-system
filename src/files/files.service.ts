import { Injectable } from '@nestjs/common';
import { FileResponseElementResponse } from './dto/file-response-element.response';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import * as sharp from 'sharp';
import { MfileClass } from './mfile.class';

@Injectable()
export class FilesService {
  async saveFiles(files: MfileClass[]): Promise<FileResponseElementResponse[]> {
    const dateFolder = format(new Date(), 'yyy-MM-dd');
    const uploadFolder = `${path}/uploads/${dateFolder}`;
    await ensureDir(uploadFolder);
    const res: FileResponseElementResponse[] = [];
    for (const file of files) {
      await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
      res.push({
        url: `${dateFolder}/${file.originalname}`,
        name: file.originalname,
      });
    }
    return res;
  }

  convertToWebP(file: Buffer): Promise<Buffer> {
    return sharp(file).webp().toBuffer();
  }
}
