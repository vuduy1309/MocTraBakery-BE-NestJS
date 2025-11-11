export interface IDiscountRepository {
  findAll(): Promise<any[]>;
  findAllActive(): Promise<any[]>;
  create(data: any): Promise<any>;
  update(id: string, data: any): Promise<any | null>;
  remove(id: string): Promise<any | null>;
  findById(id: string): Promise<any | null>;
}
