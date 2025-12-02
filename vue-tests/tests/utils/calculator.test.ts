import { test, expect } from "vitest";
import { add, subtract, multiply, divide } from "@/utils/calculator";

// EXERCISE 1: Unit Testing Pure Functions
// These are simple unit tests for pure functions (functions that always return
// the same output for the same input and have no side effects).

test("add: should add two numbers correctly", () => {
  // TODO: Write an assertion to check that add(2, 3) equals 5
  expect(true).toBe(false);
});

test("subtract: should subtract two numbers correctly", () => {
  // TODO: Write an assertion to check that subtract(5, 3) equals 2
  expect(true).toBe(false);
});

test("multiply: should multiply two numbers correctly", () => {
  // TODO: Write an assertion to check that multiply(4, 3) equals 12
  expect(true).toBe(false);
});

test("divide: should divide two numbers correctly", () => {
  // TODO: Write an assertion to check that divide(10, 2) equals 5
  expect(true).toBe(false);
});

test("divide: should throw error when dividing by zero", () => {
  // TODO: Use expect().toThrow() to verify that divide(10, 0) throws an error
  // Hint: You need to wrap the function call in an arrow function
  // Example: expect(() => someFunction()).toThrow()
  expect(true).toBe(false);
});
