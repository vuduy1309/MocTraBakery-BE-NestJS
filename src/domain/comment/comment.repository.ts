export interface ICommentRepository {
  findAll(limit?: number): Promise<any[]>;
  findByProduct(productId: string): Promise<any[]>;
  create(data: any): Promise<any>;
}
