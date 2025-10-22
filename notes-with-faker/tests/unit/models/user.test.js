import User from "../../../models/user.js";

describe("User Model", () => {
  describe("hashPassword", () => {
    test("should hash a password", async () => {
      const password = "MyPassword123";
      const hash = await User.hashPassword(password);

      expect(hash).toBeDefined();
      expect(hash).not.toBe(password);
      expect(typeof hash).toBe("string");
      expect(hash.length).toBeGreaterThan(0);
    });

    test("should generate different hashes for the same password", async () => {
      const password = "MyPassword123";
      const hash1 = await User.hashPassword(password);
      const hash2 = await User.hashPassword(password);

      expect(hash1).not.toBe(hash2);
    });

    test("should hash different passwords differently", async () => {
      const password1 = "MyPassword123";
      const password2 = "DifferentPassword456";
      const hash1 = await User.hashPassword(password1);
      const hash2 = await User.hashPassword(password2);

      expect(hash1).not.toBe(hash2);
    });
  });

  describe("verifyPassword", () => {
    test("should verify correct password", async () => {
      const password = "MyPassword123";
      const passwordHash = await User.hashPassword(password);

      const user = new User({
        email: "test@example.com",
        passwordHash,
      });

      const isValid = await user.verifyPassword(password);
      expect(isValid).toBe(true);
    });

    test("should reject incorrect password", async () => {
      const correctPassword = "MyPassword123";
      const incorrectPassword = "WrongPassword456";
      const passwordHash = await User.hashPassword(correctPassword);

      const user = new User({
        email: "test@example.com",
        passwordHash,
      });

      const isValid = await user.verifyPassword(incorrectPassword);
      expect(isValid).toBe(false);
    });

    test("should reject empty password", async () => {
      const password = "MyPassword123";
      const passwordHash = await User.hashPassword(password);

      const user = new User({
        email: "test@example.com",
        passwordHash,
      });

      const isValid = await user.verifyPassword("");
      expect(isValid).toBe(false);
    });
  });
});
