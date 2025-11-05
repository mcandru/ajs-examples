// ============================================
// 1. Discriminated Unions (Tagged Unions)
// ============================================

// So far we've looked at type narrowing with primitive types using typeof and instanceof
// But what happens when we need to narrow between different object shapes?

// Let's say we're building an API that returns either success or error responses
interface SuccessResponse {
  data: string;
  timestamp: Date;
}

interface ErrorResponse {
  error: string;
  code: number;
}

type ApiResult = SuccessResponse | ErrorResponse;

// How do we narrow this type at runtime to know which one we have?
function handleResponse(response: ApiResult) {
  // typeof won't help - both are objects
  // if (typeof response === 'object') { } // Not useful

  // We could check if properties exist, but this is verbose and error-prone
  if ("data" in response) {
    console.log(response.data);
  } else {
    console.log(response.error);
  }
}

// The solution: Discriminated Unions!
// Add a common property (the "discriminant" or "tag") that has different literal values

interface SuccessResponseTagged {
  status: "success"; // Literal type acts as a tag
  data: string;
  timestamp: Date;
}

interface ErrorResponseTagged {
  status: "error"; // Different literal value
  error: string;
  code: number;
}

type ApiResultTagged = SuccessResponseTagged | ErrorResponseTagged;

// Now TypeScript can narrow the type based on the discriminant property
function handleResponseTagged(response: ApiResultTagged) {
  if (response.status === "success") {
    // TypeScript knows this is SuccessResponseTagged
    console.log(response.data);
  } else {
    // TypeScript knows this is ErrorResponseTagged
    console.log(response.error);
  }
}

// Another example: modeling different shapes in a drawing application

type Circle = {
  kind: "circle";
  radius: number;
};

type Rectangle = {
  kind: "rectangle";
  width: number;
  height: number;
};

type Triangle = {
  kind: "triangle";
  base: number;
  height: number;
};

type Shape = Circle | Rectangle | Triangle;

function calculateArea(shape: Shape): number {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
  } else if (shape.kind === "rectangle") {
    return shape.width * shape.height;
  }
  return (shape.base * shape.height) / 2;
}

const myCircle: Circle = { kind: "circle", radius: 5 };
const myRectangle: Rectangle = { kind: "rectangle", width: 10, height: 20 };

console.log(calculateArea(myCircle));
console.log(calculateArea(myRectangle));

// If we add a new shape type to the Shape union and forget to handle it in calculateArea,
// TypeScript will give us a compile error at the default case!

// ============================================
// 2. The 'as const' Assertion
// ============================================

// We've seen type assertions before (using 'as' to tell TypeScript about a type)
// But 'as const' creates the most specific type possible

// Regular object - properties are mutable and types are widened

const routes = {
  home: "/",
  admin: "/admin",
  users: "/users",
};

routes.home; // This is of type string, rather than its literal value of "/"

// This is because you can reassign the value
routes.home = "/home"; // This is allowed

// However, if we wanted to type a function that accepts any possible route value
// we end up repeating ourselves quite a bit:
const goToRoute = (route: "/" | "/admin" | "users") => {};

// Instead we can use `as const` to make the object immutable

const routesConst = {
  home: "/",
  admin: "/admin",
  users: "/users",
} as const;

routesConst.home; // This is now a literal type "/"

// routesConst.home = "/home"; // This has a type error because trying to set a read-only value

// One neat feature of TypeScript is that you can index object types
type RoutesHomeAndAdminType = (typeof routesConst)["home" | "admin"];

// We can use that to create a type based on the values of the routes
// Here keyof grabs the keys for the type of routesConst and then indexes on them all
type RouteValues = (typeof routesConst)[keyof typeof routesConst];

const goToRouteConst = (route: RouteValues) => {};

const config = {
  apiUrl: "https://api.example.com", // apiUrl: string (not the literal "https://api.example.com")
  timeout: 5000, // timeout: number (not the literal 5000)
  retries: 3, // retries: number (not the literal 3)
};

config.apiUrl = "https://different-api.com"; // Allowed
config.timeout = 10000; // Allowed

// With 'as const', everything becomes readonly and literal types
const configConst = {
  apiUrl: "https://api.example.com", // readonly apiUrl: "https://api.example.com"
  timeout: 5000, // readonly timeout: 5000
  retries: 3, // readonly retries: 3
} as const;

// configConst.apiUrl = "https://different-api.com"; // Error: Cannot assign to 'apiUrl' because it is a read-only property
// configConst.timeout = 10000; // Error: Cannot assign to 'timeout' because it is a read-only property

// 'as const' is particularly useful for arrays that shouldn't change
const colors = ["red", "green", "blue"];
// Type: string[]

// This is essentially a tuple with literal types
const colorsConst = ["red", "green", "blue"] as const;
// Type: readonly ["red", "green", "blue"]

// colorsConst.push("yellow"); // Error: Property 'push' does not exist on type 'readonly ["red", "green", "blue"]'

// ============================================
// 3. Classes
// ============================================

// If you like using classes in JavaScript, here's how to use classes in TypeScript.

// 3.1 Basic Class Syntax

class Person {
  // Properties (instance variables)
  name: string;
  age: number;

