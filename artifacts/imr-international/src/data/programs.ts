export interface PageContent {
  title: string;
  subtitle?: string;
  overview: string;
  highlights?: string[];
  duration?: string;
  eligibility?: string;
  topics?: string[];
  career?: string;
}

export const PAGE_DATA: Record<string, Record<string, PageContent>> = {
  about: {
    "imr-international": {
      title: "About IMR INTERNATIONAL",
      overview: "IMR INTERNATIONAL is a premier Educational Technology Organization located in Bhubaneswar, Odisha. We are dedicated to providing SMART DIGITAL INNOVATION programs and comprehensive skill development to bridge the gap between academia and industry.",
      highlights: ["State-of-the-art Infrastructure", "Industry-aligned Curriculum", "Expert Faculty", "100% Placement Assistance"],
    },
    "objectives": {
      title: "Our Objectives",
      overview: "To foster excellence in education by offering world-class training in technology and management, ensuring our graduates are corporate-ready from day one.",
      highlights: ["Bridging the skills gap", "Fostering entrepreneurial mindset", "Promoting continuous learning"],
    },
    "mission-vision": {
      title: "Mission & Vision",
      subtitle: "Guiding our path to educational excellence",
      overview: "Vision: To be a globally recognized center of excellence in modern education. \n\nMission: To empower individuals with cutting-edge knowledge, ethical values, and leadership skills necessary to thrive in a digital economy.",
    },
    "recognition": {
      title: "Recognition & Accreditations",
      overview: "IMR International is recognized by top educational bodies and affiliated with leading universities to ensure degrees are highly valued and globally accepted.",
      highlights: ["A+ Grade Accreditations", "UGC Approved Degree Programs", "ISO 9001:2015 Certified"],
    },
    "principal-message": {
      title: "Message from the Principal",
      overview: "Welcome to IMR International. Our commitment to academic rigor and practical exposure ensures that every student transforms into a dynamic professional capable of solving real-world challenges. Join us to unlock your full potential.",
    },
    "executive-board": {
      title: "Executive Board",
      overview: "Our Executive Board comprises visionary leaders, veteran academicians, and industry stalwarts dedicated to driving IMR's strategic initiatives forward.",
    },
    "advisory-board": {
      title: "Advisory Board",
      overview: "The Advisory Board provides crucial guidance to keep our curriculum updated with the latest industry trends, bridging the gap between theoretical knowledge and practical application.",
    },
    "governing-body": {
      title: "Governing Body",
      overview: "The Governing Body is the highest decision-making entity at IMR International, ensuring compliance, ethical standards, and academic excellence across all departments.",
    },
    "president-message": {
      title: "President's Message",
      overview: "Education is the most powerful weapon which you can use to change the world. At IMR, we are building an ecosystem that nurtures innovation, leadership, and technical prowess.",
    },
    "chairman-message": {
      title: "Chairman's Message",
      overview: "We strive to create a holistic learning environment. Our focus on Smart Education ensures our students are not just degree holders, but industry-ready professionals.",
    }
  },
  education: {
    "bba": {
      title: "Bachelor of Business Administration (BBA)",
      subtitle: "Professional Management Education",
      overview: "A comprehensive 3-year degree program designed to impart fundamental management skills, business acumen, and leadership qualities.",
      duration: "3 Years",
      eligibility: "10+2 Any Stream",
      topics: ["Principles of Management", "Marketing Management", "Financial Accounting", "Human Resource Management", "Business Economics", "Organizational Behavior"],
      career: "Business Analyst, Marketing Manager, Financial Advisor, HR Executive, Entrepreneur",
    },
    "bca": {
      title: "Bachelor of Computer Application (BCA)",
      subtitle: "Professional Technical Education",
      overview: "Build a strong foundation in computer science, software development, and modern technologies with this intensive 3-year program.",
      duration: "3 Years",
      eligibility: "10+2 with Mathematics",
      topics: ["C & C++ Programming", "Java & Python", "Database Management Systems", "Web Development", "Data Structures", "Software Engineering"],
      career: "Software Developer, System Analyst, Web Designer, IT Consultant, Database Administrator",
    },
    "bsc-data-science": {
      title: "BSc in Data Science",
      subtitle: "Professional Analytical Education",
      overview: "Dive into the world of big data, predictive analytics, and machine learning. This program is tailored for the data-driven future.",
      duration: "3 Years",
      eligibility: "10+2 with Science/Mathematics",
      topics: ["Advanced Statistics", "Machine Learning Algorithms", "Big Data Analytics", "Python & R Programming", "Data Visualization", "Cloud Computing"],
      career: "Data Scientist, Data Analyst, Machine Learning Engineer, Business Intelligence Analyst",
    },
    "skill-based-program": {
      title: "Skill-Based Program",
      overview: "Short-term intensive programs designed to impart specific technical and soft skills required in today's corporate environments.",
    },
    "leadership-program": {
      title: "Leadership Program",
      overview: "Advanced training modules focusing on strategic thinking, team management, and corporate leadership for aspiring managers.",
    },
    "campus-to-corporate": {
      title: "Campus to Corporate Program",
      overview: "A bridging program that prepares fresh graduates for corporate life through intensive training in communication, etiquette, and corporate tools.",
    },
    "adaptive-learning": {
      title: "Adaptive Learning Program",
      overview: "AI-driven educational tracks that adapt to the student's learning pace, ensuring maximum retention and understanding.",
    },
    "smart-employability": {
      title: "SMART Employability Program",
      overview: "A holistic program integrating tech skills, communication, and aptitude training to guarantee high placement rates.",
    },
    "collaborative-sprint": {
      title: "Collaborative Sprint Program",
      overview: "Project-based learning where students work in agile sprints to develop software or business solutions, simulating real industry workflows.",
    }
  },
  certification: {
    "ai-machine-learning": {
      title: "AI & Machine Learning Certification",
      subtitle: "Technology Certificate",
      overview: "Master the algorithms that power modern AI. Learn to build predictive models and deep learning networks from scratch.",
      duration: "6 Months",
      eligibility: "Graduates / Final Year Students",
      topics: ["Python Fundamentals", "Supervised & Unsupervised Learning", "Neural Networks & Deep Learning", "Natural Language Processing (NLP)", "Computer Vision"],
      career: "AI Engineer, ML Researcher, Data Scientist",
    },
    "data-science-python": {
      title: "Data Science with Python-R",
      subtitle: "Technology Certificate",
      overview: "Comprehensive training in data wrangling, visualization, and predictive modeling using industry-standard tools.",
      duration: "4 Months",
      topics: ["Pandas & NumPy", "Statistical Analysis", "Data Visualization (Matplotlib/Seaborn)", "R Programming basics", "Predictive Modeling"],
      career: "Data Analyst, Data Consultant",
    },
    "business-data-analytics": {
      title: "Business Data Analytics",
      overview: "Learn to translate raw data into actionable business insights using modern BI tools and techniques.",
      duration: "3 Months",
      topics: ["Tableau & PowerBI", "SQL for Data Analysis", "Business Intelligence", "KPI Dashboarding"],
    },
    "ethical-hacking": {
      title: "Ethical Hacking",
      overview: "Secure networks and applications by learning how to find vulnerabilities before malicious attackers do.",
      duration: "3 Months",
      topics: ["Penetration Testing", "Network Security", "Kali Linux", "Vulnerability Assessment", "OWASP Top 10"],
    },
    "blockchain-technology": {
      title: "Blockchain Technology",
      overview: "Explore the decentralized future. Learn to build smart contracts, dApps, and understand cryptographic principles.",
      duration: "4 Months",
      topics: ["Blockchain Fundamentals", "Ethereum & Smart Contracts", "Solidity Programming", "DeFi Concepts"],
    },
    "digital-marketing": {
      title: "Digital Marketing",
      subtitle: "Management Certificate",
      overview: "Master the art of online marketing, SEO, social media strategies, and digital campaign management.",
      duration: "3 Months",
      topics: ["Search Engine Optimization (SEO)", "Social Media Marketing (SMM)", "Content Strategy", "Google Ads & Analytics"],
    },
    "financial-technology": {
      title: "Financial Technology (FinTech)",
      overview: "Understand the intersection of finance and technology, covering digital banking, payment gateways, and algorithmic trading.",
    },
    "project-management": {
      title: "Project Management",
      overview: "Learn agile and waterfall methodologies to successfully lead projects from inception to completion.",
      topics: ["Agile & Scrum", "Risk Management", "Resource Allocation", "Jira & Asana tools"],
    },
    "hr-analytics": {
      title: "HR Analytics",
      overview: "Apply data science principles to Human Resources to optimize talent acquisition, retention, and performance.",
    },
    "supply-chain-analytics": {
      title: "Supply Chain Analytics",
      overview: "Use data to optimize logistics, inventory management, and operational efficiency across the supply chain.",
    },
    "live-project": {
      title: "Live Project",
      subtitle: "Project and Internship",
      overview: "Work on real-time industry projects under the guidance of corporate mentors, gaining invaluable practical experience.",
      duration: "2-3 Months",
    },
    "summer-internship": {
      title: "Summer Internship Project",
      subtitle: "Project and Internship",
      overview: "An immersive 8-week program in top partner companies to apply academic knowledge to real business problems.",
      duration: "8 Weeks",
    }
  },
  focus: {
    "centre-for-research": {
      title: "Centre for Research",
      overview: "Dedicated to advancing knowledge through rigorous academic and applied research in technology and management domains.",
    },
    "training-placement": {
      title: "Centre for Training & Placement",
      overview: "Bridging the gap between students and top employers through continuous aptitude training, resume building, and campus recruitment drives.",
    },
    "student-development": {
      title: "Centre for Student Development",
      overview: "Focusing on holistic growth, offering soft skills training, psychological counseling, and extracurricular engagements.",
    },
    "women-empowerment": {
      title: "Centre for Women Empowerment",
      overview: "Dedicated to promoting female leadership in tech and business through specialized scholarships, mentorship, and support networks.",
    },
    "consulting-nba": {
      title: "Centre for Consulting - NBA",
      overview: "Assisting institutions and businesses with compliance, quality assurance, and accreditation processes for NBA standards.",
    },
    "consulting-naac": {
      title: "Centre for Consulting - NAAC",
      overview: "Expert consulting services for academic institutions striving for superior NAAC accreditations and internal quality enhancements.",
    }
  },
  insights: {
    "faculty-council": {
      title: "Faculty Council",
      overview: "Our esteemed faculty council ensures academic rigor, updates curricula, and fosters an environment of continuous learning and research.",
    },
    "student-club": {
      title: "30 Student Club",
      overview: "An exclusive, high-performance cohort of top-tier students engaged in advanced projects, hackathons, and leadership retreats.",
    },
    "boot-camp": {
      title: "20-20 Boot Camp",
      overview: "Intensive 20-day coding and business strategy bootcamps designed to rapid-skill participants in emerging technologies.",
    }
  },
  admission: {
    "process": {
      title: "Admission Process",
      overview: "Step-by-step guide to joining IMR International. Learn about application deadlines, entrance exams, and interview rounds.",
      highlights: ["Online Application", "Aptitude Test", "Personal Interview", "Document Verification"],
    },
    "scholarship": {
      title: "Scholarship Programs",
      overview: "We believe in rewarding merit. Explore our range of academic, sports, and need-based scholarships offering up to 100% tuition waivers.",
    },
    "educational-loan": {
      title: "Educational Loan Assistance",
      overview: "Partnered with leading national banks to provide hassle-free, low-interest educational loans for deserving students.",
    }
  }
};
