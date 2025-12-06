import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  checkStatus() {
    return { status: 'ok' };
  }
}
