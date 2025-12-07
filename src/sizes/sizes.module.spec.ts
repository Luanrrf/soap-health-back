import { Test, TestingModule } from '@nestjs/testing';
import { SizesModule } from './sizes.module';
import { SizesController } from './sizes.controller';

describe('SizesModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [SizesModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should compile the module', async () => {
    const compiledModule: TestingModule = await Test.createTestingModule({
      imports: [SizesModule],
    }).compile();

    expect(compiledModule).toBeDefined();
  });

  it('should have SizesController registered', () => {
    const controller = module.get<SizesController>(SizesController);
    expect(controller).toBeDefined();
    expect(controller).toBeInstanceOf(SizesController);
  });

  it('should provide SizesController', () => {
    expect(() => module.get<SizesController>(SizesController)).not.toThrow();
  });

  it('should export controllers', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const controllers = Reflect.getMetadata('controllers', SizesModule);
    expect(controllers).toContain(SizesController);
  });
});
