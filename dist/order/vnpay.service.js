"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VnpayService = void 0;
const common_1 = require("@nestjs/common");
const { VNPay, ProductCode, VnpLocale, ignoreLogger } = require('vnpay');
const dayjs = require('dayjs');
let VnpayService = class VnpayService {
    vnp_TmnCode = process.env.VNP_TMNCODE || 'CHOECU21';
    vnp_HashSecret = process.env.VNP_HASHSECRET || '6KMM18JSCQI1BE63KD9TK0FOJGFRICS1';
    vnp_Url = process.env.VNP_URL || 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
    vnp_ReturnUrl = process.env.VNP_RETURNURL || 'http://localhost:3000/orders/vnpay-return';
    async createPaymentUrl(order, clientIp) {
        const now = new Date();
        const expire = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        const orderId = order._id.toString();
        const amount = Math.round(order.total);
        let processedIp = clientIp;
        if (clientIp === '::1' || clientIp === '::ffff:127.0.0.1') {
            processedIp = '127.0.0.1';
        }
        else if (clientIp.startsWith('::ffff:')) {
            processedIp = clientIp.substring(7);
        }
        const vnpay = new VNPay({
            tmnCode: this.vnp_TmnCode,
            secureSecret: this.vnp_HashSecret,
            vnpayHost: 'https://sandbox.vnpayment.vn',
            testMode: true,
            hashAlgorithm: 'SHA512',
            logger: ignoreLogger,
        });
        const vnpayResponse = await vnpay.buildPaymentUrl({
            vnp_Amount: amount,
            vnp_IpAddr: processedIp,
            vnp_TxnRef: orderId,
            vnp_OrderInfo: `Thanh toan don hang ${orderId}`,
            vnp_OrderType: ProductCode.Other,
            vnp_ReturnUrl: this.vnp_ReturnUrl,
            vnp_Locale: VnpLocale.VN,
            vnp_CreateDate: dayjs(now).format('YYYYMMDDHHmmss'),
            vnp_ExpireDate: dayjs(expire).format('YYYYMMDDHHmmss'),
        });
        return vnpayResponse;
    }
    verifyReturn(query) {
        const { vnp_SecureHash, ...params } = query;
        if (!vnp_SecureHash) {
            console.log('Missing vnp_SecureHash');
            return false;
        }
        const cleanedParams = Object.fromEntries(Object.entries(params).filter(([_, value]) => value !== null && value !== undefined && value !== ''));
        const sortedKeys = Object.keys(cleanedParams).sort();
        const sorted = {};
        sortedKeys.forEach(key => {
            sorted[key] = cleanedParams[key];
        });
        const signDataParts = [];
        Object.keys(sorted).forEach(key => {
            signDataParts.push(`${key}=${sorted[key]}`);
        });
        const signData = signDataParts.join('&');
        console.log('Verify Sign Data:', signData);
        console.log('Received Hash:', vnp_SecureHash);
        return true;
    }
    parseReturnData(query) {
        return {
            orderId: query.vnp_TxnRef,
            amount: query.vnp_Amount,
            responseCode: query.vnp_ResponseCode,
            transactionNo: query.vnp_TransactionNo,
            bankCode: query.vnp_BankCode,
            payDate: query.vnp_PayDate,
            orderInfo: query.vnp_OrderInfo,
            isSuccess: query.vnp_ResponseCode === '00',
            message: this.getResponseMessage(query.vnp_ResponseCode)
        };
    }
    getResponseMessage(responseCode) {
        const messages = {
            '00': 'Giao dịch thành công',
            '07': 'Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).',
            '09': 'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.',
            '10': 'Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần',
            '11': 'Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.',
            '12': 'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.',
            '13': 'Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP).',
            '24': 'Giao dịch không thành công do: Khách hàng hủy giao dịch',
            '51': 'Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.',
            '65': 'Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.',
            '75': 'Ngân hàng thanh toán đang bảo trì.',
            '79': 'Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định.',
            '99': 'Các lỗi khác (lỗi còn lại, không có trong danh sách mã lỗi đã liệt kê)'
        };
        return messages[responseCode] || 'Lỗi không xác định';
    }
    testHashGeneration() {
        const testParams = {
            vnp_Amount: '21600000',
            vnp_Command: 'pay',
            vnp_CreateDate: '20250701152209',
            vnp_CurrCode: 'VND',
            vnp_IpAddr: '127.0.0.1',
            vnp_Locale: 'vn',
            vnp_OrderInfo: 'Thanh toan don hang 6863fd21ebd5bee667c67910',
            vnp_OrderType: 'other',
            vnp_ReturnUrl: 'http://localhost:3000/api/orders/vnpay-return',
            vnp_TmnCode: 'CHOECU21',
            vnp_TxnRef: '6863fd21ebd5bee667c67910',
            vnp_Version: '2.1.0'
        };
        const sortedKeys = Object.keys(testParams).sort();
        const signDataParts = [];
        sortedKeys.forEach(key => {
            signDataParts.push(`${key}=${testParams[key]}`);
        });
        const signData = signDataParts.join('&');
        console.log('Test Sign Data:', signData);
        return { signData: signData, hash: 'Not used' };
    }
};
exports.VnpayService = VnpayService;
exports.VnpayService = VnpayService = __decorate([
    (0, common_1.Injectable)()
], VnpayService);
//# sourceMappingURL=vnpay.service.js.map