import { UploadFileUseCase } from '../application/upload/upload-file.usecase';
export declare class UploadController {
    private readonly uploadFileUseCase;
    constructor(uploadFileUseCase: UploadFileUseCase);
    uploadFile(file: any): Promise<{
        url: string;
        filename: string;
        originalname: string;
    }>;
}
