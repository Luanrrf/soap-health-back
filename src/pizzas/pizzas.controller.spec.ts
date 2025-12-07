import { PizzasController } from './pizzas.controller';
import { PizzasService } from './pizzas.service';

describe('PizzasController - Direct Instance Tests', () => {
  let controller: PizzasController;
  let service: PizzasService;

  beforeEach(() => {
    service = new PizzasService();
    service['pizzas'] = [];
    controller = new PizzasController(service);
  });

  describe('constructor and methods execution', () => {
    it('should create controller instance with constructor', () => {
      const testService = new PizzasService();
      const testController = new PizzasController(testService);

      expect(testController).toBeDefined();
      expect(testController).toBeInstanceOf(PizzasController);
    });

    it('should call getAll method directly', () => {
      const filters = {
        customerName: 'Test',
        sortBy: 'finalPrice',
        order: 'asc',
      };
      const result = controller.getAll(
        filters.customerName,
        filters.sortBy,
        filters.order,
      );

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    });

    it('should call getAll without parameters', () => {
      const result = controller.getAll();

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    });

    it('should call getAll with only customerName', () => {
      const result = controller.getAll('Test');

      expect(result).toBeDefined();
    });

    it('should call getAll with customerName and sortBy', () => {
      const result = controller.getAll('Test', 'finalPrice');

      expect(result).toBeDefined();
    });

    it('should call getById method directly', () => {
      service.create({
        customerName: 'Test',
        sizeId: 'sm',
        ingredientIds: ['cheese'],
      });

      const result = controller.getById('1');

      expect(result).toBeDefined();
    });

    it('should call getById with different ids', () => {
      const pizza = service.create({
        customerName: 'Test',
        sizeId: 'sm',
        ingredientIds: ['cheese'],
      });

      const result = controller.getById(String(pizza.id));

      expect(result).toBeDefined();
      expect(result.id).toBe(pizza.id);
    });

    it('should call create method directly', () => {
      const dto = {
        customerName: 'Direct Test',
        sizeId: 'md',
        ingredientIds: ['pepperoni', 'cheese'],
      };

      const result = controller.create(dto);

      expect(result).toBeDefined();
      expect(result.customerName).toBe('Direct Test');
      expect(result.sizeId).toBe('md');
    });

    it('should execute all controller methods in sequence', () => {
      const createDto = {
        customerName: 'Sequence Test',
        sizeId: 'lg',
        ingredientIds: ['bacon'],
      };

      const created = controller.create(createDto);
      expect(created).toBeDefined();

      const allPizzas = controller.getAll();
      expect(allPizzas.length).toBeGreaterThan(0);

      const retrieved = controller.getById(String(created.id));
      expect(retrieved.id).toBe(created.id);

      const filtered = controller.getAll('Sequence');
      expect(filtered.length).toBeGreaterThan(0);
    });
  });
});
