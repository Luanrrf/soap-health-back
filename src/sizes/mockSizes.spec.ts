import { mockSizes } from './mockSizes';

describe('mockSizes', () => {
  it('should be defined', () => {
    expect(mockSizes).toBeDefined();
  });

  it('should be an array', () => {
    expect(Array.isArray(mockSizes)).toBe(true);
  });

  it('should contain 3 sizes', () => {
    expect(mockSizes).toHaveLength(3);
  });

  it('should have all sizes with correct structure', () => {
    mockSizes.forEach((size) => {
      expect(size).toHaveProperty('id');
      expect(size).toHaveProperty('name');
      expect(size).toHaveProperty('basePrice');
    });
  });

  it('should have all sizes with correct types', () => {
    mockSizes.forEach((size) => {
      expect(typeof size.id).toBe('string');
      expect(typeof size.name).toBe('string');
      expect(typeof size.basePrice).toBe('number');
    });
  });

  it('should have positive prices for all sizes', () => {
    mockSizes.forEach((size) => {
      expect(size.basePrice).toBeGreaterThan(0);
    });
  });

  it('should have unique ids', () => {
    const ids = mockSizes.map((size) => size.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(mockSizes.length);
  });

  it('should have unique names', () => {
    const names = mockSizes.map((size) => size.name);
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBe(mockSizes.length);
  });

  it('should contain small size', () => {
    const small = mockSizes.find((size) => size.id === 'sm');
    expect(small).toBeDefined();
    expect(small?.name).toBe('Small');
    expect(small?.basePrice).toBe(20.0);
  });

  it('should contain medium size', () => {
    const medium = mockSizes.find((size) => size.id === 'md');
    expect(medium).toBeDefined();
    expect(medium?.name).toBe('Medium');
    expect(medium?.basePrice).toBe(30.0);
  });

  it('should contain large size', () => {
    const large = mockSizes.find((size) => size.id === 'lg');
    expect(large).toBeDefined();
    expect(large?.name).toBe('Large');
    expect(large?.basePrice).toBe(40.0);
  });

  it('should have prices in ascending order', () => {
    expect(mockSizes[0].basePrice).toBe(20.0);
    expect(mockSizes[1].basePrice).toBe(30.0);
    expect(mockSizes[2].basePrice).toBe(40.0);
    expect(mockSizes[0].basePrice).toBeLessThan(mockSizes[1].basePrice);
    expect(mockSizes[1].basePrice).toBeLessThan(mockSizes[2].basePrice);
  });

  it('should have small as the cheapest size', () => {
    const minPrice = Math.min(...mockSizes.map((size) => size.basePrice));
    expect(minPrice).toBe(20.0);

    const cheapest = mockSizes.find((size) => size.basePrice === minPrice);
    expect(cheapest?.id).toBe('sm');
  });

  it('should have large as the most expensive size', () => {
    const maxPrice = Math.max(...mockSizes.map((size) => size.basePrice));
    expect(maxPrice).toBe(40.0);

    const mostExpensive = mockSizes.find((size) => size.basePrice === maxPrice);
    expect(mostExpensive?.id).toBe('lg');
  });

  it('should have price difference of 10 between consecutive sizes', () => {
    expect(mockSizes[1].basePrice - mockSizes[0].basePrice).toBe(10.0);
    expect(mockSizes[2].basePrice - mockSizes[1].basePrice).toBe(10.0);
  });

  it('should have all expected size ids', () => {
    const ids = mockSizes.map((size) => size.id);
    expect(ids).toContain('sm');
    expect(ids).toContain('md');
    expect(ids).toContain('lg');
  });

  it('should have all expected size names', () => {
    const names = mockSizes.map((size) => size.name);
    expect(names).toContain('Small');
    expect(names).toContain('Medium');
    expect(names).toContain('Large');
  });
});
