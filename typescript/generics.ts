// 1. Generics Basics

// Let's define a simple function that returns the first element of an array
function getFirstElement(array: number[]) {
  return array[0];
}

const numbers = [1, 2, 3];
let firstNum = getFirstElement(numbers);

// If we trty to use it with a string array, TypeScript will complain
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
function getFirstElementGeneric<ElementType>(array: ElementType[]) {
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

// 2. Using Generics in Built-in Types

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

// 3. Custom generic types
interface ApiResponse<DataType> {
  data: DataType;
  isError: boolean;
}

const response: ApiResponse<{ id: number; name: string }> = {
  data: { id: 1, name: "Test" },
  isError: false,
};

// You can also create a type alias for a generic type to make it easier to use
type BlogTitleResponse = ApiResponse<{ title: string }>;

const blogResponse: BlogTitleResponse = {
  data: { title: "My First Blog" },
  isError: false,
};

// 4. Multiple Generic Type Parameters

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

// Compile -time vs Run-time

// Compile-time: TypeScript checks types during development
// Run-time: Types are checked when the code is executed

const result = getFirstElementGeneric([1, 2, 3]);
console.log(result);

export {};
