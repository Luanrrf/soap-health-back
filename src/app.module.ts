import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { SizesModule } from './sizes/sizes.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { PizzasModule } from './pizzas/pizzas.module';

@Module({
  imports: [HealthModule, SizesModule, IngredientsModule, PizzasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
