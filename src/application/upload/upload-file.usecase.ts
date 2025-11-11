import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { IUploadRepository } from '../../domain/upload/upload.repository';

@Injectable()
export class UploadFileUseCase {
  constructor(@Inject('IUploadRepository') private uploadRepo: IUploadRepository) {}

  async execute(file: any) {
    if (!file) throw new BadRequestException('Không nhận được file');
    return this.uploadRepo.saveFile(file);
  }
}
