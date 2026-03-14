import { Router, type Request, type Response } from "express";
import { openai } from "@workspace/integrations-openai-ai-server";

const router = Router();

const SYSTEM_PROMPT = `You are an AI assistant for IMR INTERNATIONAL (International Institute for Management and Research), located in Bhubaneswar, Odisha, India. You help prospective students, parents, and professionals learn about the institution's programs, admission process, and other details.

Key facts about IMR International:
- Location: 07 District Centre, CS Pur, Bhubaneswar, Odisha
- Phone: +91-9938080165
- Email: imrinternational11@gmail.com
- Tagline: SMART – DIGITAL – INNOVATION

Programs offered:
PROFESSIONAL EDUCATION (Degree Programs):
- BBA (Bachelor of Business Administration) - 3 years, eligibility: 10+2 any stream
- BCA (Bachelor of Computer Application) - 3 years, eligibility: 10+2 with Math
- BSc Data Science - 3 years, eligibility: 10+2 with Science/Math

DIGITAL CERTIFICATION PROGRAMS (Short-term):
- AI & Machine Learning - 6 months
- Data Science with Python-R - 4 months
- Business Data Analytics - 3 months
- Ethical Hacking - 3 months
- Blockchain Technology - 4 months
- Digital Marketing - 3 months
- Financial Technology - 3 months
- Project Management - 3 months
- HR Analytics - 3 months
- Supply Chain Analytics - 3 months
- Live Project (internship) - 2-3 months
- Summer Internship - 8 weeks

CORPORATE EDUCATION:
- Skill-Based Programs, Leadership Programs, Campus to Corporate

ADMISSION:
- Online applications are open for Academic Session 2026-27
- Scholarships available (merit-based, need-based, up to 100% tuition waiver)
- Educational loan assistance available through partner banks

Be friendly, helpful, and encouraging. Keep responses concise and relevant. If asked about something you don't know, direct them to contact the institute directly.`;

router.post("/", async (req: Request, res: Response) => {
  try {
    const { messages } = req.body as {
      messages: Array<{ role: "user" | "assistant"; content: string }>;
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: "Messages are required" });
      return;
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const stream = await openai.chat.completions.create({
      model: "gpt-5-mini",
      max_completion_tokens: 512,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.slice(-10),
      ],
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (err) {
    console.error("Chat error:", err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Chat failed. Please try again." });
    } else {
      res.write(`data: ${JSON.stringify({ error: "Something went wrong" })}\n\n`);
      res.end();
    }
  }
});

export default router;
