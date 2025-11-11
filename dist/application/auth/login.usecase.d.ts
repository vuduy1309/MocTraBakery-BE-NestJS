import { JwtService } from '@nestjs/jwt';
export declare class LoginUseCase {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    execute(user: any): Promise<{
        access_token: string;
        user: {
            _id: any;
            email: any;
            fullName: any;
            role: any;
            isActive: any;
        };
    }>;
}
