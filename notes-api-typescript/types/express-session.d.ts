import "express-session";

// Extend the SessionData interface to include userId
// The types are imported from definitely typed's express-session package
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/c030728c3e25d15bcb3fbf48edf2df784b9f08db/types/express-session

declare module "express-session" {
  interface SessionData {
    userId?: string;
  }
}
