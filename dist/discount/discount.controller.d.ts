import { CreateDiscountDto } from './dto/create-discount.dto';
import { FindAllDiscountsUseCase } from '../application/discount/find-all-discounts.usecase';
import { CreateDiscountUseCase } from '../application/discount/create-discount.usecase';
import { UpdateDiscountUseCase } from '../application/discount/update-discount.usecase';
import { RemoveDiscountUseCase } from '../application/discount/remove-discount.usecase';
export declare class DiscountController {
    private readonly findAllUseCase;
    private readonly createUseCase;
    private readonly updateUseCase;
    private readonly removeUseCase;
    constructor(findAllUseCase: FindAllDiscountsUseCase, createUseCase: CreateDiscountUseCase, updateUseCase: UpdateDiscountUseCase, removeUseCase: RemoveDiscountUseCase);
    findAll(): Promise<any[]>;
    findAllActive(): Promise<any[]>;
    create(createDiscountDto: CreateDiscountDto): Promise<any>;
    update(id: string, updateDiscountDto: any): Promise<any>;
    remove(id: string): Promise<any>;
}
