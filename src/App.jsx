import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { resumeBase64 } from './resumeDataUri.js';
import CursorTrail from './CursorTrail.jsx';

// Inline SVG Icon Components
const MailIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const PhoneIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const DownloadIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);

const SparklesIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" />
  </svg>
);

const CheckIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const AwardIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

const TrophyIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
  </svg>
);

const ExternalLinkIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" x2="21" y1="14" y2="3" />
  </svg>
);

export default function App() {
  const [downloading, setDownloading] = useState(false);
  const [projectFilter, setProjectFilter] = useState('ALL');

  const LINKEDIN_URL = "https://www.linkedin.com/in/bhavya-sai-m-3776b22b5/";
  const GITHUB_URL = "https://github.com/Bhavyasai0711";
  const PORTFOLIO_URL = "https://bhavya-portfolio-a82c.onrender.com";

  const handleDownloadResume = () => {
    setDownloading(true);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      const link = document.createElement('a');
      link.href = resumeBase64;
      link.download = 'Bhavya_Sai_Resume_Cognizant.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloading(false);
    }, 400);
  };

  const projectsList = [
    {
      title: "Employee Wellness Management Analytics",
      cat: "AI_ML",
      tech: "Python, Streamlit, SQL, Scikit-Learn, NLTK",
      desc: "Architected an end-to-end AI platform analyzing organizational sentiment and employee telemetry. Leveraged NLP feature extraction and supervised ML risk classification algorithms to forecast burnout with dynamic interactive Streamlit dashboards.",
      repo: "https://github.com/Bhavyasai0711/Employee-Wellness-Management-Analytics",
      badge: "AI / ML & Predictive Analytics",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200"
    },
    {
      title: "RTG Crane Cabin AI Safety Monitoring System",
      cat: "CV",
      tech: "Python, OpenCV, YOLOv8, Streamlit, PyTorch",
      desc: "Engineered a high-throughput computer vision pipeline for real-time industrial operator safety. Implemented fine-tuned YOLOv8 deep learning object detection for operator fatigue, facial distraction, and safety non-compliance alerts.",
      repo: "https://github.com/Bhavyasai0711",
      badge: "Industrial Computer Vision",
      badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200"
    },
    {
      title: "BCI Neural EEG Signal Classification Engine",
      cat: "DEEP_LEARNING",
      tech: "Python, PyTorch, EEGNet, DeepConvNet, ConvFocusNet",
      desc: "Developed spatial-temporal neural network architectures for brainwave signal decoding in Brain-Computer Interface (BCI) research. Applied spatial filtering and signal preprocessing to optimize feature extraction across multi-channel EEG datasets.",
      repo: "https://github.com/Bhavyasai0711/IFNet_-Brain-Computer-Interface",
      badge: "Neural Networks & BCI Deep Learning",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200"
    },
    {
      title: "Smart AI Agronomy & Precision Farming Platform",
      cat: "AI_ML",
      tech: "Python, React.js, Conversational AI, OpenWeather API",
      desc: "Built a multilingual conversational AI advisory platform for precision agriculture. Integrated machine learning crop recommendation engines, soil pH analytics, and real-time microclimate forecasting APIs.",
      repo: "https://github.com/Harini25-csm/AI-FARMING-Application",
      badge: "Conversational AI & Agritech",
      badgeColor: "bg-teal-50 text-teal-700 border-teal-200"
    },
    {
      title: "Enterprise Learning Management System (LMS)",
      cat: "FULL_STACK",
      tech: "React.js, Node.js, Express, MongoDB, JWT",
      desc: "Designed and deployed a secure, scalable role-based Learning Management System with JWT session authentication, RESTful API architecture, MongoDB aggregation pipelines, and course progress tracking.",
      repo: "https://github.com/Bhavyasai0711/LMS1",
      badge: "Full-Stack Cloud Architecture",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200"
    }
  ];

  const filteredProjects = projectFilter === 'ALL'
    ? projectsList
    : projectsList.filter(p => p.cat === projectFilter);

  return (
    <div className="min-h-screen text-slate-900 font-sans antialiased selection:bg-indigo-600 selection:text-white relative">
      
      {/* Interactive Glowing Cursor Ring & Sparkle Trail */}
      <CursorTrail />
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 font-outfit font-extrabold text-white text-sm flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              BS
            </div>
            <span className="font-outfit font-bold text-slate-900 text-lg tracking-tight group-hover:text-indigo-600 transition-colors">
              Madagani Bhavya Sai
            </span>
          </a>

          <nav className="hidden sm:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <a href="#about" className="hover:text-indigo-600 transition-colors py-1">About</a>
            <a href="#internships" className="hover:text-indigo-600 transition-colors py-1">Experience</a>
            <a href="#projects" className="hover:text-indigo-600 transition-colors py-1">Projects</a>
            <a href="#skills" className="hover:text-indigo-600 transition-colors py-1">Skills</a>
            <a href="#contact" className="hover:text-indigo-600 transition-colors py-1">Contact</a>
          </nav>

          <button
            onClick={handleDownloadResume}
            disabled={downloading}
            className="btn-indigo px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2"
          >
            <DownloadIcon className="w-4 h-4" />
            <span>{downloading ? 'Downloading...' : 'Download Resume'}</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-10 space-y-16">

        {/* Hero Section */}
        <section id="about" className="space-y-8 pt-4">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
            
            <div className="space-y-5 max-w-2xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50/90 border border-indigo-200 text-indigo-700 text-xs font-mono font-bold">
                <SparklesIcon className="w-3.5 h-3.5 text-indigo-600" />
                <span>AI & ML ENGINEER &nbsp;|&nbsp; 9.58 CGPA RANK 1</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-outfit font-extrabold text-slate-900 tracking-tight leading-tight">
                Madagani <span className="text-gradient-indigo">Bhavya Sai</span>
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                Results-driven Computer Science and Engineering (AI & ML) specialist with hands-on expertise in Artificial Intelligence, Deep Learning, Computer Vision, and Full-Stack System Architecture. Demonstrated track record building industrial computer vision monitoring pipelines, EEG neural signal classification models, and automated telemetry analytics platforms that increased operational efficiency by 20%. Seeking Software Engineer or AI/ML Engineer roles.
              </p>

              {/* Direct Quick Info Pills */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 text-xs font-mono">
                <span className="px-3 py-1.5 rounded-lg bg-white/90 border border-slate-200 text-slate-700 shadow-sm font-semibold">
                  📍 Kadapa, Andhra Pradesh, India
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-white/90 border border-slate-200 text-slate-700 shadow-sm font-semibold">
                  🎓 MITS B.Tech (2023 – 2027)
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 shadow-sm font-bold">
                  🏆 Department Rank 1: 9.58 / 10 CGPA
                </span>
              </div>

              {/* Connect Links */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2 text-slate-500 text-sm">
                <span className="text-slate-400 font-mono text-xs font-bold uppercase tracking-wider">Connect:</span>
                <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-lg bg-white/90 border border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-300 shadow-sm font-semibold flex items-center gap-1.5 transition-all text-xs">
                  <LinkedinIcon className="w-4 h-4 text-indigo-600" /> LinkedIn Profile
                </a>
                <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-lg bg-white/90 border border-slate-200 text-slate-700 hover:text-purple-600 hover:border-purple-300 shadow-sm font-semibold flex items-center gap-1.5 transition-all text-xs">
                  <GithubIcon className="w-4 h-4 text-purple-600" /> GitHub Repositories
                </a>
                <a href={PORTFOLIO_URL} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-lg bg-white/90 border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 shadow-sm font-semibold flex items-center gap-1.5 transition-all text-xs">
                  <ExternalLinkIcon className="w-4 h-4 text-blue-600" /> Render Live Portfolio
                </a>
                <a href="mailto:bhavyasaimadagani@gmail.com" className="px-3 py-1.5 rounded-lg bg-white/90 border border-slate-200 text-slate-700 hover:text-emerald-600 hover:border-emerald-300 shadow-sm font-semibold flex items-center gap-1.5 transition-all text-xs">
                  <MailIcon className="w-4 h-4 text-emerald-600" /> Direct Email
                </a>
              </div>
            </div>

            {/* Profile Avatar Card */}
            <div className="shrink-0 flex justify-center">
              <div className="w-52 h-64 sm:w-60 sm:h-72 rounded-2xl overflow-hidden border-2 border-slate-200/90 shadow-lg bg-white p-1.5 flex items-center justify-center relative group animate-float">
                <img src="/bhavya-profile.jpg" alt="Madagani Bhavya Sai" className="w-full h-full object-contain rounded-xl group-hover:scale-[1.02] transition-transform duration-500" />
                
                <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded-lg bg-slate-900/90 text-white backdrop-blur text-[11px] font-mono font-bold flex items-center justify-between">
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    AVAILABLE FOR ROLES
                  </span>
                  <span className="text-slate-300">9.58 CGPA</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        <hr className="border-slate-200/80" />

        {/* Experience Section */}
        <section id="internships" className="space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50/90 border border-indigo-200 text-indigo-700 text-xs font-mono font-bold">
              <span>WORK EXPERIENCE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-outfit font-extrabold text-slate-900 tracking-tight">
              Professional <span className="text-gradient-indigo">Engineering Experience</span>
            </h2>
            <p className="text-slate-500 text-sm">Industrial computer vision AI engineering & advanced deep learning research.</p>
          </div>

          <div className="space-y-6">
            
            {/* Experience 1 - Adani */}
            <div className="color-card color-card-indigo p-6 sm:p-7 rounded-2xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <span className="px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono text-[11px] font-bold">
                    INDUSTRIAL AI INTERNSHIP
                  </span>
                  <h3 className="text-xl font-outfit font-bold text-slate-900 mt-1">Artificial Intelligence Intern</h3>
                  <div className="text-indigo-600 font-semibold text-sm font-mono">RTIH – Adani Skills & Education</div>
                </div>
                <span className="text-xs font-mono text-slate-500 font-bold bg-slate-100 px-3 py-1 rounded-full">
                  Jun 2026 – Aug 2026
                </span>
              </div>

              <ul className="space-y-2.5 text-slate-700 text-sm leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <CheckIcon className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Engineered real-time computer vision object detection systems using Python, OpenCV, and YOLOv8 to monitor RTG crane cabin safety, operator fatigue, and distraction alerts.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckIcon className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Built an automated Streamlit executive POC converting telemetry datasets into interactive analytical dashboards, reducing executive reporting latency and enhancing operational visibility.</span>
                </li>
              </ul>
            </div>

            {/* Experience 2 - NIT Trichy */}
            <div className="color-card color-card-purple p-6 sm:p-7 rounded-2xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <span className="px-2.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 font-mono text-[11px] font-bold">
                    NEURAL DEEP LEARNING RESEARCH INTERNSHIP
                  </span>
                  <h3 className="text-xl font-outfit font-bold text-slate-900 mt-1">AI & Machine Learning Research Intern</h3>
                  <div className="text-purple-600 font-semibold text-sm font-mono">National Institute of Technology (NIT), Trichy</div>
                </div>
                <span className="text-xs font-mono text-slate-500 font-bold bg-slate-100 px-3 py-1 rounded-full">
                  Jun 2025 – Jul 2025
                </span>
              </div>

              <ul className="space-y-2.5 text-slate-700 text-sm leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <CheckIcon className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                  <span>Developed neural network classification architectures (EEGNet, IFNet, DeepConvNet, ConvFocusNet) for spatial-temporal feature learning in Brain-Computer Interface (BCI) applications.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckIcon className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                  <span>Applied advanced spatial filtering, artifacts removal, and signal preprocessing techniques to optimize multi-channel EEG classification accuracy.</span>
                </li>
              </ul>
            </div>

          </div>
        </section>

        <hr className="border-slate-200/80" />

        {/* Technical Skills Section */}
        <section id="skills" className="space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50/90 border border-purple-200 text-purple-700 text-xs font-mono font-bold">
              <span>TECHNICAL COMPETENCIES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-outfit font-extrabold text-slate-900 tracking-tight">
              Skills & <span className="text-gradient-purple">Tech Stack Matrix</span>
            </h2>
            <p className="text-slate-500 text-sm">Programming languages, AI/ML models, neural frameworks, web architecture, and DevOps tools.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Category 1: Languages */}
            <div className="color-card color-card-indigo p-6 rounded-2xl space-y-3">
              <h3 className="font-outfit font-bold text-slate-900 text-base flex items-center justify-between">
                <span>Core Programming Languages</span>
                <span className="text-xs font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded font-semibold">CORE</span>
              </h3>
              <div className="flex flex-wrap gap-2 pt-1">
                {['Python (Advanced)', 'Java', 'SQL (Complex Queries)'].map(skill => (
                  <span key={skill} className="skill-tag px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Category 2: AI / ML */}
            <div className="color-card color-card-purple p-6 rounded-2xl space-y-3">
              <h3 className="font-outfit font-bold text-slate-900 text-base flex items-center justify-between">
                <span>AI, Machine Learning & Computer Vision</span>
                <span className="text-xs font-mono text-purple-600 bg-purple-50 px-2 py-0.5 rounded font-semibold">SPECIALIZATION</span>
              </h3>
              <div className="flex flex-wrap gap-2 pt-1">
                {['Machine Learning', 'Deep Learning', 'Computer Vision', 'Natural Language Processing (NLP)', 'Generative AI', 'EEG Neural Signal Decoding'].map(skill => (
                  <span key={skill} className="skill-tag px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 border border-purple-200 font-semibold text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Category 3: Libraries */}
            <div className="color-card color-card-emerald p-6 rounded-2xl space-y-3">
              <h3 className="font-outfit font-bold text-slate-900 text-base flex items-center justify-between">
                <span>Frameworks & Data Science Libraries</span>
                <span className="text-xs font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-semibold">FRAMEWORKS</span>
              </h3>
              <div className="flex flex-wrap gap-2 pt-1">
                {['OpenCV', 'YOLOv8', 'PyTorch', 'EEGNet', 'Pandas', 'NumPy', 'Streamlit', 'Scikit-Learn'].map(skill => (
                  <span key={skill} className="skill-tag px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Category 4: Web & Tools */}
            <div className="color-card color-card-amber p-6 rounded-2xl space-y-3">
              <h3 className="font-outfit font-bold text-slate-900 text-base flex items-center justify-between">
                <span>Web Stack, Databases & DevOps Tools</span>
                <span className="text-xs font-mono text-amber-600 bg-amber-50 px-2 py-0.5 rounded font-semibold">STACK</span>
              </h3>
              <div className="flex flex-wrap gap-2 pt-1">
                {['React.js', 'Node.js', 'Express', 'HTML5', 'CSS3', 'JavaScript (ES6+)', 'MySQL', 'MongoDB', 'Git / GitHub', 'VS Code', 'Power BI'].map(skill => (
                  <span key={skill} className="skill-tag px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 font-semibold text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </section>

        <hr className="border-slate-200/80" />

        {/* Projects Section */}
        <section id="projects" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50/90 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold">
                <span>PORTFOLIO PROJECTS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-outfit font-extrabold text-slate-900 tracking-tight">
                Engineering <span className="text-gradient-emerald">Projects</span>
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 bg-white/90 border border-slate-200 p-1 rounded-xl shadow-sm">
              {[
                { label: 'All', val: 'ALL' },
                { label: 'AI / ML', val: 'AI_ML' },
                { label: 'Computer Vision', val: 'CV' },
                { label: 'Deep Learning', val: 'DEEP_LEARNING' },
                { label: 'Full-Stack', val: 'FULL_STACK' }
              ].map(f => (
                <button
                  key={f.val}
                  onClick={() => setProjectFilter(f.val)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    projectFilter === f.val
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((p, idx) => (
              <div key={idx} className="color-card color-card-indigo p-6 rounded-2xl flex flex-col justify-between space-y-4 group">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2.5 py-0.5 rounded font-mono text-[11px] font-bold border ${p.badgeColor}`}>
                      {p.badge}
                    </span>
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-slate-900 text-white hover:bg-indigo-600 font-mono text-xs font-bold flex items-center gap-1 transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>View Code</span>
                    </a>
                  </div>

                  <h3 className="text-lg font-outfit font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {p.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span className="font-semibold">{p.tech}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-slate-200/80" />

        {/* Certifications & Achievements Section */}
        <section id="certifications" className="space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50/90 border border-amber-200 text-amber-800 text-xs font-mono font-bold">
              <span>HONORS & CREDENTIALS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-outfit font-extrabold text-slate-900 tracking-tight">
              Certifications & <span className="text-gradient-amber">Academic Honors</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            
            <div className="color-card color-card-indigo p-5 rounded-2xl space-y-1.5 border border-indigo-200 bg-indigo-50/20">
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-800 font-mono text-[10px] font-bold border border-indigo-300">
                  GLOBAL CERTIFICATION
                </span>
                <AwardIcon className="w-4 h-4 text-indigo-600" />
              </div>
              <h3 className="font-outfit font-bold text-slate-900 text-base pt-1">Google AI & Machine Learning</h3>
              <p className="text-xs text-slate-600 font-mono">Google / EduSkills Certification</p>
            </div>

            <div className="color-card color-card-purple p-5 rounded-2xl space-y-1.5 border border-purple-200 bg-purple-50/20">
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-0.5 rounded bg-purple-100 text-purple-800 font-mono text-[10px] font-bold border border-purple-300">
                  CLOUD INTERNSHIP
                </span>
                <AwardIcon className="w-4 h-4 text-purple-600" />
              </div>
              <h3 className="font-outfit font-bold text-slate-900 text-base pt-1">AWS Cloud Engineering</h3>
              <p className="text-xs text-slate-600 font-mono">AWS Virtual Internship • EduSkills</p>
            </div>

            <div className="color-card color-card-emerald p-5 rounded-2xl space-y-1.5 border border-emerald-200 bg-emerald-50/20">
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold border border-emerald-300">
                  DATA ANALYTICS
                </span>
                <AwardIcon className="w-4 h-4 text-emerald-600" />
              </div>
              <h3 className="font-outfit font-bold text-slate-900 text-base pt-1">Deloitte Data Analytics</h3>
              <p className="text-xs text-slate-600 font-mono">Deloitte Virtual Internship</p>
            </div>

            <div className="color-card color-card-amber p-5 rounded-2xl space-y-1.5 border border-amber-200 bg-amber-50/20">
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-0.5 rounded bg-amber-100 text-amber-800 font-mono text-[10px] font-bold border border-amber-300">
                  INFOSYS CERTIFIED
                </span>
                <AwardIcon className="w-4 h-4 text-amber-600" />
              </div>
              <h3 className="font-outfit font-bold text-slate-900 text-base pt-1">Infosys Springboard AI</h3>
              <p className="text-xs text-slate-600 font-mono">AI & Data Analytics Certifications</p>
            </div>

            <div className="color-card color-card-indigo p-5 rounded-2xl space-y-1.5 border border-indigo-200 bg-indigo-50/20">
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-800 font-mono text-[10px] font-bold border border-indigo-300">
                  NPTEL TOPPER (95%)
                </span>
                <TrophyIcon className="w-4 h-4 text-indigo-600" />
              </div>
              <h3 className="font-outfit font-bold text-slate-900 text-base pt-1">NPTEL Elite + Gold + Topper</h3>
              <p className="text-xs text-slate-600 font-mono">Design, Tech & Innovation (95%)</p>
            </div>

            <div className="color-card color-card-purple p-5 rounded-2xl space-y-1.5 border border-purple-200 bg-purple-50/20">
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-0.5 rounded bg-purple-100 text-purple-800 font-mono text-[10px] font-bold border border-purple-300">
                  NPTEL GOLD (93%)
                </span>
                <TrophyIcon className="w-4 h-4 text-purple-600" />
              </div>
              <h3 className="font-outfit font-bold text-slate-900 text-base pt-1">NPTEL Elite + Gold</h3>
              <p className="text-xs text-slate-600 font-mono">Incubation & Entrepreneurship (93%)</p>
            </div>

            <div className="color-card color-card-emerald p-5 rounded-2xl space-y-1.5 border border-emerald-200 bg-emerald-50/20">
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold border border-emerald-300">
                  VERIFIED CERTIFICATION
                </span>
                <AwardIcon className="w-4 h-4 text-emerald-600" />
              </div>
              <h3 className="font-outfit font-bold text-slate-900 text-base pt-1">HackerRank Python (Basic)</h3>
              <p className="text-xs text-slate-600 font-mono">HackerRank Verified • Python Programming</p>
            </div>

            <div className="color-card color-card-amber p-5 rounded-2xl space-y-1.5 border border-amber-200 bg-amber-50/20">
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-0.5 rounded bg-amber-100 text-amber-800 font-mono text-[10px] font-bold border border-amber-300">
                  COLLEGE HONOR
                </span>
                <AwardIcon className="w-4 h-4 text-amber-600" />
              </div>
              <h3 className="font-outfit font-bold text-slate-900 text-base pt-1">Academic Excellence Award</h3>
              <p className="text-xs text-slate-600 font-mono">MITS AI & ML Dept (2024 & 2025) • 9.58 CGPA</p>
            </div>

            <div className="color-card color-card-indigo p-5 rounded-2xl space-y-1.5 border border-indigo-200 bg-indigo-50/20">
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-800 font-mono text-[10px] font-bold border border-indigo-300">
                  NATIONAL WINNER
                </span>
                <TrophyIcon className="w-4 h-4 text-indigo-600" />
              </div>
              <h3 className="font-outfit font-bold text-slate-900 text-base pt-1">Engineers Got Talent & ISTE Winner</h3>
              <p className="text-xs text-slate-600 font-mono">First Prize Winner for Technical Paper Presentation</p>
            </div>

          </div>
        </section>

        <hr className="border-slate-200/80" />

        {/* Contact Section */}
        <section id="contact" className="space-y-6 pt-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50/90 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold">
              <span>GET IN TOUCH</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-outfit font-extrabold text-slate-900 tracking-tight">
              Contact <span className="text-gradient-emerald">Bhavya Sai</span>
            </h2>
            <p className="text-slate-500 text-sm">Direct contact for interviews, internships, and AI engineering roles.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Direct Details Card */}
            <div className="color-card color-card-emerald p-6 rounded-2xl bg-emerald-50/30 border border-emerald-200 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <h3 className="font-outfit font-bold text-slate-900 text-lg">Direct Contact</h3>
                
                <div className="space-y-4 text-sm font-medium">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700 shrink-0">
                      <MailIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-slate-500 text-xs font-mono font-bold">EMAIL</div>
                      <a href="mailto:bhavyasaimadagani@gmail.com" className="font-bold text-slate-900 hover:text-emerald-700 transition-colors">
                        bhavyasaimadagani@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700 shrink-0">
                      <PhoneIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-slate-500 text-xs font-mono font-bold">PHONE</div>
                      <a href="tel:+919381837012" className="font-bold text-slate-900 hover:text-emerald-700 transition-colors">
                        +91 93818 37012
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-700 shrink-0">
                      <LinkedinIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-slate-500 text-xs font-mono font-bold">LINKEDIN</div>
                      <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="font-bold text-slate-900 hover:text-indigo-600 transition-colors">
                        linkedin.com/in/bhavya-sai-m-3776b22b5
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-emerald-200/60">
                <button
                  onClick={handleDownloadResume}
                  className="w-full btn-indigo py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md"
                >
                  <DownloadIcon className="w-4 h-4" />
                  <span>Download Final Resume PDF</span>
                </button>
              </div>
            </div>

            {/* Quick Note Card */}
            <div className="color-card color-card-indigo p-6 rounded-2xl flex flex-col justify-between h-full space-y-4">
              <div className="space-y-3">
                <h3 className="font-outfit font-bold text-slate-900 text-lg">Let's Connect</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  I am actively seeking Software Engineering and AI/ML Engineering roles. Feel free to reach out via email, phone, or LinkedIn!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 space-y-2">
                <div className="text-xs font-mono font-bold text-indigo-700">LIVE RENDER PORTFOLIO</div>
                <a href={PORTFOLIO_URL} target="_blank" rel="noreferrer" className="text-sm font-bold text-indigo-900 hover:underline flex items-center gap-1.5">
                  <span>{PORTFOLIO_URL}</span>
                  <ExternalLinkIcon className="w-4 h-4 text-indigo-600" />
                </a>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-200/80 bg-white/70 backdrop-blur-md py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} Madagani Bhavya Sai • All Rights Reserved
          </div>
          <div className="flex items-center gap-4">
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors">LinkedIn</a>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors">GitHub</a>
            <a href={PORTFOLIO_URL} target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors">Render Portfolio</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
