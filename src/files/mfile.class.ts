export class MfileClass {
  originalname: string;
  buffer: Buffer;

  constructor(file:Express.Multer.File|MfileClass) {
    this.originalname=file.originalname
    this.buffer=file.buffer
  }
}
