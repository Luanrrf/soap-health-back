import { mockIngredients } from './mockIngredients';

describe('mockIngredients', () => {
  it('should be defined', () => {
    expect(mockIngredients).toBeDefined();
  });

  it('should be an array', () => {
    expect(Array.isArray(mockIngredients)).toBe(true);
  });

  it('should contain 8 ingredients', () => {
    expect(mockIngredients).toHaveLength(8);
  });

  it('should have all ingredients with correct structure', () => {
    mockIngredients.forEach((ingredient) => {
      expect(ingredient).toHaveProperty('id');
      expect(ingredient).toHaveProperty('name');
      expect(ingredient).toHaveProperty('extraPrice');
    });
  });

  it('should have all ingredients with correct types', () => {
    mockIngredients.forEach((ingredient) => {
      expect(typeof ingredient.id).toBe('string');
      expect(typeof ingredient.name).toBe('string');
      expect(typeof ingredient.extraPrice).toBe('number');
    });
  });

  it('should have positive prices for all ingredients', () => {
    mockIngredients.forEach((ingredient) => {
      expect(ingredient.extraPrice).toBeGreaterThan(0);
    });
  });

  it('should have unique ids', () => {
    const ids = mockIngredients.map((ing) => ing.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(mockIngredients.length);
  });

  it('should contain cheese ingredient', () => {
    const cheese = mockIngredients.find((ing) => ing.id === 'cheese');
    expect(cheese).toBeDefined();
    expect(cheese?.name).toBe('cheese');
    expect(cheese?.extraPrice).toBe(4.0);
  });

  it('should contain tomato ingredient', () => {
    const tomato = mockIngredients.find((ing) => ing.id === 'tomato');
    expect(tomato).toBeDefined();
    expect(tomato?.name).toBe('tomato');
    expect(tomato?.extraPrice).toBe(2.0);
  });

  it('should contain cream cheese ingredient', () => {
    const creamCheese = mockIngredients.find(
      (ing) => ing.id === 'cream cheese',
    );
    expect(creamCheese).toBeDefined();
    expect(creamCheese?.name).toBe('cream cheese');
    expect(creamCheese?.extraPrice).toBe(5.5);
  });

  it('should contain pepperoni ingredient', () => {
    const pepperoni = mockIngredients.find((ing) => ing.id === 'pepperoni');
    expect(pepperoni).toBeDefined();
    expect(pepperoni?.name).toBe('pepperoni');
    expect(pepperoni?.extraPrice).toBe(5.0);
  });

  it('should contain bacon ingredient', () => {
    const bacon = mockIngredients.find((ing) => ing.id === 'bacon');
    expect(bacon).toBeDefined();
    expect(bacon?.name).toBe('bacon');
    expect(bacon?.extraPrice).toBe(6.0);
  });

  it('should contain onion ingredient', () => {
    const onion = mockIngredients.find((ing) => ing.id === 'onion');
    expect(onion).toBeDefined();
    expect(onion?.name).toBe('onion');
    expect(onion?.extraPrice).toBe(1.5);
  });

  it('should contain olive ingredient', () => {
    const olive = mockIngredients.find((ing) => ing.id === 'olive');
    expect(olive).toBeDefined();
    expect(olive?.name).toBe('olive');
    expect(olive?.extraPrice).toBe(2.5);
  });

  it('should contain oregano ingredient', () => {
    const oregano = mockIngredients.find((ing) => ing.id === 'oregano');
    expect(oregano).toBeDefined();
    expect(oregano?.name).toBe('oregano');
    expect(oregano?.extraPrice).toBe(1.0);
  });

  it('should have bacon as the most expensive ingredient', () => {
    const maxPrice = Math.max(...mockIngredients.map((ing) => ing.extraPrice));
    expect(maxPrice).toBe(6.0);

    const mostExpensive = mockIngredients.find(
      (ing) => ing.extraPrice === maxPrice,
    );
    expect(mostExpensive?.id).toBe('bacon');
  });

  it('should have oregano as the cheapest ingredient', () => {
    const minPrice = Math.min(...mockIngredients.map((ing) => ing.extraPrice));
    expect(minPrice).toBe(1.0);

    const cheapest = mockIngredients.find((ing) => ing.extraPrice === minPrice);
    expect(cheapest?.id).toBe('oregano');
  });

  it('should have id matching name for all ingredients', () => {
    mockIngredients.forEach((ingredient) => {
      expect(ingredient.id).toBe(ingredient.name);
    });
  });
});
