let test: number = 0;
let implicitTest = 0;

// test = "5"; // Error: Type 'string' is not assignable to type 'number'.
// implicitTest = "5"; // No error, implicitTest is of type 'any'.

let list: number[] = [1, 2, 3];
let implicitList = [1, 2, 3];
let implicitComplexList = [1, "2", 3]; // inferred as (string | number)[]

// list.push("4"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'
// list = ["4"]; // Error: Type 'string' is not assignable to type 'number[]'.

interface Car {
  year: number;
  make: string;
  model: string;
}

let myCar: Car = { year: 2020, make: "Toyota", model: "Corolla" };

// Example function with implicit any types
// There isn't enough context for the compiler to infer types here
// const multiplier = (a, b, printText) => {
//   return `${printText} ${a * b}`;
// };

const multiplier = (a: number, b: number, printText: string) => {
  return `${printText} ${a * b}`;
};

// Defining your own types - TypeScript offers a way to define specific types for inputs
// to describe exactly what types are expected.
type Operator = "multiply" | "add" | "subtract" | "divide";

const calculate = (a: number, b: number, operator: Operator): number => {
  if (operator === "multiply") {
    return a * b;
  } else if (operator === "add") {
    return a + b;
  } else if (operator === "subtract") {
    return a - b;
  } else if (operator === "divide") {
    return a / b;
  }

  throw new Error("Unsupported operator");
};

// calculate(2, 3, "modulus"); // Error: Argument of type '"modulus"' is not assignable to parameter of type 'Operator'.

console.log(
  test,
  implicitTest,
  list,
  myCar,
  multiplier(2, 3, "The result is:"),
  calculate(10, 5, "add")
);
