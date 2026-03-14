import { Router, type Request, type Response } from "express";
import { db, enquiriesTable } from "@workspace/db";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, phone, program, message } = req.body as {
      name: string;
      email: string;
      phone: string;
      program: string;
      message?: string;
    };

    if (!name || !email || !phone || !program) {
      res.status(400).json({ error: "Name, email, phone and program are required" });
      return;
    }

    await db.insert(enquiriesTable).values({
      name,
      email: email.toLowerCase(),
      phone,
      program,
      message: message ?? null,
    });

    res.status(201).json({ message: "Your enquiry has been submitted! We will contact you shortly." });
  } catch (err) {
    console.error("Enquiry error:", err);
    res.status(500).json({ error: "Failed to submit enquiry. Please try again." });
  }
});

export default router;
