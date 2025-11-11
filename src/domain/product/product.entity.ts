export class ProductEntity {
  constructor(
    public id: string | undefined,
    public name: string,
    public description?: string,
    public price?: number,
    public images?: string[],
    public stock?: number,
    public isActive?: boolean,
    public categoryId?: any,
    public discountId?: any,
    public createdBy?: string,
    public createdAt?: Date,
    // additional attributes
    public shelfLifeDays?: number,
    public isRefrigerated?: boolean,
    public isVegetarian?: boolean,
    public calories?: number,
    public includedFlavors?: string[],
    public packaging?: any,
    public sizes?: any[],
    public origin?: string,
  ) {}
}
