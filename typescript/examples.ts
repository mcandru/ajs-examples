//// 1. THE BASICS OF TYPESCRIPT ////

let test: number = 0;
let implicitTest = 0;

// test = "5"; // Error: Type 'string' is not assignable to type 'number'.
// implicitTest = "5"; // No error, implicitTest is of type 'any'.

let list: number[] = [1, 2, 3];
// list.push("4"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'

let implicitList = [1, 2, 3];
let implicitComplexList = [1, "2", 3]; // inferred as (string | number)[]

// list = ["4"]; // Error: Type 'string' is not assignable to type 'number[]'.

//// 2. TYPESCRIPT FUNDAMENTALS ////

// 2.1 The Any Type

let course; // infers as 'any' type
// Can be assigned any type but defeats the purpose of TypeScript
course = 1;
course = "a";

// // Type error example with implicit any
// function addNumbers(a, b) {
//   return a + b;
// }

// Explicitly typing the parameters
function addNumbers(a: any, b: any) {
  return a + b;
}

// Adding strict types is best where possible
function addNumbersStrict(a: number, b: number) {
  return a + b;
}

// 2.2 Arrays

let numbers = [1, 2, 3];
// numbers.push("4"); // type error

let implicitNumbers = [1, 2, "3"];
implicitNumbers.push("4"); // This is allowed as the array is of type (string | number)[]

// Empty arrays default to a type of any[]
let emptyArray = [];
emptyArray.push(1);
emptyArray.push("2");

// You will need to explicitly type empty arrays if you want to restrict types
let explicitNumberArray: number[] = [];
explicitNumberArray.push(1);
// explicitNumberArray.push("2"); // type error

// 2.3 Tuples

let point: [number, number] = [10, 20];
// let point: [number, number] = [10, 20, 30]; // Error: Type '[number, number, number]' is not assignable to type '[number, number]'.

// Note that tuples are compiled to regular arrays in JavaScript so this is a compile-time check only
point.push(30);

// Tuples can be made read-only
const readonlyPoint: readonly [number, number] = [5, 10];
// readonlyPoint.push(15); // Error: Property 'push' does not exist on type 'readonly [number, number]'.

// 2.4 Enums

// Enums allow you to define a set of named constants
// By default, enums are number-based starting at 0
// enum Size {
//   Small,
//   Medium,
//   Large,
// }

const Size = {
  Small: 0,
  Medium: 1,
  Large: 2,
  0: "Small", // reverse mapping
  1: "Medium", // reverse mapping
  2: "Large", // reverse mapping
};

console.log(`Enum small: ${Size.Small}`); // Output: Enum small: 0

// Enums can also have custom values
enum CustomSize {
  Small = "SMALL",
  Medium = "MEDIUM",
  Large = "LARGE",
}

console.log(`Custom Enum medium: ${CustomSize.Medium}`); // Output: Custom Enum medium: MEDIUM

// CustomSize.Small = "Tiny"; // Error: Cannot assign to 'Small' because it is a read-only property.

// Under the hood, enums are objects in JavaScript
// Compiled JavaScript for the Size enum
/*
var Size;
(function (Size) {
    Size[Size["Small"] = 0] = "Small";
    Size[Size["Medium"] = 1] = "Medium";
    Size[Size["Large"] = 2] = "Large";
})(Size || (Size = {}));
*/

// You can also use const enums for more optimized code
// The enum is removed during compilation and inlined where used
// The advantage is reduced code size and improved performance
const enum Direction {
  Up,
  Down,
  Left,
  Right,
}

console.log(`Direction Up: ${Direction.Up}`); // Output: Direction Up: 0
// console.log(Direction); // Type error: Doesn't exist at runtime

// 2.5 Functions

// TypeScript can infer return types
function calculateTaxWithInference(income: number) {
  return 0.2 * income;
}

// But you can also explicitly type the return value
function calculateTaxExplicit(income: number): number {
  return 0.2 * income;
}

// When we explicitly type a function, it can help catch errors
// For example, this function is missing a return statement for some code paths
// function calculateTax(income: number): number {
//   if (income < 50000) {
//     return 0.1 * income;
//   }
// }

// TypeScript will catch errors where the return type doesn't match, unlike JavaScript
// calculateTaxExplicit(10_000, 1); // Error: Expected 1 arguments, but got 2.

// Optional parameters can be defined with a '?'
function calculateTaxOptional(income: number, taxYear?: number): number {
  if (taxYear && taxYear < 2020) {
    return 0.15 * income;
  }
  return 0.2 * income;
}

// 2.6 Objects

let employee = { id: 1 };
// employee.name = "John"; // No error, 'name' is implicitly of type 'any'

// Explicitly typing object properties
let employeeTwo: { id: number; name: string } = { id: 1, name: "John" };

// employeeTwo.name = null; // Invalid assignment
// employeeTwo.name = undefined; // Invalid assignment
employeeTwo.name = ""; // Valid assignment

// Optional properties
let employeeDetails: {
  id: number;
  name: string;
  fax?: string; // optional property
} = { id: 2, name: "Jane" };
employeeDetails.fax = "123-456-7890"; // valid assignment

// Read-only properties
let employeeReadOnly: {
  readonly id: number;
  name: string;
} = { id: 3, name: "Doe" };

// employeeReadOnly.id = 4; // Error: Cannot assign to 'id' because it is a read-only property.

// Adding function types to objects
let printEmployee: {
  readonly id: number;
  name: string;
  printDetails: (input: string) => void;
} = {
  id: 4,
  name: "John",
  printDetails(input: string) {
    console.log(`${input}: ${this.id} - ${this.name}`);
  },
};

printEmployee.printDetails("Employee Info");
