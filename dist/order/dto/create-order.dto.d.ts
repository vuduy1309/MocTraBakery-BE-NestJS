export declare class CreateOrderDto {
    items: {
        productId: string;
        quantity: number;
        size?: string;
    }[];
    total: number;
    paymentMethod: string;
}
