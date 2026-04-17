'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Briefcase, 
  FileText, 
  Globe, 
  Code2, 
  ChevronRight, 
  Loader2, 
  CheckCircle2, 
  UploadCloud,
  Terminal,
  X
} from 'lucide-react';
import { saveUserProfile } from './actions';
import { toast } from 'react-hot-toast';
import { BackButton } from '@/components/ui/back-button';

const TECH_STACK_OPTIONS = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Go', 'Rust', 
  'AWS', 'MongoDB', 'PostgreSQL', 'TailwindCSS', 'Docker', 'Kubernetes'
];

export default function InitializePage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Form, 2: Processing
  const [isLoading, setIsLoading] = useState(false);
  const [dreamRole, setDreamRole] = useState('');
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

  // Terminal Log Simulation
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

  const handleInitialize = async () => {
    if (!dreamRole || !linkedinUrl) {
      toast.error('Objective and LinkedIn are required for calibration.');
      return;
    }

    setIsLoading(true);
    setStep(2);
    
    // 1. Start Log Simulation
    runSimulation();

    // 2. Prepare FormData
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

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col items-start px-12 pt-12 selection:bg-[#6366f1]/30">
      <BackButton className="mb-[-2rem]" />
      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.main 
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-[600px] mx-auto space-y-12 pb-12"
          >
            {/* Header */}
            <header className="space-y-4 text-center">
              <h1 className="text-4xl font-bold tracking-tighter text-white" style={{ fontFamily: 'var(--font-inter)' }}>
                Initialize Your Personal CTO
              </h1>
              <p className="text-zinc-500 text-sm max-w-[480px] mx-auto leading-relaxed">
                AP-CTO needs to calibrate your career trajectory. This data will power your project roadmap, skill prioritization, and job matching ecosystem.
              </p>
            </header>

            <div className="space-y-10">
              {/* 1. The Objective */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Briefcase size={16} />
                  <label className="text-xs font-bold uppercase tracking-widest">The Objective</label>
                </div>
                <div className="bg-zinc-900/40 border border-zinc-800 focus-within:border-zinc-700 rounded-2xl p-1 transition-all">
                  <input 
                    type="text" 
                    placeholder="What is your dream role? (e.g., AI Architect at Linear)"
                    value={dreamRole}
                    onChange={(e) => setDreamRole(e.target.value)}
                    className="w-full bg-transparent px-5 py-4 text-sm focus:outline-none placeholder:text-zinc-700"
                  />
                </div>
              </section>

              {/* 2. Professional DNA */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <FileText size={16} />
                    <label className="text-xs font-bold uppercase tracking-widest">Professional DNA</label>
                  </div>
                  <button 
                    onClick={() => setResumeMode(resumeMode === 'upload' ? 'text' : 'upload')}
                    className="text-[10px] uppercase font-black text-zinc-600 hover:text-[#6366f1] transition-colors"
                  >
                    {resumeMode === 'upload' ? 'Paste Text Instead' : 'Upload PDF Instead'}
                  </button>
                </div>
                
                {resumeMode === 'upload' ? (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-zinc-900/40 border border-zinc-800 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-zinc-900/60 hover:border-zinc-700 transition-all group"
                  >
                    <input 
                      type="file" 
                      ref= {fileInputRef} 
                      className="hidden" 
                      accept=".pdf,.doc,.docx" 
                      onChange={handleFileChange}
                    />
                    <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <UploadCloud size={20} className={selectedFile ? "text-[#6366f1]" : "text-zinc-500"} />
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-zinc-300 font-medium">
                        {selectedFile ? selectedFile.name : 'Upload Your Resume'}
                      </p>
                      <p className="text-[10px] text-zinc-600 uppercase tracking-widest mt-1">PDF, DOCX (MAX 5MB)</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-1 overflow-hidden">
                    <textarea 
                      placeholder="Paste your resume content here..."
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      rows={6}
                      className="w-full bg-transparent px-5 py-4 text-sm focus:outline-none placeholder:text-zinc-700 no-scrollbar"
                    />
                  </div>
                )}
              </section>

              {/* 3. Social Context */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Globe size={16} />
                  <label className="text-xs font-bold uppercase tracking-widest">Social Context</label>
                </div>
                <div className="bg-zinc-900/40 border border-zinc-800 focus-within:border-zinc-700 rounded-2xl p-1 flex items-center transition-all">
                  <div className="pl-5 text-zinc-600">linkedin.com/in/</div>
                  <input 
                    type="text" 
                    placeholder="username"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className="w-full bg-transparent px-2 py-4 text-sm focus:outline-none placeholder:text-zinc-700"
                  />
                </div>
              </section>

              {/* 4. Skill Calibration */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Code2 size={16} />
                  <label className="text-xs font-bold uppercase tracking-widest">Skill Calibration</label>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {TECH_STACK_OPTIONS.map(skill => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                        selectedSkills.includes(skill)
                          ? "bg-[#6366f1] border-[#6366f1] text-white"
                          : "bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:border-zinc-600"
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </section>
            </div>

            {/* Primary Action */}
            <footer className="pt-8 text-center">
              <button 
                onClick={handleInitialize}
                disabled={isLoading}
                className="w-full bg-white text-black py-5 rounded-2xl font-bold text-sm tracking-tight flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="animate-spin" size={18} /> : null}
                Initialize Agent
                {!isLoading && <ChevronRight size={18} />}
              </button>
              <p className="mt-4 text-[10px] uppercase font-black tracking-widest text-zinc-700">Sequence 01: Brain Onboarding</p>
            </footer>
          </motion.main>
        ) : (
          <motion.div 
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-[500px] flex flex-col items-center gap-12"
          >
            {/* Visualizer */}
            <div className="relative w-24 h-24">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-[#6366f1]/20 rounded-full border-t-[#6366f1]"
              />
              <div className="absolute inset-4 border border-zinc-800 rounded-full flex items-center justify-center">
                 <Loader2 className="text-[#6366f1] animate-spin" size={24} />
              </div>
            </div>

            {/* Terminal Logs */}
            <div className="w-full bg-zinc-900/60 border border-zinc-800 rounded-3xl p-8 font-mono text-[11px] space-y-3 min-h-[300px] backdrop-blur-3xl shadow-2xl">
              <div className="flex items-center gap-2 text-zinc-600 mb-6 border-b border-zinc-800 pb-4">
                <Terminal size={14} />
                <span className="uppercase tracking-widest font-black">System Output</span>
              </div>
              <div className="space-y-2">
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

            <p className="text-zinc-600 text-xs font-medium animate-pulse">Calibrating trajectory coefficients...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