  // Constructor - runs when you create a new instance
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // Method (instance function)
  greet(): void {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old`);
  }
}

const person1 = new Person("Alice", 30);
person1.greet(); // Output: Hello, my name is Alice and I'm 30 years old

console.log(person1.name); // Output: Alice
person1.age = 31; // We can modify properties
console.log(person1.age); // Output: 31

// 3.2 Access Modifiers

// TypeScript provides three access modifiers to control property and method visibility:
// - public: accessible from anywhere (default)
// - private: only accessible within the class
// - protected: accessible within the class and subclasses

class PersonWithModifiers {
  public name: string;
  protected age: number;
  private email: string;

  constructor(name: string, age: number, email: string) {
    this.name = name;
    this.age = age;
    this.email = email;
  }
}

type Department = "sales" | "marketing";

class Employee extends PersonWithModifiers {
  department: Department;

  constructor(
    name: string,
    age: number,
    email: string,
    department: Department
  ) {
    super(name, age, email);
    this.department = department;
  }

  greet() {
    this.age; // Allowed to access
    // this.email; // Throws a type error because private instance variable
  }
}

const employee = new Employee("Bob", 28, "bob@example.com", "sales");
// employee.age; // Error: Property 'age' is protected and only accessible within class 'PersonWithModifiers' and its subclasses
// employee.email; // Error: Property 'email' is private and only accessible within class 'PersonWithModifiers'd

// 3.3 Parameter Properties Shorthand

// Instead of declaring properties and assigning them in the constructor,
// you can use parameter properties for a more concise syntax

class Product {
  // Using access modifiers in constructor parameters automatically creates properties
  constructor(public id: number, public name: string, private price: number) {
    // No need to write this.id = id, etc.
    // TypeScript does this automatically!
  }

  getPrice(): number {
    return this.price;
  }

  setPrice(newPrice: number) {
    if (newPrice > 0) {
      this.price = newPrice;
    }
  }
}

const product = new Product(1, "Laptop", 999.99);
console.log(product.name); // Output: Laptop
console.log(product.getPrice()); // Output: 999.99

// 3.4 Readonly Modifier

// The readonly modifier prevents properties from being changed after initialization

class Book {
  readonly isbn: string; // Can only be set in constructor
  title: string;

  constructor(isbn: string, title: string) {
    this.isbn = isbn;
    this.title = title;
  }
}

const book = new Book("978-0-123456-78-9", "TypeScript Guide");
book.title = "Advanced TypeScript"; // Allowed
// book.isbn = "different-isbn"; // Error: Cannot assign to 'isbn' because it is a read-only property

// You can combine readonly with parameter properties
class User {
  constructor(public readonly id: number, public name: string) {}
}

const user = new User(1, "Charlie");
// user.id = 2; // Error: Cannot assign to 'id' because it is a read-only property

// 3.5 Abstract Classes

// Abstract classes are base classes that cannot be instantiated directly
// They define a contract that subclasses must implement

abstract class Shape2 {
  constructor(public color: string) {}

  // Abstract method - must be implemented by subclasses
  abstract calculateArea(): number;

  // Concrete method - can be used by subclasses as-is
  describe() {
    console.log(
      `This is a ${this.color} shape with area ${this.calculateArea()}`
    );
  }
}

abstract class Test {
  abstract calculatePerimeter(): number;
}

// const shape = new Shape2("red"); // Error: Cannot create an instance of an abstract class

class Circle2 extends Shape2, Test {
  constructor(color: string, public radius: number) {
    super(color);
  }

  // Must implement abstract methods
  calculateArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle2 extends Shape2 {
  constructor(color: string, public width: number, public height: number) {
    super(color);
  }

  calculateArea(): number {
    return this.width * this.height;
  }
}

const circle = new Circle2("blue", 5);
circle.describe(); // Output: This is a blue shape with area 78.53975

const rectangle = new Rectangle2("green", 10, 20);
rectangle.describe(); // Output: This is a green shape with area 200

// 3.6 Implementing Interfaces

// Classes can implement interfaces to ensure they have certain properties and methods
// A class can implement multiple interfaces

interface Printable {
  print(): void;
}

interface Saveable {
  save(): void;
}

class Document implements Printable, Saveable {
  constructor(public content: string) {}

  print() {
    console.log(`Printing: ${this.content}`);
  }

  save() {
    console.log(`Saving: ${this.content}`);
  }
}

const doc = new Document("Hello, World!");
doc.print(); // Output: Printing: Hello, World!
doc.save(); // Output: Saving: Hello, World!

// This is useful for ensuring different classes share a common interface
interface PaymentMethod {
  processPayment(amount: number): void;
}

class CreditCard implements PaymentMethod {
  constructor(private cardNumber: string) {}

  processPayment(amount: number) {
    console.log(
      `Processing $${amount} payment with credit card ${this.cardNumber}`
    );
  }
}

class PayPal implements PaymentMethod {
  constructor(private email: string) {}

  processPayment(amount: number) {
    console.log(
      `Processing $${amount} payment with PayPal account ${this.email}`
    );
  }
}

// Both classes can be used interchangeably where PaymentMethod is expected
function checkout(paymentMethod: PaymentMethod, total: number) {
  paymentMethod.processPayment(total);
}

checkout(new CreditCard("1234-5678"), 99.99);
checkout(new PayPal("user@example.com"), 49.99);

export {};
