import { expect, it } from "vitest";

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

it("Should add all numbers in the array", () => {
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

it("Should calculate distance between two points", () => {
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

it("Should transition order status correctly", () => {
  expect(getNextStatus(OrderStatus.Pending)).toEqual("PROCESSING");
  expect(getNextStatus(OrderStatus.Processing)).toEqual("SHIPPED");
  expect(getNextStatus(OrderStatus.Shipped)).toEqual("DELIVERED");
  expect(getNextStatus(OrderStatus.Delivered)).toEqual(null);
});

// ============================================
// EXERCISE 4: Optional Parameters
// ============================================
// The function works, but TypeScript complains about the parameter types.
// Add proper type annotations including the optional parameter!

export const calculateTax = (income, taxYear) => {
  if (taxYear && taxYear < 2020) {
    return income * 0.15;
  }
  return income * 0.2;
};

it("Should calculate tax with and without tax year", () => {
  expect(calculateTax(50000)).toEqual(10000);
  expect(calculateTax(50000, 2019)).toEqual(7500);
  expect(calculateTax(50000, 2020)).toEqual(10000);
});

// ============================================
// EXERCISE 5: Optional Object Properties
// ============================================
// The getName function works at runtime, but TypeScript sees a type error.
// The 'last' property should be optional!

export const getName = (params: { first: string; last: string }) => {
  if (params.last) {
    return `${params.first} ${params.last}`;
  }
  return params.first;
};

it("Should get name with or without last name", () => {
  expect(getName({ first: "John", last: "Doe" })).toEqual("John Doe");
  expect(getName({ first: "Madonna" })).toEqual("Madonna");
});

// ============================================
// EXERCISE 6: Readonly Properties
// ============================================
// The tests pass, but we want to prevent ORIGIN from being modified.
// Add the 'readonly' modifier to the tuple type!

export const ORIGIN: [number, number] = [0, 0];

export const translatePoint = (
  point: [number, number],
  offset: [number, number]
) => {
  return [point[0] + offset[0], point[1] + offset[1]];
};

it("Should translate point from origin", () => {
  const result = translatePoint(ORIGIN, [5, 10]);
  expect(result).toEqual([5, 10]);
});

// Try uncommenting this - it should give a TypeScript error once you add readonly:
// ORIGIN.push(5);
// ORIGIN[0] = 10;

// ============================================
// EXERCISE 7: Object Types with Methods
// ============================================
// The Product type is incomplete - add the missing properties!
// Look at the tests to see what properties are needed.

export type Product = {
  id: string;
  name: string;
  // TODO: Add the missing properties:
  // - price (number)
  // - description (string, optional)
  // - calculateDiscount (function that takes discountPercent: number and returns number)
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
    calculateDiscount: (discountPercent: number) => {
      return price * (1 - discountPercent / 100);
    },
  };
};

it("Should create a product with discount calculation", () => {
  const product = createProduct("P001", "Laptop", 1000);
  expect(product.price).toEqual(1000);
  expect(product.calculateDiscount(10)).toEqual(900);
  expect(product.calculateDiscount(25)).toEqual(750);
});

// ============================================
// EXERCISE 8: Union Types
// ============================================
// The formatId function works, but TypeScript doesn't know the parameter can be string OR number.
// Fix the type annotation to use a union type!

export const formatId = (id) => {
  if (typeof id === "string") {
    return id.toUpperCase();
  }
  return `ID-${id}`;
};

it("Should format both string and number IDs", () => {
  expect(formatId("abc123")).toEqual("ABC123");
  expect(formatId(12345)).toEqual("ID-12345");
});

// ============================================
// EXERCISE 9: Literal Types
// ============================================
// The Status type should only allow specific string values, not any string.
// Use a union of literal types: "success" | "error" | "loading"

export type Status = string; // TODO: Fix this to use literal types

export const getStatusMessage = (status: Status) => {
  if (status === "success") return "Operation completed";
  if (status === "error") return "Operation failed";
  return "Please wait...";
};

it("Should return correct messages for status", () => {
  expect(getStatusMessage("success")).toEqual("Operation completed");
  expect(getStatusMessage("error")).toEqual("Operation failed");
  expect(getStatusMessage("loading")).toEqual("Please wait...");
});

// This should give a TypeScript error once you fix the Status type:
// getStatusMessage("invalid");

// ============================================
// EXERCISE 10: Nullable Types and Optional Chaining
// ============================================
// The Customer type and function work, but TypeScript doesn't know birthday is optional.
// Fix the type and use optional chaining!

export type Customer = {
  id: number;
  name: string;
  birthday: Date; // TODO: Make this optional
};

export const getCustomerBirthYear = (customer: Customer) => {
  // TODO: Use optional chaining here - customer.birthday?.getFullYear()
  // The return type should be: number | undefined
  if (customer.birthday) {
    return customer.birthday.getFullYear();
  }
  return undefined;
};

it("Should get birth year when birthday exists", () => {
  const customer1: Customer = {
    id: 1,
    name: "John",
    birthday: new Date("1990-05-15"),
  };
  expect(getCustomerBirthYear(customer1)).toEqual(1990);
});

it("Should return undefined when birthday doesn't exist", () => {
  const customer2: Customer = {
    id: 2,
    name: "Jane",
  };
  expect(getCustomerBirthYear(customer2)).toEqual(undefined);
});

// ============================================
// EXERCISE 11: Return Type Annotations
// ============================================
// The function says it returns a string, but it can also return null!
// Fix the return type annotation to match reality.

export const findUserById = (id: number): string => {
  if (id === 0) {
    return null; // TypeScript should complain here!
  }
  return `User${id}`;
};

it("Should find user by ID or return null", () => {
  expect(findUserById(1)).toEqual("User1");
  expect(findUserById(0)).toEqual(null);
});

// ============================================
// EXERCISE 12: Function Type in Objects
// ============================================
// The Employee type needs a printDetails method.
// Add a function property that takes no parameters and returns void.

export type Employee = {
  readonly id: number;
  name: string;
  department: string;
  // TODO: Add printDetails property (function type)
  // It should take no parameters and return void
};

export const createEmployee = (
  id: number,
  name: string,
  department: string
): Employee => {
  return {
    id,
    name,
    department,
    printDetails: () => {
      console.log(`${name} works in ${department}`);
    },
  };
};

it("Should create employee with print method", () => {
  const emp = createEmployee(1, "Alice", "Engineering");
  expect(emp.id).toEqual(1);
  expect(emp.name).toEqual("Alice");
  expect(typeof emp.printDetails).toEqual("function");
});
