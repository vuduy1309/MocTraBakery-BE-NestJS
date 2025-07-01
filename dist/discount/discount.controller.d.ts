import { CreateDiscountDto } from './dto/create-discount.dto';
import { DiscountService } from './discount.service';
export declare class DiscountController {
    private readonly discountService;
    constructor(discountService: DiscountService);
    findAll(): Promise<any[]>;
    create(createDiscountDto: CreateDiscountDto): Promise<any>;
    update(id: string, updateDiscountDto: any): Promise<any>;
    remove(id: string): Promise<any>;
}
