import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { LocalUploadRepository } from '../infrastructure/upload/local-upload.repository';
import { UploadFileUseCase } from '../application/upload/upload-file.usecase';

@Module({
  controllers: [UploadController],
  providers: [
    LocalUploadRepository,
    { provide: 'IUploadRepository', useClass: LocalUploadRepository },
    UploadFileUseCase,
  ],
  exports: [UploadFileUseCase],
})
export class UploadModule {}
