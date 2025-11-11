export interface ICartRepository {
  findByUserId(userId: string): Promise<any | null>;
  create(data: any): Promise<any>;
  updateById(id: string, update: any, opts?: any): Promise<any | null>;
  updateOne(filter: any, update: any): Promise<any>;
  deleteOne(filter: any): Promise<any>;
}
