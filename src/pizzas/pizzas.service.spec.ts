import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PizzasService } from './pizzas.service';

describe('PizzasService', () => {
  let service: PizzasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PizzasService],
    }).compile();

    service = module.get<PizzasService>(PizzasService);
    service['pizzas'] = [];
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an empty array when no pizzas exist', () => {
      const result = service.getAll();
      expect(result).toEqual([]);
    });

    it('should return all pizzas without filters', () => {
      const pizza1 = service.create({
        customerName: 'João Silva',
        sizeId: 'sm',
        ingredientIds: ['cheese', 'tomato'],
      });
      const pizza2 = service.create({
        customerName: 'Maria Santos',
        sizeId: 'md',
        ingredientIds: ['pepperoni'],
      });

      const result = service.getAll();
      expect(result).toHaveLength(2);
      expect(result).toContainEqual(pizza1);
      expect(result).toContainEqual(pizza2);
    });

    it('should filter pizzas by customer name (case insensitive)', () => {
      service.create({
        customerName: 'João Silva',
        sizeId: 'sm',
        ingredientIds: ['cheese'],
      });
      service.create({
        customerName: 'Maria Santos',
        sizeId: 'md',
        ingredientIds: ['pepperoni'],
      });

      const result = service.getAll({ customerName: 'joão' });
      expect(result).toHaveLength(1);
      expect(result[0].customerName).toBe('João Silva');
    });

    it('should filter pizzas by partial customer name', () => {
      service.create({
        customerName: 'João Silva',
        sizeId: 'sm',
        ingredientIds: ['cheese'],
      });
      service.create({
        customerName: 'João Pedro',
        sizeId: 'md',
        ingredientIds: ['pepperoni'],
      });

      const result = service.getAll({ customerName: 'joão' });
      expect(result).toHaveLength(2);
    });

    it('should sort pizzas by finalPrice in ascending order', () => {
      service.create({
        customerName: 'Cliente A',
        sizeId: 'lg',
        ingredientIds: ['cheese', 'bacon'],
      });
      service.create({
        customerName: 'Cliente B',
        sizeId: 'sm',
        ingredientIds: ['cheese'],
      });

      const result = service.getAll({ sortBy: 'finalPrice', order: 'asc' });
      expect(result[0].finalPrice).toBe(24);
      expect(result[1].finalPrice).toBe(50);
    });

    it('should sort pizzas by finalPrice in descending order', () => {
      service.create({
        customerName: 'Cliente A',
        sizeId: 'sm',
        ingredientIds: ['cheese'],
      });
      service.create({
        customerName: 'Cliente B',
        sizeId: 'lg',
        ingredientIds: ['cheese', 'bacon'],
      });

      const result = service.getAll({ sortBy: 'finalPrice', order: 'desc' });
      expect(result[0].finalPrice).toBe(50);
      expect(result[1].finalPrice).toBe(24);
    });

    it('should sort pizzas by createdAt in ascending order', () => {
      jest.useFakeTimers();

      const pizza1 = service.create({
        customerName: 'Cliente A',
        sizeId: 'sm',
        ingredientIds: ['cheese'],
      });

      jest.advanceTimersByTime(1000);

      const pizza2 = service.create({
        customerName: 'Cliente B',
        sizeId: 'md',
        ingredientIds: ['pepperoni'],
      });

      const result = service.getAll({ sortBy: 'createdAt', order: 'asc' });
      expect(result[0].id).toBe(pizza1.id);
      expect(result[1].id).toBe(pizza2.id);

      jest.useRealTimers();
    });

    it('should sort pizzas by createdAt in descending order', () => {
      jest.useFakeTimers();

      const pizza1 = service.create({
        customerName: 'Cliente A',
        sizeId: 'sm',
        ingredientIds: ['cheese'],
      });

      jest.advanceTimersByTime(1000);

      const pizza2 = service.create({
        customerName: 'Cliente B',
        sizeId: 'md',
        ingredientIds: ['pepperoni'],
      });

      const result = service.getAll({ sortBy: 'createdAt', order: 'desc' });
      expect(result[0].id).toBe(pizza2.id);
      expect(result[1].id).toBe(pizza1.id);

      jest.useRealTimers();
    });

    it('should combine filter and sort', () => {
      service.create({
        customerName: 'João Silva',
        sizeId: 'lg',
        ingredientIds: ['cheese', 'bacon'],
      });
      service.create({
        customerName: 'João Pedro',
        sizeId: 'sm',
        ingredientIds: ['cheese'],
      });
      service.create({
        customerName: 'Maria Santos',
        sizeId: 'md',
        ingredientIds: ['pepperoni'],
      });

      const result = service.getAll({
        customerName: 'joão',
        sortBy: 'finalPrice',
        order: 'asc',
      });
      expect(result).toHaveLength(2);
      expect(result[0].customerName).toBe('João Pedro');
      expect(result[1].customerName).toBe('João Silva');
    });
  });

  describe('getById', () => {
    it('should return a pizza by id', () => {
      const created = service.create({
        customerName: 'João Silva',
        sizeId: 'sm',
        ingredientIds: ['cheese', 'tomato'],
      });

      const result = service.getById(created.id);
      expect(result).toEqual(created);
    });

    it('should throw NotFoundException when pizza does not exist', () => {
      expect(() => service.getById(999)).toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a pizza with valid data', () => {
      const dto = {
        customerName: 'João Silva',
        sizeId: 'sm',
        ingredientIds: ['cheese', 'tomato'],
      };

      const result = service.create(dto);

      expect(result).toMatchObject({
        customerName: 'João Silva',
        sizeId: 'sm',
        ingredientIds: ['cheese', 'tomato'],
        finalPrice: 26,
      });
      expect(result.id).toBe(1);
      expect(result.createdAt).toBeDefined();
      expect(new Date(result.createdAt)).toBeInstanceOf(Date);
    });

    it('should calculate correct price for medium pizza with multiple ingredients', () => {
      const result = service.create({
        customerName: 'Maria Santos',
        sizeId: 'md',
        ingredientIds: ['pepperoni', 'bacon', 'olive'],
      });

      expect(result.finalPrice).toBe(43.5);
    });

    it('should calculate correct price for large pizza with all ingredients', () => {
      const result = service.create({
        customerName: 'Pedro Oliveira',
        sizeId: 'lg',
        ingredientIds: [
          'cheese',
          'tomato',
          'cream cheese',
          'pepperoni',
          'bacon',
          'onion',
          'olive',
          'oregano',
        ],
      });

      expect(result.finalPrice).toBe(67.5);
    });

    it('should increment pizza id correctly', () => {
      const pizza1 = service.create({
        customerName: 'Cliente 1',
        sizeId: 'sm',
        ingredientIds: ['cheese'],
      });
      const pizza2 = service.create({
        customerName: 'Cliente 2',
        sizeId: 'md',
        ingredientIds: ['pepperoni'],
      });

      expect(pizza1.id).toBe(1);
      expect(pizza2.id).toBe(2);
    });

    it('should throw BadRequestException when customer name is empty', () => {
      expect(() =>
        service.create({
          customerName: '',
          sizeId: 'sm',
          ingredientIds: ['cheese'],
        }),
      ).toThrow(BadRequestException);
      expect(() =>
        service.create({
          customerName: '',
          sizeId: 'sm',
          ingredientIds: ['cheese'],
        }),
      ).toThrow('Customer name cannot be empty');
    });

    it('should throw BadRequestException when customer name is only whitespace', () => {
      expect(() =>
        service.create({
          customerName: '   ',
          sizeId: 'sm',
          ingredientIds: ['cheese'],
        }),
      ).toThrow(BadRequestException);
    });

    it('should throw BadRequestException when size does not exist', () => {
      expect(() =>
        service.create({
          customerName: 'João Silva',
          sizeId: 'xl',
          ingredientIds: ['cheese'],
        }),
      ).toThrow(BadRequestException);
      expect(() =>
        service.create({
          customerName: 'João Silva',
          sizeId: 'xl',
          ingredientIds: ['cheese'],
        }),
      ).toThrow('Could not find a pizza size matching: xl');
    });

    it('should throw BadRequestException when ingredient does not exist', () => {
      expect(() =>
        service.create({
          customerName: 'João Silva',
          sizeId: 'sm',
          ingredientIds: ['cheese', 'pineapple'],
        }),
      ).toThrow(BadRequestException);
      expect(() =>
        service.create({
          customerName: 'João Silva',
          sizeId: 'sm',
          ingredientIds: ['cheese', 'pineapple'],
        }),
      ).toThrow('Could not find the following ingredient IDs: pineapple');
    });

    it('should throw BadRequestException with multiple invalid ingredients', () => {
      expect(() =>
        service.create({
          customerName: 'João Silva',
          sizeId: 'sm',
          ingredientIds: ['cheese', 'pineapple', 'chicken'],
        }),
      ).toThrow(BadRequestException);
      expect(() =>
        service.create({
          customerName: 'João Silva',
          sizeId: 'sm',
          ingredientIds: ['cheese', 'pineapple', 'chicken'],
        }),
      ).toThrow(
        'Could not find the following ingredient IDs: pineapple, chicken',
      );
    });

    it('should create pizza with no extra ingredients', () => {
      const result = service.create({
        customerName: 'João Silva',
        sizeId: 'sm',
        ingredientIds: [],
      });

      expect(result.finalPrice).toBe(20);
      expect(result.ingredientIds).toEqual([]);
    });

    it('should handle duplicate ingredient ids correctly', () => {
      const result = service.create({
        customerName: 'João Silva',
        sizeId: 'sm',
        ingredientIds: ['cheese', 'cheese'],
      });

      expect(result.finalPrice).toBe(28);
    });
  });
});
