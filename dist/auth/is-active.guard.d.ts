import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IUserRepository } from '../domain/user/user.repository';
export declare class IsActiveGuard implements CanActivate {
    private readonly userRepository;
    private readonly reflector;
    constructor(userRepository: IUserRepository, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
