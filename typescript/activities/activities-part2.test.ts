import { expect, test } from "vitest";

// ============================================
// TYPESCRIPT FUNDAMENTALS - PRACTICE ACTIVITIES PART 2
// ============================================
//
// Instructions:
// 1. Run `npm run test:part2` - tests should pass (runtime logic is correct)
// 2. Run `npm run check:part2` - you should see TypeScript ERRORS
// 3. Fix the type annotations to make TypeScript happy
// 4. DO NOT change the test code or the logic - only fix the types!
// 5. When you're done, both `npm run test:part2` and `npm run check:part2` should succeed
// ============================================

// ============================================
// EXERCISE 1: Type Aliases
// ============================================
// Create type aliases to make the function signatures cleaner.
// The UserID should be a string, and Email should be a string.

// TODO: Define type aliases here

export const createUser = (user) => {
  return { id: user.id, email: user.email };
};

export const validateEmail = (email) => {
  return email.includes("@");
};

test("Should create user with proper types", () => {
  const user = createUser({ id: "user123", email: "test@example.com" });
  expect(user.id).toEqual("user123");
  expect(user.email).toEqual("test@example.com");
  expect(validateEmail(user.email)).toBe(true);
});

// ============================================
// EXERCISE 2: Interfaces
// ============================================
// Define an interface for a Person with firstName, lastName, and an optional age.
// Then use it in the function below.

// TODO: Define the Person interface here

export const getPersonInfo = (person) => {
  if (person.age !== undefined) {
    return `${person.firstName} ${person.lastName} is ${person.age} years old`;
  }
  return `${person.firstName} ${person.lastName}`;
};

test("Should format person info with and without age", () => {
  expect(
    getPersonInfo({ firstName: "Jane", lastName: "Doe", age: 30 })
  ).toEqual("Jane Doe is 30 years old");
  expect(getPersonInfo({ firstName: "John", lastName: "Smith" })).toEqual(
    "John Smith"
  );
});

// ============================================
// EXERCISE 3: Union Types
// ============================================
// The function accepts different types of input.
// Create a union type for the status parameter.

export const formatStatus = (status) => {
  if (typeof status === "number") {
    return `Code: ${status}`;
  }
  return `Status: ${status}`;
};

test("Should format status as number or string", () => {
  expect(formatStatus(200)).toEqual("Code: 200");
  expect(formatStatus("OK")).toEqual("Status: OK");
  expect(formatStatus(404)).toEqual("Code: 404");
});

// ============================================
// EXERCISE 4: Intersection Types
// ============================================
// Combine two types using intersection types.
// Employee should have all properties from both Person and Job.

// TODO: Define the types
// type Person = { name: string; age: number }
// type Job = { title: string; salary: number }
// type Employee = ...

export const createEmployee = (name, age, title, salary) => {
  return { name, age, title, salary };
};

export const getEmployeeSummary = (employee) => {
  return `${employee.name}, ${employee.age}, works as ${employee.title} earning $${employee.salary}`;
};

test("Should create employee with intersection type", () => {
  const employee = createEmployee("Alice", 28, "Engineer", 75000);
  expect(getEmployeeSummary(employee)).toEqual(
    "Alice, 28, works as Engineer earning $75000"
  );
});

// ============================================
// EXERCISE 5: Type Literals
// ============================================
// Use string literal types to constrain the direction parameter.
// It should only accept "north", "south", "east", or "west".

export const move = (direction) => {
  const directions = {
    north: [0, 1],
    south: [0, -1],
    east: [1, 0],
    west: [-1, 0],
  };
  return directions[direction];
};

test("Should move in cardinal directions only", () => {
  expect(move("north")).toEqual([0, 1]);
  expect(move("south")).toEqual([0, -1]);
  expect(move("east")).toEqual([1, 0]);
  expect(move("west")).toEqual([-1, 0]);
});

// ============================================
// EXERCISE 6: Optional Chaining
// ============================================
// Fix the type definition to make the nested properties optional.
// This will allow the optional chaining to work properly.

type Address = {
  street: string;
  city: string;
  zipCode: string;
};

type Customer = {
  name: string;
  address: Address;
};

export const getZipCode = (customer: Customer) => {
  return customer.address?.zipCode ?? "No zip code";
};

test("Should safely access nested properties", () => {
  expect(
    getZipCode({
      name: "Bob",
      address: { street: "123 Main", city: "NYC", zipCode: "10001" },
    })
  ).toEqual("10001");
  expect(getZipCode({ name: "Alice" })).toEqual("No zip code");
});

// ============================================
// EXERCISE 7: Type Assertions
// ============================================
// Add proper type annotations for the error parameter.
// In a catch block, errors are of type 'unknown' and need to be
// asserted to the correct type before accessing properties.

export const handleApiError = (error: unknown) => {
  try {
    throw error;
  } catch (e) {
    // Type assertion needed here to access error properties
    const err = e;
    if (err.message) {
      return `Error: ${err.message}`;
    }
    return "Unknown error occurred";
  }
};

test("Should handle errors with type assertion in catch block", () => {
  const error = new Error("Network timeout");
  expect(handleApiError(error)).toEqual("Error: Network timeout");

  const stringError = "Something went wrong";
  expect(handleApiError(stringError)).toEqual("Unknown error occurred");
});

// ============================================
// EXERCISE 8: Async Functions and Promises
// ============================================
// Add proper return type annotations for the async functions.
// They should return Promise<T> where T is the resolved value type.

export const fetchUserData = async (noteId) => {
  const response = await fetch(
    `https://ajs-notes-json-server.vercel.app/notes/${noteId}`
  );
  const data = await response.json();
  return data;
};

export const getNote = async (noteId) => {
  const note = await fetchUserData(noteId);
  return note;
};

test("Should fetch user data asynchronously", async () => {
  const note = await getNote(1);
  expect(note.id).toEqual(1);
  expect(note.userId).toEqual(1);
  expect(note.content).toEqual("This is my first note");
  expect(note.important).toBe(true);
});
