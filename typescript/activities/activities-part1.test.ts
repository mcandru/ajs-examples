import { expect, test } from "vitest";

// ============================================
// TYPESCRIPT FUNDAMENTALS - PRACTICE ACTIVITIES
// ============================================
//
// Instructions:
// 1. Run `npm test` - MOST tests should pass (one will fail until you define the enum)
// 2. Run `npm run type-check` - you should see TypeScript ERRORS
// 3. Fix the type annotations to make TypeScript happy
// 4. DO NOT change the test code or the logic - only fix the types!
// 5. When you're done, both `npm test` and `npm run type-check` should succeed
// ============================================

// ============================================
// EXERCISE 1: Array Type Annotations
// ============================================
// The tests pass, but TypeScript is unhappy about the array types.
// Fix the type annotations!

export const addNumbers = (numbers) => {
  return numbers.reduce((acc, num) => acc + num, 0);
};

test("Should add all numbers in the array", () => {
  expect(addNumbers([1, 2, 3, 4])).toEqual(10);
  expect(addNumbers([10, 20, 30])).toEqual(60);
});

// ============================================
// EXERCISE 2: Tuple Types
// ============================================
// The coordinate system works at runtime, but TypeScript wants proper tuple types.
// Fix the type annotations to use tuples instead of arrays!

export const getDistance = (pointA, pointB) => {
  const dx = pointB[0] - pointA[0];
  const dy = pointB[1] - pointA[1];
  return Math.sqrt(dx * dx + dy * dy);
};

test("Should calculate distance between two points", () => {
  expect(getDistance([0, 0], [3, 4])).toEqual(5);
  expect(getDistance([1, 1], [4, 5])).toEqual(5);
});

// ============================================
// EXERCISE 3: Enum Values
// ============================================
// Define the OrderStatus enum below.
// The tests expect specific string values!

export enum OrderStatus {}
// TODO: Add enum values here
// Pending should equal "PENDING"
// Processing should equal "PROCESSING"
// Shipped should equal "SHIPPED"
// Delivered should equal "DELIVERED"

export const getNextStatus = (currentStatus: OrderStatus) => {
  if (currentStatus === OrderStatus.Pending) return OrderStatus.Processing;
  if (currentStatus === OrderStatus.Processing) return OrderStatus.Shipped;
  if (currentStatus === OrderStatus.Shipped) return OrderStatus.Delivered;
  return null;
};

test("Should transition order status correctly", () => {
  expect(getNextStatus(OrderStatus.Pending)).toEqual("PROCESSING");
  expect(getNextStatus(OrderStatus.Processing)).toEqual("SHIPPED");
  expect(getNextStatus(OrderStatus.Shipped)).toEqual("DELIVERED");
  expect(getNextStatus(OrderStatus.Delivered)).toEqual(null);
});

// ============================================
// EXERCISE 4: Optional Parameters
// ============================================
// The function works, but TypeScript complains about the parameter types.

export const calculateTax = (income, taxYear) => {
  if (taxYear && taxYear < 2020) {
    return income * 0.15;
  }
  return income * 0.2;
};

test("Should calculate tax with and without tax year", () => {
  expect(calculateTax(50000)).toEqual(10000);
  expect(calculateTax(50000, 2019)).toEqual(7500);
  expect(calculateTax(50000, 2020)).toEqual(10000);
});

// ============================================
// EXERCISE 5: Optional Object Properties
// ============================================
// The getName function works at runtime, but TypeScript sees a type error.

export const getName = (params: { first: string; last: string }) => {
  if (params.last) {
    return `${params.first} ${params.last}`;
  }
  return params.first;
};

test("Should get name with or without last name", () => {
  expect(getName({ first: "John", last: "Doe" })).toEqual("John Doe");
  expect(getName({ first: "Madonna" })).toEqual("Madonna");
});

// ============================================
// EXERCISE 6: Readonly Properties
// ============================================
// The tests pass, but we want to prevent ORIGIN from being modified.
// Add the 'readonly' modifier to the tuple types

export const ORIGIN: [number, number] = [0, 0];

export const translatePoint = (
  point: [number, number],
  offset: [number, number]
) => {
  return [point[0] + offset[0], point[1] + offset[1]];
};

test("Should translate point from origin", () => {
  console.log("Origin:", ORIGIN);
  const result = translatePoint(ORIGIN, [5, 10]);
  expect(result).toEqual([5, 10]);

  // The unused directive type error should disappear once you add readonly to ORIGIN:

  // @ts-expect-error
  ORIGIN.push(5);

  // @ts-expect-error
  ORIGIN[0] = 10;
});

// ============================================
// EXERCISE 7: Object Types with Methods
// ============================================
// The Product type is incomplete - add the missing properties!
// Look at the tests to see what properties are needed.

export type Product = {
  id: string;
  name: string;
  // TODO: Add the missing properties
};

export const createProduct = (
  id: string,
  name: string,
  price: number
): Product => {
  return {
    id,
    name,
    price,
    calculateDiscount: (discountPercent: number): number => {
      return price * (1 - discountPercent / 100);
    },
  };
};

test("Should create a product with discount calculation", () => {
  const product = createProduct("P001", "Laptop", 1000);
  expect(product.price).toEqual(1000);
  expect(product.calculateDiscount(10)).toEqual(900);
  expect(product.calculateDiscount(25)).toEqual(750);
});
