export interface IUploadRepository {
    saveFile(file: any): Promise<{
        url: string;
        filename: string;
        originalname: string;
    }>;
}
