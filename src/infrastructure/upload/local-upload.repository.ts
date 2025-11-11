import { Injectable } from '@nestjs/common';
import * as path from 'path';

import { IUploadRepository } from '../../domain/upload/upload.repository';

@Injectable()
export class LocalUploadRepository implements IUploadRepository {
  async saveFile(
    file: any,
  ): Promise<{ url: string; filename: string; originalname: string }> {
    // The controller uses multer diskStorage to save files into ./uploads
    // Here we just build a canonical URL/path response; in future this adapter
    // could push files to S3, CDN, etc.
    const filename = file.filename || path.basename(file.path || file.filename);
    const url = `/uploads/${filename}`;
    return { url, filename, originalname: file.originalname };
  }
}
