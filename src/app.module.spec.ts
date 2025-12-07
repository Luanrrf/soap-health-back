import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { HealthModule } from './health/health.module';
import { SizesModule } from './sizes/sizes.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { PizzasModule } from './pizzas/pizzas.module';
import { INestApplication } from '@nestjs/common';

describe('AppModule', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('should compile the module', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    expect(module).toBeDefined();
  });

  it('should import HealthModule', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const healthModule = module.get(HealthModule);
    expect(healthModule).toBeDefined();
  });

  it('should import SizesModule', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const sizesModule = module.get(SizesModule);
    expect(sizesModule).toBeDefined();
  });

  it('should import IngredientsModule', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const ingredientsModule = module.get(IngredientsModule);
    expect(ingredientsModule).toBeDefined();
  });

  it('should import PizzasModule', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const pizzasModule = module.get(PizzasModule);
    expect(pizzasModule).toBeDefined();
  });

  it('should have all required modules imported', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    expect(module.get(HealthModule)).toBeDefined();
    expect(module.get(SizesModule)).toBeDefined();
    expect(module.get(IngredientsModule)).toBeDefined();
    expect(module.get(PizzasModule)).toBeDefined();
  });

  it('should initialize the application successfully', async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const application = moduleFixture.createNestApplication();
    await expect(application.init()).resolves.not.toThrow();
    await application.close();
  });
});
