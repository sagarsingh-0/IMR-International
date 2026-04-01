import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content: "Hello! 👋 I'm your IMR International assistant. I can help you with information about our programs, admission process, certifications, scholarships, and more. How can I help you today?"
};

const QUICK_QUESTIONS = [
  "What programs are available?",
  "How to apply for admission?",
  "Tell me about BBA program",
  "AI & Machine Learning course",
  "Scholarship information",
];

// ─── Rule-based responses ──────────────────────────────────────────────────────
function getLocalResponse(input: string): string {
  const q = input.toLowerCase().trim();

  // Programs list
  if (/(what|which|list|all|show).*(program|course|offer|available)/i.test(q) || q === "programs") {
    return `🎓 **IMR International offers three categories of programs:**\n\n**Professional Degree Programs (3 years):**\n• BBA – Bachelor of Business Administration\n• BCA – Bachelor of Computer Application\n• BSc Data Science\n\n**Digital Certifications (Short-term):**\n• AI & Machine Learning (6 months)\n• Data Science with Python & R (4 months)\n• Ethical Hacking, Blockchain, Digital Marketing & more\n\n**Corporate Education:**\n• Skill-Based Programs, Leadership, Campus to Corporate\n\nType a program name to know more details!`;
  }

  // BBA
  if (/\bbba\b|business administration/i.test(q)) {
    return `📚 **BBA – Bachelor of Business Administration**\n\n• Duration: 3 years (6 semesters)\n• Eligibility: 10+2 in any stream\n• Average Salary: ₹4–8 LPA after graduation\n• Placement Rate: 85%+\n\n**Highlights:**\n✅ Industry-integrated curriculum\n✅ Live projects & internships\n✅ Leadership & entrepreneurship modules\n✅ 10,000+ alumni network\n\nClick **"Apply Now"** on our website or contact us at +91-9938080165!`;
  }

  // BCA
  if (/\bbca\b|computer application/i.test(q)) {
    return `💻 **BCA – Bachelor of Computer Application**\n\n• Duration: 3 years (6 semesters)\n• Eligibility: 10+2 with Mathematics\n• Average Salary: ₹5–10 LPA\n• Placement Rate: 88%+\n\n**Highlights:**\n✅ Full-stack development training\n✅ Cloud computing & DevOps modules\n✅ Industry certifications included\n✅ Hackathons & coding competitions\n\nInterested? Call us at +91-9938080165!`;
  }

  // BSc Data Science
  if (/bsc|data science degree|bachelor.*data/i.test(q)) {
    return `📊 **BSc Data Science**\n\n• Duration: 3 years (6 semesters)\n• Eligibility: 10+2 with Science/Mathematics\n• Average Salary: ₹6–12 LPA\n• One of the fastest-growing fields!\n\n**Highlights:**\n✅ Python, R, SQL, Machine Learning\n✅ Real-world datasets & projects\n✅ Internship with data companies\n✅ AI & analytics tools training\n\nApply now for 2026–27 batch!`;
  }

  // AI & Machine Learning
  if (/ai|machine learning|artificial intelligence/i.test(q)) {
    return `🤖 **AI & Machine Learning Certification**\n\n• Duration: 6 months\n• Mode: Online + Offline (Hybrid)\n• Eligibility: 10+2 or working professionals\n\n**Topics Covered:**\n✅ Python for AI, TensorFlow, PyTorch\n✅ Supervised & Unsupervised Learning\n✅ Deep Learning, Neural Networks\n✅ NLP & Computer Vision\n✅ Real-world AI project\n\n📞 Contact: +91-9938080165\n📧 imrinternational11@gmail.com`;
  }

  // Data Science cert
  if (/data science.*cert|certification.*data|python.*data|data.*python/i.test(q)) {
    return `📈 **Data Science with Python & R Certification**\n\n• Duration: 4 months\n• Perfect for beginners & professionals\n\n**Topics:** Python, R, Pandas, NumPy, Data Visualization, Tableau, Statistical Analysis, Machine Learning basics\n\n📞 Enquire: +91-9938080165`;
  }

  // Ethical Hacking
  if (/ethical hack|cybersecurity|hacking|cyber security/i.test(q)) {
    return `🔐 **Ethical Hacking Certification**\n\n• Duration: 3 months\n• Learn to think like a hacker — defensively!\n\n**Topics:** Network Security, Penetration Testing, OWASP, Kali Linux, Vulnerability Assessment, CEH preparation\n\n📞 Contact: +91-9938080165`;
  }

  // Digital Marketing
  if (/digital marketing/i.test(q)) {
    return `📱 **Digital Marketing Certification**\n\n• Duration: 3 months\n• Ideal for entrepreneurs & marketing professionals\n\n**Topics:** SEO, SEM, Social Media Marketing, Google Ads, Meta Ads, Email Marketing, Analytics, Content Strategy\n\n📞 Contact: +91-9938080165`;
  }

  // Blockchain
  if (/blockchain/i.test(q)) {
    return `⛓️ **Blockchain Technology Certification**\n\n• Duration: 4 months\n• Learn the technology powering Web3!\n\n**Topics:** Blockchain fundamentals, Ethereum, Smart Contracts, DApps, NFTs, Crypto concepts\n\n📞 Contact: +91-9938080165`;
  }

  // Admission / how to apply
  if (/how.*apply|admission process|apply|enroll|enroll|register/i.test(q)) {
    return `📋 **How to Apply to IMR International:**\n\n**Step 1:** Visit our website and click "Admission Enquiry"\n**Step 2:** Fill out the online enquiry form with your details\n**Step 3:** Our team will contact you within 24 hours\n**Step 4:** Complete the registration and document verification\n**Step 5:** Pay the admission fee and confirm your seat\n\n📞 Helpline: +91-9938080165\n📧 Email: imrinternational11@gmail.com\n📍 Visit us: 07 District Centre, CS Pur, Bhubaneswar\n\nAdmissions are open for **2026–27 academic session!**`;
  }

  // Scholarship
  if (/scholar|discount|fee waiver|financial|merit/i.test(q)) {
    return `🏆 **Scholarships at IMR International:**\n\n• **Merit Scholarship** – Up to 100% tuition waiver for top academic performers\n• **Need-Based Scholarship** – Financial support for economically weaker sections\n• **Sports Excellence** – For state/national level athletes\n• **Women in Tech** – Special grants for women in STEM\n• **Alumni Referral** – 10% concession for alumni referrals\n• **Early Bird** – 5% additional discount for early applications\n• **SC/ST/OBC Reservation** – Government-mandated reservations honored\n\nContact us to check your eligibility: +91-9938080165`;
  }

  // Loan
  if (/loan|bank|finance|emi|financ/i.test(q)) {
    return `🏦 **Educational Loan Assistance:**\n\n• Partnered with **10+ national banks** (SBI, BOI, Union Bank, Canara Bank & more)\n• Loan amounts up to **₹15 Lakhs**\n• Starting interest rate: **8.5% p.a.**\n• No collateral required up to ₹7.5 Lakh\n• Repayment begins after course completion or placement\n• Dedicated loan helpdesk at IMR campus\n\n📞 Loan Helpdesk: +91-9938080165`;
  }

  // Fees / cost
  if (/fee|cost|price|charge|tuition|how much/i.test(q)) {
    return `💰 **Program Fees:**\n\nFor accurate and up-to-date fee information, please contact our admissions team directly:\n\n📞 **+91-9938080165**\n📧 **imrinternational11@gmail.com**\n📍 **07 District Centre, CS Pur, Bhubaneswar**\n\nWe also offer flexible payment plans and scholarship options to make education affordable for everyone!`;
  }

  // Contact / location
  if (/contact|phone|email|address|location|where|visit|reach/i.test(q)) {
    return `📍 **Contact IMR International:**\n\n🏫 **Address:** 07 District Centre, CS Pur, Bhubaneswar, Odisha\n📞 **Phone:** +91-9938080165\n📧 **Email:** imrinternational11@gmail.com\n🌐 **Website:** Available online\n\n**Social Media:**\n• Facebook | Twitter | LinkedIn | Instagram\n\n⏰ **Office Hours:** Mon–Sat, 9:00 AM – 5:30 PM`;
  }

  // Placement / jobs / career
  if (/placement|job|career|salary|recruit|hire|campus/i.test(q)) {
    return `💼 **Placement & Career Support:**\n\n✅ **85–90% placement rate** across programs\n✅ Dedicated **Centre for Training & Placement**\n✅ Campus recruitment drives with top companies\n✅ Resume building & interview preparation\n✅ Industry mentorship programs\n✅ 10,000+ strong alumni network for referrals\n\nAverage salary packages range from **₹4–12 LPA** depending on your program and specialization.\n\n📞 Career Helpdesk: +91-9938080165`;
  }

  // About IMR
  if (/about|imr|college|institution|university|recognition|grade|naac|nba/i.test(q)) {
    return `🏛️ **About IMR International:**\n\nIMR International (Institute for Management and Research) is a premier educational institution in Bhubaneswar, Odisha.\n\n**Tagline:** Smart • Digital • Innovation\n\n**Key Highlights:**\n🏆 A+ Grade Recognition\n📚 25+ Digital Programs\n👥 10,000+ Alumni Network\n🎯 SMART, Digital & Innovation-focused education\n\n**Focus Centers:**\n• Centre for Research\n• Centre for Training & Placement\n• Centre for Student Development\n• Centre for Women Empowerment\n• Centre for Consulting (NBA, NAAC)\n\n📍 07 District Centre, CS Pur, Bhubaneswar`;
  }

  // Greetings
  if (/^(hi|hello|hey|good morning|good afternoon|good evening|namaste)[\s!.]*$/i.test(q)) {
    return `Hello! 👋 Welcome to **IMR International**!\n\nI'm here to help you with information about:\n• 🎓 Our degree & certification programs\n• 📋 Admission process\n• 🏆 Scholarships & financial aid\n• 💼 Placements & career support\n• 📍 Contact & location\n\nWhat would you like to know?`;
  }

  // Thanks
  if (/thank|thanks|great|awesome|helpful|perfect|good/i.test(q)) {
    return `You're welcome! 😊 \n\nIs there anything else I can help you with? Feel free to ask about our programs, admissions, scholarships, or anything else about IMR International!\n\n📞 You can also reach us directly at **+91-9938080165**.`;
  }

  // Default fallback
  return `I'm not sure about that specific topic, but I'd be happy to help! Here's what I can answer:\n\n• 🎓 **Programs** – BBA, BCA, BSc Data Science, Certifications\n• 📋 **Admissions** – How to apply, eligibility, process\n• 🏆 **Scholarships** – Merit, need-based, sports, women in tech\n• 💰 **Fees & Loans** – Fee structure, bank loan assistance\n• 💼 **Placements** – Career support, salary stats\n• 📍 **Contact** – Phone, email, address\n\nFor detailed queries, please contact us at:\n📞 **+91-9938080165**\n📧 **imrinternational11@gmail.com**`;
}

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Simulate natural typing delay
    const delay = 600 + Math.random() * 800;
    await new Promise(resolve => setTimeout(resolve, delay));

    const responseText = getLocalResponse(text);

    setMessages(prev => [...prev, { role: "assistant", content: responseText }]);
    setLoading(false);
  };

  // Format markdown-like text to JSX
  const formatMessage = (text: string) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        return <p key={i} className="font-bold text-foreground">{line.slice(2, -2)}</p>;
      }
      // Bold inline
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <p key={i} className={line === "" ? "h-1" : ""}>
          {parts.map((part, j) =>
            j % 2 === 1 ? <strong key={j}>{part}</strong> : part
          )}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-500/30 hover:scale-110 hover:-translate-y-1 transition-all duration-300 group"
        aria-label="Chat with us"
      >
        <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20"></div>
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle className="w-7 h-7 fill-current" />
            </motion.div>
          )}
        </AnimatePresence>
        {!open && (
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900 text-white text-sm font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap shadow-xl">
            Chat with us!
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full border-8 border-transparent border-l-slate-900"></div>
          </div>
        )}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-28 right-8 z-50 w-[360px] sm:w-[400px] bg-white rounded-2xl shadow-2xl shadow-black/15 border border-border flex flex-col overflow-hidden"
            style={{ maxHeight: "calc(100vh - 160px)", height: 520 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-blue-700 px-4 py-3 flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">IMR Assistant</p>
                <p className="text-white/70 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block"></span>
                  Online · Always available
                </p>
              </div>
              <button onClick={() => setOpen(false)} className="ml-auto text-white/70 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === "user" ? "bg-primary" : "bg-accent"}`}>
                    {msg.role === "user" ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                  </div>
                  <div className={`max-w-[78%] px-3 py-2 rounded-2xl text-sm leading-relaxed space-y-0.5 ${
                    msg.role === "user"
                      ? "bg-primary text-white rounded-tr-sm"
                      : "bg-white text-foreground rounded-tl-sm shadow-sm border border-border/50"
                  }`}>
                    {msg.role === "assistant" ? formatMessage(msg.content) : msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center bg-accent">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="px-3 py-2 bg-white rounded-2xl rounded-tl-sm shadow-sm border border-border/50">
                    <span className="flex gap-1 items-center h-4">
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    </span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick Questions */}
            {messages.length <= 1 && (
              <div className="px-3 py-2 flex gap-1.5 flex-wrap bg-slate-50 border-t border-border/50 flex-shrink-0">
                {QUICK_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(q)}
                    className="text-xs px-2.5 py-1.5 bg-white border border-border rounded-full text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-border bg-white flex-shrink-0">
              <form
                onSubmit={e => { e.preventDefault(); sendMessage(input); }}
                className="flex gap-2"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  disabled={loading}
                  className="flex-1 px-3 py-2 text-sm bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-muted-foreground disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="w-9 h-9 bg-primary hover:bg-primary/90 text-white rounded-xl flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
