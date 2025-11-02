import { expect, expectTypeOf, test } from "vitest";

// ============================================
// TYPESCRIPT FUNDAMENTALS - PRACTICE ACTIVITIES PART 3
// ============================================
//
// Instructions:
// 1. Run `npm run test:part3` - tests should pass (runtime logic is correct)
// 2. Run `npm run check:part3` - you should see TypeScript ERRORS
// 3. Fix the type annotations to make TypeScript happy
// 4. DO NOT change the test code or the logic - only fix the types!
// 5. When you're done, both `npm run test:part3` and `npm run check:part3` should succeed
// ============================================

// ============================================
// EXERCISE 1: Basic Generic Function
// ============================================
// Create a generic function that returns the last element of an array.
// The function should work with arrays of any type.

export const getLastElement = <ElementType>(
  array: ElementType[]
): ElementType => {
  return array[array.length - 1];
};

test("Should return the last element of any array type", () => {
  expect(getLastElement([1, 2, 3, 4])).toEqual(4);
  expect(getLastElement(["a", "b", "c"])).toEqual("c");
  expect(getLastElement([true, false, true])).toEqual(true);
});

// ============================================
// EXERCISE 2: Generic Function with Type Inference
// ============================================
// Create a generic function that wraps a value in an object with a 'value' property.
// TypeScript should be able to infer the type from the argument.

export const wrapInObject = <T>(value: T): { value: T } => {
  return { value };
};

test("Should wrap values in an object", () => {
  const wrappedNumber = wrapInObject(42);
  expect(wrappedNumber.value).toEqual(42);
  expectTypeOf(wrappedNumber).toEqualTypeOf<{ value: number }>;

  const wrappedString = wrapInObject("hello");
  expect(wrappedString.value).toEqual("hello");
  expectTypeOf(wrappedString).toEqualTypeOf<{ value: string }>;
});

// ============================================
// EXERCISE 3: Generic Interface
// ============================================
// Define a generic Box interface that can hold any type of item.
// The interface should have an 'item' property and a 'label' string.

interface Box<ItemType, LabelType> {
  item: ItemType;
  label: LabelType;
}

export const createBox = <ItemType, LabelType>(
  item: ItemType,
  label: LabelType
): Box<ItemType, LabelType> => {
  return { item, label };
};

test("Should create boxes with different item types", () => {
  const numberBox = createBox(123, "Number Box");
  expect(numberBox.item).toEqual(123);
  expect(numberBox.label).toEqual("Number Box");
  expectTypeOf(numberBox).toEqualTypeOf<{ item: number; label: string }>;

  const stringBox = createBox("gift", "Gift Box");
  expect(stringBox.item).toEqual("gift");
  expect(stringBox.label).toEqual("Gift Box");
  expectTypeOf(stringBox).toEqualTypeOf<{ item: string; label: string }>;
});

// ============================================
// EXERCISE 4: Generic Type Alias
// ============================================
// Create a generic Result type that can represent either success or failure.
// It should have a 'success' boolean and a 'data' property of generic type.

type Result<DataType> = {
  success: boolean;
  data: DataType;
};

export const createSuccessResult = <DataType>(
  data: DataType
): Result<DataType> => {
  return { success: true, data };
};

export const createFailureResult = (): Result<null> => {
  return { success: false, data: null };
};

test("Should create success and failure results", () => {
  interface SuccessData {
    id: number;
    name: string;
  }

  const successResult = createSuccessResult({ id: 1, name: "Test" });
  expect(successResult.success).toBe(true);
  expect(successResult.data).toEqual({ id: 1, name: "Test" });
  expectTypeOf(successResult).toEqualTypeOf<{
    success: boolean;
    data: SuccessData;
  }>;

  const failureResult = createFailureResult();
  expect(failureResult.success).toBe(false);
  expect(failureResult.data).toBeNull();
  expectTypeOf(failureResult).toEqualTypeOf<{ success: boolean; data: null }>;
});

// ============================================
// EXERCISE 5: Generic with Array Methods
// ============================================
// Create a generic function that filters an array based on a predicate function.
// The predicate should accept an item of the generic type and return a boolean.

export const filterArray = <ElemType>(
  array: ElemType[],
  predicate: (item: ElemType) => boolean
): ElemType[] => {
  return array.filter(predicate);
};

test("Should filter arrays with type-safe predicates", () => {
  const numbers = [1, 2, 3, 4, 5];
  const evenNumbers = filterArray(numbers, (num) => num % 2 === 0);
  expect(evenNumbers).toEqual([2, 4]);
  expectTypeOf(evenNumbers).toEqualTypeOf<number[]>;

  const words = ["apple", "banana", "apricot", "cherry"];
  const aWords = filterArray(words, (word) => word.startsWith("a"));
  expect(aWords).toEqual(["apple", "apricot"]);
  expectTypeOf(aWords).toEqualTypeOf<string[]>;
});

