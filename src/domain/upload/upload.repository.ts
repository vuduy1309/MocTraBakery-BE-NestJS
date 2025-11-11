export interface IUploadRepository {
  /**
   * Accepts the multer-saved file object and returns a canonical file info (url, filename, originalname)
   */
  saveFile(file: any): Promise<{ url: string; filename: string; originalname: string }>;
}
