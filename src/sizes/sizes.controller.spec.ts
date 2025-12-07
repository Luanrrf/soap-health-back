import { Test, TestingModule } from '@nestjs/testing';
import { SizesController } from './sizes.controller';
import sizes from '../../db/sizes.json';

describe('SizesController', () => {
  let controller: SizesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SizesController],
    }).compile();

    controller = module.get<SizesController>(SizesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return all sizes', () => {
      const result = controller.getAll();

      expect(result).toEqual(sizes);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should return an array with 3 sizes', () => {
      const result = controller.getAll();

      expect(result).toHaveLength(3);
    });

    it('should return sizes with correct structure', () => {
      const result = controller.getAll();

      result.forEach((size) => {
        expect(size).toHaveProperty('id');
        expect(size).toHaveProperty('name');
        expect(size).toHaveProperty('basePrice');
        expect(typeof size.id).toBe('string');
        expect(typeof size.name).toBe('string');
        expect(typeof size.basePrice).toBe('number');
      });
    });

    it('should include small size', () => {
      const result = controller.getAll();

      const small = result.find((size) => size.id === 'sm');
      expect(small).toBeDefined();
      expect(small?.name).toBe('Small');
      expect(small?.basePrice).toBe(20.0);
    });

    it('should include medium size', () => {
      const result = controller.getAll();

      const medium = result.find((size) => size.id === 'md');
      expect(medium).toBeDefined();
      expect(medium?.name).toBe('Medium');
      expect(medium?.basePrice).toBe(30.0);
    });

    it('should include large size', () => {
      const result = controller.getAll();

      const large = result.find((size) => size.id === 'lg');
      expect(large).toBeDefined();
      expect(large?.name).toBe('Large');
      expect(large?.basePrice).toBe(40.0);
    });

    it('should include all expected sizes', () => {
      const result = controller.getAll();
      const sizeIds = result.map((size) => size.id);

      expect(sizeIds).toContain('sm');
      expect(sizeIds).toContain('md');
      expect(sizeIds).toContain('lg');
    });

    it('should have positive prices for all sizes', () => {
      const result = controller.getAll();

      result.forEach((size) => {
        expect(size.basePrice).toBeGreaterThan(0);
      });
    });

    it('should have prices in ascending order', () => {
      const result = controller.getAll();

      expect(result[0].basePrice).toBe(20.0);
      expect(result[1].basePrice).toBe(30.0);
      expect(result[2].basePrice).toBe(40.0);
      expect(result[0].basePrice).toBeLessThan(result[1].basePrice);
      expect(result[1].basePrice).toBeLessThan(result[2].basePrice);
    });

    it('should return the same reference on multiple calls', () => {
      const result1 = controller.getAll();
      const result2 = controller.getAll();

      expect(result1).toBe(result2);
    });
  });
});
