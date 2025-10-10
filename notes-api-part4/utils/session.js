import session from "express-session";
import MongoStore from "connect-mongo";

export const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  name: "sessionId",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: "sessions",
    ttl: 24 * 60 * 60, // 1 day in seconds. Mongo TTL index will remove it after that
  }),
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true in production with HTTPS
    sameSite: "strict",
  },
});

// Middleware to check if user is authenticated
export const requireAuth = (req, res, next) => {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.status(401).json({ error: "Authentication required" });
  }
};
