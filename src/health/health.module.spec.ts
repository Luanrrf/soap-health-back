import { Test, TestingModule } from '@nestjs/testing';
import { HealthModule } from './health.module';
import { HealthController } from './health.controller';

describe('HealthModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [HealthModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should compile the module', async () => {
    const compiledModule: TestingModule = await Test.createTestingModule({
      imports: [HealthModule],
    }).compile();

    expect(compiledModule).toBeDefined();
  });

  it('should have HealthController registered', () => {
    const controller = module.get<HealthController>(HealthController);
    expect(controller).toBeDefined();
    expect(controller).toBeInstanceOf(HealthController);
  });

  it('should provide HealthController', () => {
    expect(() => module.get<HealthController>(HealthController)).not.toThrow();
  });

  it('should export controllers', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const controllers = Reflect.getMetadata('controllers', HealthModule);
    expect(controllers).toContain(HealthController);
  });
});
