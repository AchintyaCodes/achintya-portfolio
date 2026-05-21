// Personal Data - Achintya Gupta Portfolio
// All personal information centralized in one file

export const personalInfo = {
  // Basic Information
  name: "ACHINTYA",
  fullName: "Achintya Gupta",
  headline: "Driven by logic",
  tagline: "Building robust software, automating the complex and focused on transforming static systems into intelligent ones.",
  
  // Contact Information
  email: "achintya.mann@gmail.com",
  location: "Udupi, India",
  
  // Social Links
  social: {
    github: "https://github.com/AchintyaCodes",
    linkedin: "https://linkedin.com/in/achintya-gupta-bb0091311",
    email: "mailto:achintya.mann@gmail.com"
  },
  
  // Resume
  resume: "/resume.pdf",
  
  // Availability Status
  availability: {
    status: "Open to internships",
    isAvailable: true
  }
};

export const education = {
  institution: "Manipal Institute of Technology, MAHE",
  degree: "B.Tech in Data Science & Engineering",
  duration: "Aug 2024 – Present",
  location: "Udupi, India",
  coursework: [
    "Data Structures & Algorithms",
    "Statistical Modeling", 
    "Linear Algebra & Probability",
    "Database Management Systems"
  ]
};

export const experience = [
  {
    id: "001",
    company: "AIESEC, Manipal Institute of Technology",
    position: "Technology & Operations Lead",
    type: "Student Volunteer",
    duration: "Feb 2025 – Present",
    location: "Udupi, Karnataka, India",
    description: "Engineered Python + Google Sheets API automation consolidating 100% of pipeline data into real-time dashboards, cutting reporting overhead by 40%. Restructured outreach targeting across 50+ enterprise accounts, lifting conversion to 35% and generating $1,600+ in chapter revenue.",
    achievements: [
      "B2B pipeline tracked manually across disconnected spreadsheets with 2-day reporting lag – engineered Python + Google Sheets API automation consolidating 100% of pipeline data into real-time dashboards, cutting reporting overhead by 40% and enabling same-day decision-making",
      "Chapter conversion rate stalled below 20% – restructured outreach targeting and pitch sequencing across 50+ enterprise accounts, lifting conversion to 35% and generating $1,600+ in chapter revenue",
      "Identified 3 critical workflow handoff failures causing deal-close delays – redesigned pipeline logic, reducing operational cycle time by 30% and increasing throughput by 30% while coordinating a team of 7"
    ]
  }
];

export const projects = [
  {
    id: "001",
    title: "FraudGuard AI",
    stack: "Python, FastAPI, XGBoost, SHAP, Llama 3.3 70B, Next.js, Vercel",
    description: "Fraud analysts spend 40+ mins writing compliance reports per flagged transaction – deployed Llama 3.3 70B via Groq API to auto-generate Basel III compliant audit narratives directly from SHAP explainability outputs, reducing narrative generation to under 3 seconds. Underlying XGBoost pipeline processes 284,807 transactions against 0.17% fraud prevalence baseline; hybrid SMOTE resampling elevated fraud recall to 70%+, achieving 99.85% accuracy and 0.968 AUC-ROC – modeled $2M+ fraud prevention impact at production volumes.",
    links: { 
      live: "https://fraudguard-ai-omega.vercel.app/",
      code: "https://github.com/AchintyaCodes/fraud-audit-llm"
    },
    image: "/p1.png",
    cta: "View Project",
    technologies: ["Python", "FastAPI", "XGBoost", "SHAP", "Llama 3.3 70B", "Next.js", "Vercel", "Groq API"],
    highlights: [
      "99.85% accuracy with 0.968 AUC-ROC",
      "70%+ fraud recall rate",
      "Sub-3 second report generation",
      "$2M+ fraud prevention impact"
    ]
  },
  {
    id: "002", 
    title: "Quantitative Portfolio Risk Platform",
    stack: "Python, FastAPI, Next.js, NumPy, SciPy, Pandas",
    description: "Retail portfolio tools lack institutional risk metrics – engineered platform executing 8 quantitative models on live market data including Monte Carlo simulation (200 scenarios, 252-day horizon) and Markowitz mean-variance optimization. Delivered risk reporting suite computing VaR (95%/99%), CVaR/Expected Shortfall, maximum drawdown, and portfolio beta – metric set consistent with Basel III standards used in trading and asset management.",
    links: { 
      live: "https://portfolio-risk-intelligence-platfor.vercel.app/",
      code: "https://github.com/AchintyaCodes/portfolio-risk-intelligence-platform"
    },
    image: "/p2.png", 
    cta: "View Project",
    technologies: ["Python", "FastAPI", "Next.js", "NumPy", "SciPy", "Pandas"],
    highlights: [
      "8 quantitative risk models",
      "Monte Carlo simulation (200 scenarios)",
      "Basel III compliant metrics",
      "Sub-2s response time"
    ]
  },
  {
    id: "003",
    title: "FinFlow – Full-Stack Financial Analytics Platform", 
    stack: "Next.js, FastAPI, PostgreSQL, JWT",
    description: "Designed and shipped full-SDLC SaaS finance dashboard from architecture through CI/CD deployment – JWT/bcrypt application security, 4 transactional CRUD modules, real-time revenue visualization, serverless PostgreSQL on Neon/Vercel with zero cold-start latency.",
    links: { 
      live: "https://finflow-dashboard-virid.vercel.app/",
      code: "https://github.com/AchintyaCodes/finflow-dashboard"
    },
    image: "/p3.png",
    cta: "View Project", 
    technologies: ["Next.js", "FastAPI", "PostgreSQL", "JWT", "bcrypt"],
    highlights: [
      "Full-SDLC SaaS platform",
      "JWT/bcrypt security",
      "Real-time visualization", 
      "Zero cold-start latency"
    ]
  }
];

