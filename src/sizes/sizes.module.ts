import { Module } from '@nestjs/common';
import { SizesController } from './sizes.controller';

@Module({
  controllers: [SizesController],
})
export class SizesModule {}
