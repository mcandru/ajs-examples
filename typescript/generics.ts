// ============================================
// 1. Generic Basics
// ============================================

// Let's define a simple function that returns the first element of an array
function getFirstElement(array: number[]): number {
  return array[0];
}

const numbers = [1, 2, 3];
let firstNum = getFirstElement(numbers);

// If we try to use it with a string array, TypeScript will complain
const strings = ["elem1", "elem2", "elem3"];
// const firstString = getFirstElement(strings); // Type error: Argument of type 'string[]' is not assignable to parameter of type 'number[]'.

// To make it work with an array of any type, we could  use any, but then we'd lose the type information about the array that we passed in
// function getFirstElement(array: any[]) {
//   return array[0];
// }

// You could also use a union type to allow multiple types, but the return type will be a union as well
// TypeScript isn't smart enough to know for a particular call which type is being used
// function getFirstElement(array: number[] | string[]) {
//   return array[0];
// }

// Instead we can use generics to create a function that works with any type
// You can do this by defining a type parameter in the function signature
function getFirstElementGeneric<ElementType>(
  array: ElementType[]
): ElementType {
  return array[0];
}

// Now when you call the function, you can pass in the 'ElementType' parameter and
// TypeScript will know the type of the array
firstNum = getFirstElementGeneric<number>(numbers);
let firstString = getFirstElementGeneric<string>(strings);
// getFirstElementGeneric<string>(numbers); // Type Error: Argument of type 'number[]' is not assignable to parameter of type 'string[]'

// You can also omit the generic type parameter and TypeScript will infer it from what's passed in
firstNum = getFirstElementGeneric(numbers);
firstString = getFirstElementGeneric(strings);

// ============================================
// 2. Generic types
// ============================================

// You can also use generics with types and interfaces
// Here's an example of a generic interface for an API response
interface ApiResponse<DataType> {
  data: DataType;
  isError: boolean;
}

// The same thing can be done with type aliases
type ApiResponseType<DataType> = {
  data: DataType;
  isError: boolean;
};

// Now you can create specific types by providing the generic type parameter
const stringApiResponse: ApiResponse<string> = {
  data: "Hello, World!",
  isError: false,
};
console.log(stringApiResponse);

// Or with an object type
const response: ApiResponse<{ id: number; name: string }> = {
  data: { id: 1, name: "Test" },
  isError: false,
};
console.log(response);

// You can also create a type alias for a generic type to make it easier to use
type BlogTitleResponse = ApiResponse<{ title: string }>;

const blogResponse: BlogTitleResponse = {
  data: { title: "My First Blog" },
  isError: false,
};
console.log(blogResponse);

// ============================================
// 3. Using Generics in Built-in Types
// ============================================

// Generics are everywhere in TypeScript. For example, when selecting DOM elements:
const input = document.querySelector<HTMLInputElement>(".input");
input?.value; // TypeScript knows 'input' is an HTMLInputElement

// The map definition uses generics as well
// It's smart enough to infer the type based on the array it's called on
// Hover over 'map' in VSCode to see the full type definition
strings.map((str) => str.toUpperCase());

// If we remember from earlier, functions that return Promises also use generics
const fetchData = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data loaded");
    }, 1000);
  });
};

fetchData().then((data) => {
  console.log(data);
});

// Most built-in types in TypeScript use generics under the hood
// For example, the Array type is defined as Array<ElementType>
// So when you create an array of numbers, it's actually Array<number>
const numArray: Array<number> = [1, 2, 3];
console.log(numArray);

// But you can also use the shorthand syntax with square brackets
const strArray: string[] = ["a", "b", "c"];
console.log(strArray);

// ============================================
// 4. Multiple Generic Type Parameters
// ============================================

// You can also have multiple generic type parameters
// For example, if we want to create a Pair type that holds two values of different types
interface Pair<FirstType, SecondType> {
  first: FirstType;
  second: SecondType;
}

const pair: Pair<number, string> = {
  first: 1,
  second: "One",
};

console.log(pair);

// One example of a built-in type that uses multiple generics is Record
// It allows you to create an object type where you can specify the type of each key and value in it
// The first generic type is for the keys, and the second is for the values
const userAges: Record<string, number> = {
  Alice: 30,
  Bob: 25,
};

userAges["Charlie"] = 35;
// userAges["David"] = "Thirty"; // Type Error: Type 'string' is not assignable to type 'number'.

// ============================================
// 5. Generic Constraints
// ============================================

// Sometimes you want to limit the types that can be used with a generic
// You can do this by using the 'extends' keyword to add a constraint

const printLength = <T extends { length: number }>(val: T) => {
  console.log(val.length);
};

printLength("Hello");
printLength([1, 2, 3, 4]);
// printLength(123); // Type Error: Argument of type 'number' is not assignable to parameter of type 'HasLength'.

// ============================================
// 6. Type Narrowing Techniques
// ============================================

// Type narrowing is the process of refining a union type to a more specific type
// TypeScript provides several ways to narrow types

// 6.1 typeof type guards
function processValue(value: string | number) {
  if (typeof value === "string") {
    // Inside this block, TypeScript knows value is a string
    return value.toUpperCase();
  } else {
    // Inside this block, TypeScript knows value is a number
    return value.toFixed(2);
  }
}

console.log(processValue("hello"));
console.log(processValue(42.12345));

// 6.2 instanceof type guards
class Dog {
  bark() {
    console.log("Woof!");
  }
}

class Cat {
  meow() {
    console.log("Meow!");
  }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    // TypeScript knows animal is a Dog here
    animal.bark();
  } else {
    // TypeScript knows animal is a Cat here
    animal.meow();
  }
}

makeSound(new Dog());
makeSound(new Cat());

// ============================================
// 7. Unknown and Never Types
// ============================================

// 7.1 The unknown type
// 'unknown' is a type-safe alternative to 'any'
// Unlike 'any', you cannot use an unknown value without first narrowing its type

let value: unknown;

value = "Hello";
value = 42;
value = true;
value = { name: "test" };

// But you can't use it directly without narrowing
// console.log(value.toUpperCase()); // Type Error: Object is of type 'unknown'.

// You must narrow the type first
if (typeof value === "string") {
  console.log(value.toUpperCase()); // Now it's safe
}

// This makes unknown much safer than any for handling values of uncertain type
function processUnknown(input: unknown) {
  if (typeof input === "string") {
    return input.toUpperCase();
  } else if (typeof input === "number") {
    return input.toFixed(2);
  } else {
    return "Unknown type";
  }
}

console.log(processUnknown("hello"));
console.log(processUnknown(42.12345));
console.log(processUnknown(true));

export {};