// ============================================
// EXERCISE 6: Multiple Generic Type Parameters
// ============================================
// Create a generic function that transforms an array of one type to an array of another.
// It should accept a transformer function that converts from type T to type U.

export const transformArray = <ElemType, TransformType>(
  array: ElemType[],
  transformer: (item: ElemType) => TransformType
) => {
  return array.map(transformer);
};

test("Should transform arrays from one type to another", () => {
  const numbers = [1, 2, 3];
  const strings = transformArray(numbers, (num) => `Number: ${num}`);
  expect(strings).toEqual(["Number: 1", "Number: 2", "Number: 3"]);
  expectTypeOf(strings).toEqualTypeOf<string[]>;

  const words = ["hi", "bye", "hello"];
  const lengths = transformArray(words, (word) => word.length);
  expect(lengths).toEqual([2, 3, 5]);
  expectTypeOf(lengths).toEqualTypeOf<number[]>;
});

// ============================================
// EXERCISE 7: Generic Record Type
// ============================================
// Use the Record generic type to create a function that builds a lookup map.
// The function should take an array of items and a key extractor function,
// and return an object where keys are extracted from items.

export const createLookupMap = <T, K extends string | number | symbol>(
  items: T[],
  getKey: (item: T) => K
): Record<K, T> => {
  const map = {} as Record<K, T>;
  for (const item of items) {
    map[getKey(item)] = item;
  }
  return map;
};

test("Should create a lookup map from an array", () => {
  const users = [
    { id: "1", name: "Alice" },
    { id: "2", name: "Bob" },
    { id: "3", name: "Charlie" },
  ];

  const userMap = createLookupMap(users, (user) => user.id);
  expect(userMap["1"]).toEqual({ id: "1", name: "Alice" });
  expect(userMap["2"]).toEqual({ id: "2", name: "Bob" });
  expect(userMap["3"]).toEqual({ id: "3", name: "Charlie" });
  expectTypeOf(userMap).toEqualTypeOf<
    Record<string, { id: string; name: string }>
  >;
});

// ============================================
// EXERCISE 8: Generic Promise Return Type
// ============================================
// Create an async function with a proper generic Promise return type.
// The function should simulate fetching data and return a typed response.
// Note: This is a particularly tough challenge!

type FetchResource = Promise<{ id: number; loaded: boolean }>;

export const fetchResource = async (id: number): FetchResource => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, loaded: true });
    }, 10);
  });
};

test("Should fetch resources with proper typing", async () => {
  const resource = await fetchResource(42);
  expect(resource.id).toEqual(42);
  expect(resource.loaded).toBe(true);
});

// ============================================
// EXERCISE 9: Nested Generic Types
// ============================================
// Create a generic Container type that holds an array of items of type T.
// Then create a function that processes these containers.

// TODO: Define the Container type here
type Container<T> = {
  items: T[];
};

export const getTotalItems = <T>(container: Container<T>) => {
  return container.items.length;
};

export const getFirstItem = <T>(container: Container<T>) => {
  return container.items[0];
};

test("Should work with generic containers", () => {
  const numberContainer = { items: [1, 2, 3, 4, 5] };
  expect(getTotalItems(numberContainer)).toEqual(5);
  expect(getFirstItem(numberContainer)).toEqual(1);
  expectTypeOf(numberContainer).toEqualTypeOf<{ items: number[] }>;

  const stringContainer = { items: ["a", "b", "c"] };
  expect(getTotalItems(stringContainer)).toEqual(3);
  expect(getFirstItem(stringContainer)).toEqual("a");
  expectTypeOf(stringContainer).toEqualTypeOf<{ items: string[] }>;
});

// ============================================
// EXERCISE 10: Generic with Constraints (BONUS)
// ============================================
// Create a function that only works with types that have an 'id' property.
// Use a generic constraint to ensure the type has an 'id' of type number.

export const findById = <T extends { id: U }, U>(
  items: T[],
  id: U
): T | undefined => {
  return items.find((item) => item.id === id);
};

test("Should find items by id with proper constraints", () => {
  interface Product {
    id: number;
    name: string;
    price: number;
  }

  const products = [
    { id: 1, name: "Laptop", price: 999 },
    { id: 2, name: "Mouse", price: 29 },
    { id: 3, name: "Keyboard", price: 79 },
  ];

  const found = findById(products, 2);
  expect(found).toEqual({ id: 2, name: "Mouse", price: 29 });
  expectTypeOf(found).toEqualTypeOf<Product | undefined>;

  const notFound = findById(products, 99);
  expect(notFound).toBeUndefined();
});
