import { IUploadRepository } from '../../domain/upload/upload.repository';
export declare class UploadFileUseCase {
    private uploadRepo;
    constructor(uploadRepo: IUploadRepository);
    execute(file: any): Promise<{
        url: string;
        filename: string;
        originalname: string;
    }>;
}
