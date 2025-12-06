import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import sizesJson from 'db/sizes.json';
import ingredientsJson from 'db/ingredients.json';
import pizzasJson from 'db/pizzas.json';

import type { Size, Ingredient, Pizza } from './types';
import type { CreatePizzaDto } from './dto/create-pizza.dto';

@Injectable()
export class PizzasService {
  private sizes: Size[] = sizesJson as Size[];
  private ingredients: Ingredient[] = ingredientsJson as Ingredient[];
  private pizzas: Pizza[] = pizzasJson as Pizza[];

  getAll(filters?: {
    customerName?: string;
    sortBy?: string;
    order?: string;
  }): Pizza[] {
    let result = [...this.pizzas];

    if (filters?.customerName) {
      const name = filters.customerName.toLowerCase();
      result = result.filter((p) =>
        p.customerName.toLowerCase().includes(name),
      );
    }

    if (filters?.sortBy === 'finalPrice' || filters?.sortBy === 'createdAt') {
      result.sort((a, b) => {
        const order = filters.order === 'desc' ? -1 : 1;

        if (filters.sortBy === 'finalPrice') {
          return (a.finalPrice - b.finalPrice) * order;
        }

        return (
          (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) *
          order
        );
      });
    }

    return result;
  }

  getById(id: number): Pizza {
    const pizza = this.pizzas.find((p) => p.id === id);
    if (!pizza) throw new NotFoundException({ error: 'Pizza not found' });
    return pizza;
  }

  create(body: CreatePizzaDto): Pizza {
    const { customerName, sizeId, ingredientIds } = body;

    if (!customerName || customerName.trim() === '') {
      throw new BadRequestException('Customer name cannot be empty');
    }

    const size = this.sizes.find((s) => s.id === sizeId);

    if (!size) {
      throw new BadRequestException(
        `Could not find a pizza size matching: ${sizeId}`,
      );
    }

    const invalidIngredients = ingredientIds.filter(
      (id) => !this.ingredients.find((i) => i.id === id),
    );

    if (invalidIngredients.length > 0) {
      throw new BadRequestException(
        `Could not find the following ingredient IDs: ${invalidIngredients.join(
          ', ',
        )}`,
      );
    }

    const selectedIngredients: Ingredient[] = ingredientIds.map(
      (id) => this.ingredients.find((i) => i.id === id)!,
    );

    const extrasTotal = selectedIngredients.reduce(
      (sum, ing) => sum + ing.extraPrice,
      0,
    );

    const finalPrice = size.basePrice + extrasTotal;

    const newPizza: Pizza = {
      id: this.pizzas.length + 1,
      customerName,
      sizeId,
      ingredientIds,
      finalPrice,
      createdAt: new Date().toISOString(),
    };

    this.pizzas.push(newPizza);

    return newPizza;
  }
}
