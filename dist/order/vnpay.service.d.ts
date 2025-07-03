export declare class VnpayService {
    vnp_TmnCode: string;
    vnp_HashSecret: string;
    vnp_Url: string;
    vnp_ReturnUrl: string;
    createPaymentUrl(order: any, clientIp: string): Promise<any>;
    verifyReturn(query: any): boolean;
    parseReturnData(query: any): {
        orderId: any;
        amount: any;
        responseCode: any;
        transactionNo: any;
        bankCode: any;
        payDate: any;
        orderInfo: any;
        isSuccess: boolean;
        message: string;
    };
    private getResponseMessage;
    testHashGeneration(): {
        signData: string;
        hash: string;
    };
}
