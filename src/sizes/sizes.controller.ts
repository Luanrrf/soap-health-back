import { Controller, Get } from '@nestjs/common';
import sizes from 'db/sizes.json';

@Controller('sizes')
export class SizesController {
  @Get()
  getAll() {
    return sizes;
  }
}
