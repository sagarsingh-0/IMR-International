import { Router, type Request, type Response } from "express";

const router = Router();

// Extend session to carry admin flag
declare module "express-session" {
  interface SessionData {
    isAdmin?: boolean;
  }
}

const ADMIN_USERNAME = process.env["ADMIN_USERNAME"] ?? "imradmin";
const ADMIN_PASSWORD = process.env["ADMIN_PASSWORD"] ?? "IMR@Analytics2024";

// POST /api/admin/login
router.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body as { username: string; password: string };

  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return;
  }

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    req.session.isAdmin = true;
    res.json({ success: true, message: "Admin login successful" });
    return;
  }

  res.status(401).json({ error: "Invalid admin credentials" });
});

// GET /api/admin/me — check session
router.get("/me", (req: Request, res: Response) => {
  if (req.session.isAdmin) {
    res.json({ isAdmin: true });
    return;
  }
  res.status(401).json({ error: "Not authenticated as admin" });
});

// POST /api/admin/logout
router.post("/logout", (req: Request, res: Response) => {
  req.session.isAdmin = false;
  req.session.save(() => {
    res.json({ success: true });
  });
});

export default router;
