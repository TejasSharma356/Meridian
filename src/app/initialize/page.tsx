'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Briefcase,
  FileText,
  Globe,
  Code2,
  ChevronRight,
  Loader2,
  UploadCloud,
  Terminal
} from 'lucide-react';
import { saveUserProfile } from './actions';
import { toast } from 'react-hot-toast';
import SplitText from '@/components/ui/SplitText';
import MagicRings from '@/components/ui/MagicRings';

const TECH_STACK_OPTIONS = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Go', 'Rust', 'AWS', 'MongoDB',
  'PostgreSQL', 'TailwindCSS', 'Docker', 'Kubernetes', 'GraphQL', 'Redis', 'Firebase',
  'Supabase', 'Prisma', 'PyTorch', 'TensorFlow', 'OpenAI', 'LangChain', 'Terraform',
  'GitHub Actions', 'Vercel', 'Vue', 'Svelte', 'React Native', 'Flutter', 'Swift',
  'Kotlin', 'Solidity', 'Elixir', 'Ruby on Rails', 'Django', 'Spring Boot'
];

const CAREER_OPTIONS = [
  'AI Engineer', 'Full Stack Developer', 'Product Manager', 'CTO / Strategy',
  'Cloud Architect', 'DevOps Specialist', 'Data Scientist', 'Frontend Expert',
  'Cybersecurity Analyst', 'Mobile Engineer', 'Blockchain Developer', 'UI/UX Designer',
  'Engineering Manager', 'Solutions Architect', 'QA Engineer', 'Systems Programmer'
];

