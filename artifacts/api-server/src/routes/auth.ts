import { Router, type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import { db, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

declare module "express-session" {
  interface SessionData {
    userId: number;
  }
}

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone } = req.body as {
      name: string;
      email: string;
      password: string;
      phone?: string;
    };

    if (!name || !email || !password) {
      res.status(400).json({ error: "Name, email and password are required" });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ error: "Password must be at least 6 characters" });
      return;
    }

    const existing = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email.toLowerCase()))
      .limit(1);

    if (existing.length > 0) {
      res.status(409).json({ error: "An account with this email already exists" });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const [user] = await db
      .insert(usersTable)
      .values({
        name,
        email: email.toLowerCase(),
        passwordHash,
        phone: phone ?? null,
      })
      .returning();

    req.session.userId = user.id;

    res.status(201).json({
      message: "Account created successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        createdAt: user.createdAt?.toISOString(),
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Registration failed. Please try again." });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email.toLowerCase()))
      .limit(1);

    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    req.session.userId = user.id;

    res.json({
      message: "Logged in successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        createdAt: user.createdAt?.toISOString(),
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed. Please try again." });
  }
});

router.post("/logout", (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.json({ message: "Logged out successfully" });
  });
});

router.get("/me", async (req: Request, res: Response) => {
  if (!req.session.userId) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  try {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, req.session.userId))
      .limit(1);

    if (!user) {
      req.session.destroy(() => {});
      res.status(401).json({ error: "User not found" });
      return;
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      createdAt: user.createdAt?.toISOString(),
    });
  } catch (err) {
    console.error("GetMe error:", err);
    res.status(500).json({ error: "Failed to get user info" });
  }
});

export default router;