export const skills = {
  languages: [
    "Python", "Java", "C++", "SQL", "TypeScript", "JavaScript (ES6+)", "R"
  ],
  foundations: [
    "Data Structures & Algorithms", "SDLC", "Agile", "CI/CD", 
    "Application Security", "Scalable Systems Design"
  ],
  mlAndData: [
    "Machine Learning", "LLM Integration", "RAG", "XGBoost", "SHAP", 
    "SMOTE", "Pandas", "NumPy", "Scikit-Learn"
  ],
  quantFinance: [
    "Financial Modeling", "Risk Analytics (VaR/CVaR)", "Portfolio Optimization", 
    "Monte Carlo", "Fraud Detection"
  ],
  cloudAndTools: [
    "Vercel", "Render", "Hugging Face Hub", "Groq API", "FastAPI", 
    "Next.js", "PostgreSQL", "REST APIs", "Docker", "Git"
  ]
};

export const certifications = [
  {
    name: "Google Data Analytics Professional",
    issuer: "Google"
  },
  {
    name: "IBM Python for Data Science", 
    issuer: "IBM"
  },
  {
    name: "Meta Data Analytics",
    issuer: "Meta"
  },
  {
    name: "McKinsey Forward Program",
    issuer: "McKinsey & Company"
  }
];

export const achievements = [
  {
    title: "Case-a-thon 2026",
    description: "Advanced to Round 2 of 3 across 438 registered participants",
    organization: "MIT Manipal, Strategy & Business Analysis"
  },
  {
    title: "GSSoC 2026",
    description: "Selected Contributor, AI/Agents Track",
    organization: "30,000+ participants"
  }
];

export const focus = [
  "ML Engineering & Quantitative Analytics",
  "Financial Technology & Risk Modeling", 
  "LLM Integration & Process Automation",
  "Scalable Infrastructure & Full-Stack Development"
];

export const aboutMe = {
  title: "Background & Data",
  sections: [
    {
      id: "01",
      title: "Education",
      content: education
    },
    {
      id: "02", 
      title: "Experience",
      content: experience
    },
    {
      id: "03",
      title: "Focus",
      content: focus
    }
  ]
};

// Professional Summary
export const profile = "Second-year Data Science & Engineering student at MIT Manipal with 4 production-deployed financial software systems – spanning LLM-powered fraud audit, quantitative risk modeling, and full-stack SaaS analytics. Seeking internship roles in ML engineering, quantitative analytics, or financial technology where statistical modeling meets scalable infrastructure.";