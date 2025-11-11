import { Controller, Get } from '@nestjs/common';
import { GetAdminStatsUseCase } from '../application/admin/get-admin-stats.usecase';

@Controller('api/admin')
export class AdminController {
  constructor(private readonly getAdminStats: GetAdminStatsUseCase) {}

  @Get('stats')
  async getStats() {
    return this.getAdminStats.execute();
  }
}
