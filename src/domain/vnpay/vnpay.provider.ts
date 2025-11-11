export interface IVnpayProvider {
  createPaymentUrl(order: any, clientIp: string): Promise<any>;
  verifyReturn(query: any): boolean;
  parseReturnData(query: any): any;
}