export default function InitializePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1); // 1-4: Form Steps, 5: Processing
  const [isLoading, setIsLoading] = useState(false);
  const [dreamRole, setDreamRole] = useState('');
  const [isCustomRole, setIsCustomRole] = useState(false);
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [resumeMode, setResumeMode] = useState<'upload' | 'text'>('upload');
  const [resumeText, setResumeText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size exceeds 5MB limit.');
        return;
      }
      setSelectedFile(file);
      toast.success(`Selected: ${file.name}`);
    }
  };

  const runSimulation = async () => {
    const simulationLogs = [
      "> Initializing Career Calibration Node...",
      "> Establishing Secure Uplink to MongoDB Cluster...",
      "> Parsing Resume manifest layers...",
      "> Extracting technical DNA and skill gaps...",
      "> Synthesizing Job-Match synergy coefficients...",
      "> Calibrating Personal CTO Roadmap...",
      "> System Ready. Uplink Established."
    ];

    for (let i = 0; i < simulationLogs.length; i++) {
      setLogs(prev => [...prev, simulationLogs[i]]);
      await new Promise(r => setTimeout(r, 800));
    }

    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  const handleNext = () => {
    if (currentStep === 1 && !dreamRole) {
      toast.error('Please define your objective.');
      return;
    }
    if (currentStep === 2 && !selectedFile && !resumeText) {
      toast.error('Please provide your Professional DNA.');
      return;
    }
    if (currentStep === 3 && !linkedinUrl) {
      toast.error('LinkedIn link is required for calibration.');
      return;
    }
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleFinalize();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleFinalize = async () => {
    setIsLoading(true);
    setCurrentStep(5);
    runSimulation();

    const formData = new FormData();
    formData.append('dreamRole', dreamRole);
    formData.append('linkedinUrl', linkedinUrl);
    formData.append('resumeMode', resumeMode);

    if (resumeMode === 'text') {
      formData.append('resumeText', resumeText);
    } else if (selectedFile) {
      formData.append('resumeFile', selectedFile);
    }

    selectedSkills.forEach(skill => formData.append('techStack', skill));
    const result = await saveUserProfile(formData);
    if (!result.success) {
      toast.error('Calibration uplink failed: ' + result.error);
    }
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.section
            key="step1"
            initial={{ opacity: 0, scale: 0.98, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 1.02, x: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div className="flex items-center gap-2 text-zinc-400">
              <Briefcase size={18} />
              <label className="text-sm font-black uppercase tracking-[0.2em]">Step 01: The Objective</label>
            </div>

            <div className="flex flex-wrap gap-3">
              {CAREER_OPTIONS.map(role => (
                <button
                  key={role}
                  onClick={() => {
                    setDreamRole(role);
                    setIsCustomRole(false);
                  }}
                  className={`px-5 py-3 rounded-2xl text-left border transition-all duration-300 whitespace-nowrap ${dreamRole === role && !isCustomRole
                      ? "bg-[#6366f1]/10 border-[#6366f1] text-white shadow-[0_0_40px_rgba(99,102,241,0.1)]"
                      : "bg-zinc-900/40 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                    }`}
                >
                  <p className="text-base font-black tracking-tight">{role}</p>
                </button>
              ))}
              <button
                onClick={() => {
                  setIsCustomRole(true);
                  if (!isCustomRole) setDreamRole('');
                }}
                className={`px-5 py-3 rounded-2xl text-left border transition-all duration-300 whitespace-nowrap ${isCustomRole
                    ? "bg-[#6366f1]/10 border-[#6366f1] text-white"
                    : "bg-zinc-900/40 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                  }`}
              >
                <p className="text-base font-black tracking-tight">Other / Custom Objective</p>
              </button>
            </div>

            <AnimatePresence>
              {isCustomRole && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-zinc-900/40 border border-zinc-800 focus-within:border-zinc-700 rounded-3xl p-2 transition-all mt-4"
                >
                  <input
                    type="text"
                    placeholder="Enter your specific target role..."
                    value={dreamRole}
                    onChange={(e) => setDreamRole(e.target.value)}
                    autoFocus
                    className="w-full bg-transparent px-6 py-6 text-xl font-bold tracking-tight focus:outline-none placeholder:text-zinc-800"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        );
      case 2:
        return (
          <motion.section
            key="step2"
            initial={{ opacity: 0, scale: 0.98, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 1.02, x: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-zinc-400">
                <FileText size={18} />
                <label className="text-sm font-black uppercase tracking-[0.2em]">Step 02: Professional DNA</label>
              </div>
              <button
                onClick={() => setResumeMode(resumeMode === 'upload' ? 'text' : 'upload')}
                className="text-sm uppercase font-black text-zinc-600 hover:text-[#6366f1] transition-colors"
              >
                {resumeMode === 'upload' ? 'Paste Text' : 'Upload PDF'}
              </button>
            </div>

            {resumeMode === 'upload' ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="bg-zinc-900/40 border border-zinc-800 border-dashed rounded-[40px] p-16 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-zinc-900/60 hover:border-zinc-700 transition-all group min-h-[300px]"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                  <UploadCloud size={24} className={selectedFile ? "text-[#6366f1]" : "text-zinc-500"} />
                </div>
                <div className="text-center">
                  <p className="text-xl text-zinc-300 font-bold tracking-tight">
                    {selectedFile ? selectedFile.name : 'Drop your resume (PDF/DOCX)'}
                  </p>
                  <p className="text-xs text-zinc-600 uppercase tracking-widest mt-2">Maximum file size: 5MB</p>
                </div>
              </div>
            ) : (
              <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-1 overflow-hidden">
                <textarea
                  placeholder="Paste your resume content or CV bio here..."
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  rows={10}
                  className="w-full bg-transparent px-6 py-6 text-lg focus:outline-none placeholder:text-zinc-700 no-scrollbar leading-relaxed font-mono"
                />
              </div>
            )}
          </motion.section>
        );
      case 3:
        return (
          <motion.section
            key="step3"
            initial={{ opacity: 0, scale: 0.98, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 1.02, x: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 text-zinc-400">
              <Globe size={16} />
              <label className="text-xs font-black uppercase tracking-[0.2em]">Step 03: Social Context</label>
            </div>
            <div className="bg-zinc-900/40 border border-zinc-800 focus-within:border-zinc-700 rounded-[40px] p-6 flex items-center transition-all">
              <div className="pl-6 pr-2 text-zinc-600 font-bold text-xl">linkedin.com/in/</div>
              <input
                type="text"
                placeholder="username"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                autoFocus
                className="w-full bg-transparent py-6 text-2xl font-black tracking-tight focus:outline-none placeholder:text-zinc-800"
              />
            </div>
          </motion.section>
        );
      case 4:
        return (
          <motion.section
            key="step4"
            initial={{ opacity: 0, scale: 0.98, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 1.02, x: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 text-zinc-400">
              <Code2 size={16} />
              <label className="text-xs font-black uppercase tracking-[0.2em]">Step 04: Skill Calibration</label>
            </div>
            <div className="flex flex-wrap gap-4 pt-2">
              {TECH_STACK_OPTIONS.map(skill => (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`px-10 py-5 rounded-3xl text-sm font-black uppercase tracking-widest border transition-all duration-300 ${selectedSkills.includes(skill)
                      ? "bg-[#6366f1] border-[#6366f1] text-white shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                      : "bg-zinc-900/50 border-zinc-800 text-zinc-600 hover:border-zinc-600 hover:text-zinc-400"
                    }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </motion.section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col items-center px-12 pt-32 selection:bg-[#6366f1]/30 relative overflow-hidden">
      {/* Dynamic Background Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <MagicRings
          color="#6366f1"
          colorTwo="#818cf8"
          ringCount={8}
          speed={0.4}
          baseRadius={0.4}
          radiusStep={0.08}
          attenuation={15}
        />
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-[#6366f1]/10 to-transparent pointer-events-none" />

      <div className="w-full max-w-[1200px] relative z-10 flex flex-col gap-16">
        <header className="space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <SplitText
              text="Initialize Your Personal CTO"
              className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white whitespace-nowrap block"
              delay={80}
              duration={0.8}
              textAlign="center"
            />
            <p className="text-zinc-500 text-sm md:text-lg max-w-[800px] mx-auto leading-relaxed uppercase font-black tracking-[0.4em]">
              Trajectory Calibration & Professional Manifest
            </p>
          </motion.div>
        </header>

        <AnimatePresence mode="wait">
          {currentStep <= 4 ? (
            <motion.main
              key="wizard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12 pb-24 max-w-[800px] mx-auto w-full"
            >
              <div className="flex items-center gap-4">
                {[1, 2, 3, 4].map(idx => (
                  <div key={idx} className="flex-1 h-1 rounded-full overflow-hidden bg-zinc-900">
                    <motion.div
                      initial={false}
                      animate={{ width: currentStep >= idx ? '100%' : '0%' }}
                      className="h-full bg-gradient-to-r from-[#6366f1] to-[#818cf8]"
                    />
                  </div>
                ))}
                <span className="text-sm font-black text-zinc-700 uppercase tracking-widest pl-2">Node 0{currentStep}/04</span>
              </div>

              <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                  {renderStep()}
                </AnimatePresence>
              </div>

              <footer className="flex items-center gap-4 pt-4">
                {currentStep > 1 && (
                  <button
                    onClick={handleBack}
                    className="flex-1 bg-zinc-900 border border-zinc-800 text-zinc-500 py-6 rounded-3xl font-bold text-sm uppercase tracking-widest hover:bg-zinc-800 hover:text-zinc-300 transition-all"
                  >
                    Go Back
                  </button>
                )}
                <button
                  onClick={handleNext}
                  className="flex-[2] bg-white text-black py-6 rounded-3xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all active:scale-[0.98]"
                >
                  {currentStep === 4 ? 'Complete Calibration' : 'Continue'}
                  <ChevronRight size={14} strokeWidth={3} />
                </button>
              </footer>
            </motion.main>
          ) : (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-12 py-12"
            >
              <div className="relative w-32 h-32">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-[#6366f1]/20 rounded-full border-t-[#6366f1]"
                />
                <div className="absolute inset-6 border border-zinc-800 rounded-full flex items-center justify-center">
                  <Loader2 className="text-[#6366f1] animate-spin" size={32} />
                </div>
              </div>

              <div className="w-full bg-zinc-900/40 border border-zinc-800/50 rounded-[40px] p-10 font-mono text-[11px] space-y-4 min-h-[350px] backdrop-blur-3xl shadow-2xl relative overflow-hidden">
                <div className="flex items-center gap-3 text-zinc-600 mb-8 border-b border-zinc-800/50 pb-6">
                  <Terminal size={16} />
                  <span className="uppercase tracking-[0.2em] font-black text-[10px]">Kernel Synchronization</span>
                </div>
                <div className="space-y-3">
                  {logs.map((log, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={i === logs.length - 1 ? "text-[#6366f1] font-bold" : "text-zinc-500"}
                    >
                      {log}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center gap-2">
                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">Establishing Neural Link...</p>
                <div className="flex gap-1">
                  {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 bg-[#6366f1] rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />)}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
