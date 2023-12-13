import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { PermissionGuard, RoleGuard } from './common/guard';
import { Permissions, Roles } from './common/decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('aaa')
  @UseGuards(RoleGuard)
  @Roles('admin')
  aaa(): string {
    return 'aaa';
  }

  @Get('bbb')
  @UseGuards(PermissionGuard)
  @Permissions('view')
  bbb(): string {
    return 'bbb';
  }
}
