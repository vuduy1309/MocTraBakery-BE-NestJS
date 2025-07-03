export declare class CreateOrderDto {
    items: {
        productId: string;
        quantity: number;
        size?: string;
        name: string;
        price: number;
        discountPercent?: number;
        priceAfterDiscount?: number;
    }[];
    total: number;
    paymentMethod: string;
    address: string;
    phone: string;
    note?: string;
    deliveryTime: string;
}
