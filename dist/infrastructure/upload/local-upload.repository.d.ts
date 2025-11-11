import { IUploadRepository } from '../../domain/upload/upload.repository';
export declare class LocalUploadRepository implements IUploadRepository {
    saveFile(file: any): Promise<{
        url: string;
        filename: string;
        originalname: string;
    }>;
}
