import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('checkStatus', () => {
    it('should return status ok', () => {
      const result = controller.checkStatus();

      expect(result).toEqual({ status: 'ok' });
    });

    it('should return an object with status property', () => {
      const result = controller.checkStatus();

      expect(result).toHaveProperty('status');
      expect(typeof result.status).toBe('string');
    });

    it('should return status with value "ok"', () => {
      const result = controller.checkStatus();

      expect(result.status).toBe('ok');
    });

    it('should always return the same response', () => {
      const result1 = controller.checkStatus();
      const result2 = controller.checkStatus();

      expect(result1).toEqual(result2);
      expect(result1.status).toBe('ok');
      expect(result2.status).toBe('ok');
    });

    it('should return a plain object', () => {
      const result = controller.checkStatus();

      expect(typeof result).toBe('object');
      expect(result).not.toBeNull();
      expect(Array.isArray(result)).toBe(false);
    });

    it('should only contain status property', () => {
      const result = controller.checkStatus();
      const keys = Object.keys(result);

      expect(keys).toHaveLength(1);
      expect(keys).toContain('status');
    });
  });
});
