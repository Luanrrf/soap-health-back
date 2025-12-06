export type Size = {
  id: string;
  name: string;
  basePrice: number;
};

export type Ingredient = {
  id: string;
  name: string;
  extraPrice: number;
};

export type Pizza = {
  id: number;
  customerName: string;
  sizeId: string;
  ingredientIds: string[];
  finalPrice: number;
  createdAt: string;
};
