import { Test, TestingModule } from '@nestjs/testing';
import { IngredientsController } from './ingredients.controller';
import ingredients from '../../db/ingredients.json';

describe('IngredientsController', () => {
  let controller: IngredientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngredientsController],
    }).compile();

    controller = module.get<IngredientsController>(IngredientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return all ingredients', () => {
      const result = controller.getAll();

      expect(result).toEqual(ingredients);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should return an array with 8 ingredients', () => {
      const result = controller.getAll();

      expect(result).toHaveLength(8);
    });

    it('should return ingredients with correct structure', () => {
      const result = controller.getAll();

      result.forEach((ingredient) => {
        expect(ingredient).toHaveProperty('id');
        expect(ingredient).toHaveProperty('name');
        expect(ingredient).toHaveProperty('extraPrice');
        expect(typeof ingredient.id).toBe('string');
        expect(typeof ingredient.name).toBe('string');
        expect(typeof ingredient.extraPrice).toBe('number');
      });
    });

    it('should include cheese ingredient', () => {
      const result = controller.getAll();

      const cheese = result.find((ing) => ing.id === 'cheese');
      expect(cheese).toBeDefined();
      expect(cheese?.name).toBe('cheese');
      expect(cheese?.extraPrice).toBe(4.0);
    });

    it('should include pepperoni ingredient', () => {
      const result = controller.getAll();

      const pepperoni = result.find((ing) => ing.id === 'pepperoni');
      expect(pepperoni).toBeDefined();
      expect(pepperoni?.name).toBe('pepperoni');
      expect(pepperoni?.extraPrice).toBe(5.0);
    });

    it('should include all expected ingredients', () => {
      const result = controller.getAll();
      const ingredientIds = result.map((ing) => ing.id);

      expect(ingredientIds).toContain('cheese');
      expect(ingredientIds).toContain('tomato');
      expect(ingredientIds).toContain('cream cheese');
      expect(ingredientIds).toContain('pepperoni');
      expect(ingredientIds).toContain('bacon');
      expect(ingredientIds).toContain('onion');
      expect(ingredientIds).toContain('olive');
      expect(ingredientIds).toContain('oregano');
    });

    it('should have positive prices for all ingredients', () => {
      const result = controller.getAll();

      result.forEach((ingredient) => {
        expect(ingredient.extraPrice).toBeGreaterThan(0);
      });
    });

    it('should return the same reference on multiple calls', () => {
      const result1 = controller.getAll();
      const result2 = controller.getAll();

      expect(result1).toBe(result2);
    });
  });
});
