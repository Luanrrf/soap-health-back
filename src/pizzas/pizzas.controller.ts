import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';

import { PizzasService } from './pizzas.service';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import type { Pizza } from './types';

@Controller('pizzas')
export class PizzasController {
  constructor(private readonly pizzasService: PizzasService) {}

  @Get()
  getAll(
    @Query('customerName') customerName?: string,
    @Query('sortBy') sortBy?: string,
    @Query('order') order?: string,
  ): Pizza[] {
    return this.pizzasService.getAll({ customerName, sortBy, order });
  }

  @Get(':id')
  getById(@Param('id') id: string): Pizza {
    return this.pizzasService.getById(Number(id));
  }

  @Post()
  create(@Body() body: CreatePizzaDto): Pizza {
    return this.pizzasService.create(body);
  }
}
