import { Controller, Get } from '@nestjs/common';
import ingredients from '../../db/ingredients.json';

@Controller('ingredients')
export class IngredientsController {
  @Get()
  getAll() {
    return ingredients;
  }
}
