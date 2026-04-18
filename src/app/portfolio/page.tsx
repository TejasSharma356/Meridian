'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, GraduationCap, Zap, Link as LinkIcon, Briefcase, Download, Sparkles, Settings2, Palette, ArrowRight } from "lucide-react";
import Link from 'next/link';
import { fetchPortfolioConfig, savePortfolioConfig } from './actions';

type TemplateType = 'teal' | 'minimal' | 'hacker';

const initialMockData = {
  name: 'Vighnesh Singh Dhanai',
  title: 'Software Engineer & Founder',
  summary: 'SRMITE. Obsessed with shrinking the gap between talent and opportunity, Hates linkedin so founded an alternative.',
  experience: [
    { id: 1, role: 'Co-founder & CEO', company: 'Meridian', period: '2023 - Present' },
    { id: 2, role: 'SDE Intern', company: 'Tech Startup', period: 'Summer 2024' }
  ],
  education: [
    { id: 1, institution: 'SRM Institute of Science and Technology', degree: 'B.Tech Computer Science', year: '2022 - 2026' }
  ],
  skills: 'React, Next.js, Typescript, Tailwind, Node.js, Framer Motion, Python',
  projects: [
    { id: 1, name: 'Meridian OS', description: 'Agentic IDE and hiring alternative platform built with Next.js and AWS Bedrock.' }
  ],
  customSections: [] as { id: number; title: string; items: { id: number; title: string; subtitle: string; content: string }[] }[]
};

const emptyData = {
  name: '',
  title: '',
  summary: '',
  experience: [],
  education: [],
  skills: '',
  projects: [],
  customSections: [] as { id: number; title: string; items: { id: number; title: string; subtitle: string; content: string }[] }[]
};

export default function PortfolioFullScreen() {
  const [data, setData] = useState(initialMockData);
  const [builderMode, setBuilderMode] = useState<'amend' | 'new'>('amend');

  const [activeTemplate, setActiveTemplate] = useState<TemplateType>('teal');
  const [isSaving, setIsSaving] = useState(false);
  
  const initialLoadDone = useRef(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function loadData() {
      const res = await fetchPortfolioConfig();
      if (res.success && res.data) {
        setData({ ...emptyData, ...res.data });
        setBuilderMode('amend');
      } else {
        setData(initialMockData);
        setBuilderMode('amend');
      }
      setTimeout(() => { initialLoadDone.current = true; }, 500);
    }
    loadData();
  }, []);

  useEffect(() => {
    if (!initialLoadDone.current) return;
    
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    
    setIsSaving(true);
    saveTimeoutRef.current = setTimeout(async () => {
      await savePortfolioConfig(data);
      setIsSaving(false);
    }, 1500);
    
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [data]);

  const updateField = (field: string, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const getTemplateStyles = (type: TemplateType) => {
    switch (type) {
      case 'minimal': return { bg: 'bg-white', text: 'text-neutral-900', secondary: 'text-neutral-500', accent: 'bg-neutral-900 text-white', accentText: 'text-neutral-900', border: 'border-neutral-200' };
      case 'hacker': return { bg: 'bg-black border border-green-500/30', text: 'text-green-500', secondary: 'text-green-600', accent: 'bg-green-950 border border-green-500/50 text-green-400', accentText: 'text-green-500', border: 'border-green-500/30' };
      case 'teal':
      default: return { bg: 'bg-white', text: 'text-gray-800', secondary: 'text-gray-500', accent: 'bg-[#1fc3b6] text-white', accentText: 'text-[#1fc3b6]', border: 'border-[#1fc3b6]/30' };
    }
  };

  const tStyle = getTemplateStyles(activeTemplate);

  const handleScrollToBuilder = () => {
    const el = document.getElementById('builder-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full h-full flex flex-col relative bg-[#0a0a0b] text-white selection:bg-[#6366f1] overflow-y-auto custom-scrollbar font-sans">

      {/* ── Immersive Hero Section ── */}
      <section className="w-full h-screen flex flex-col items-center justify-center relative shrink-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#6366f1]/10 via-transparent to-transparent pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10"
        >
          <span className="px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 text-[10px] font-bold tracking-widest uppercase mb-6 inline-block">
            Phase 04 & 05
          </span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 text-white">
            Welcome to Portfolio.
          </h1>
          <p className="text-xl md:text-2xl text-white/50 tracking-wide font-light">
            Upgrade your Resume.
          </p>

          <button
            onClick={handleScrollToBuilder}
            className="mt-16 px-8 py-4 bg-white text-black font-bold tracking-tight rounded-full hover:scale-105 transition-transform duration-200"
          >
            Start Building ↓
          </button>
        </motion.div>
      </section>

      {/* ── Builder Section ── */}
      <section id="builder-section" className="w-full flex-col flex items-center shrink-0 min-h-screen pt-20 pb-32 px-6 md:px-12">
        <div className="w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-12 h-[900px]">

          {/* ── Left Side: Live Preview ── */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4 h-full">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/50">Live Preview</h3>
              <div className="flex items-center gap-3">
                <div className="flex bg-white/5 p-1 rounded border border-white/10">
                  <button onClick={() => setActiveTemplate('teal')} className={`w-6 h-6 rounded flex items-center justify-center ${activeTemplate === 'teal' ? 'bg-[#1fc3b6]' : 'hover:bg-white/10'} transition-colors`} title="Modern Teal"><Palette className="w-3 h-3 text-white" /></button>
                  <button onClick={() => setActiveTemplate('minimal')} className={`w-6 h-6 rounded flex items-center justify-center ${activeTemplate === 'minimal' ? 'bg-white' : 'hover:bg-white/10'} transition-colors ml-1`} title="Monochrome"><Palette className={`w-3 h-3 ${activeTemplate === 'minimal' ? 'text-black' : 'text-white'}`} /></button>
                  <button onClick={() => setActiveTemplate('hacker')} className={`w-6 h-6 rounded flex items-center justify-center ${activeTemplate === 'hacker' ? 'bg-green-500' : 'hover:bg-white/10'} transition-colors ml-1`} title="Terminal"><Palette className={`w-3 h-3 ${activeTemplate === 'hacker' ? 'text-black' : 'text-white'}`} /></button>
                </div>
                <button className="px-3 py-1.5 bg-[#6366f1]/20 text-[#6366f1] border border-[#6366f1]/30 rounded flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase hover:bg-[#6366f1]/30 transition-all">
                  <Download className="w-3 h-3" /> PDF
                </button>
              </div>
            </div>

            <div className="flex-1 bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden relative flex flex-col p-4 shadow-2xl">
              {/* Scaled Document Container */}
              <div className={`w-full h-full rounded shadow-inner overflow-y-auto ${tStyle.bg} ${tStyle.text} font-sans`}>

                {activeTemplate === 'teal' && (
                  <div className="w-full p-8 md:p-12 flex flex-col gap-8 min-h-max">
                    {/* Header */}
                    <div className={`w-full ${tStyle.accent} p-8 rounded-lg`}>
                       <h1 className="text-4xl font-black tracking-tight mb-1">{data.name || "Your Name"}</h1>
                       <p className="text-sm font-medium opacity-90">{data.title || "Your Professional Title"}</p>
                    </div>

                    {/* Summary */}
                    {data.summary && (
                      <div>
                        <p className={`text-sm ${tStyle.secondary} leading-relaxed`}>{data.summary}</p>
                      </div>
                    )}

                    <div className="flex flex-col md:flex-row gap-8">
                      {/* Left Column in Preview */}
                      <div className="flex-1 flex flex-col gap-8">
                        {/* Experience */}
                        <div>
                          <h3 className={`text-xs font-bold tracking-widest uppercase ${tStyle.secondary} mb-3 border-b ${tStyle.border} pb-2`}>Experience</h3>
                          <div className="flex flex-col gap-4">
                            {data.experience.map(exp => (
                              <div key={exp.id}>
                                <div className="flex justify-between items-baseline mb-0.5">
                                  <h4 className={`text-sm font-bold ${tStyle.text}`}>{exp.role}</h4>
                                  <span className={`text-xs ${tStyle.secondary} font-medium`}>{exp.period}</span>
                                </div>
                                <p className={`text-sm ${tStyle.accentText} font-medium`}>{exp.company}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Education */}
                        <div>
                          <h3 className={`text-xs font-bold tracking-widest uppercase ${tStyle.secondary} mb-3 border-b ${tStyle.border} pb-2`}>Education</h3>
                          <div className="flex flex-col gap-4">
                            {data.education.map(edu => (
                              <div key={edu.id}>
                                <div className="flex justify-between items-baseline mb-0.5">
                                  <h4 className={`text-sm font-bold ${tStyle.text}`}>{edu.degree}</h4>
                                  <span className={`text-xs ${tStyle.secondary} font-medium`}>{edu.year}</span>
                                </div>
                                <p className={`text-sm ${tStyle.secondary} font-medium`}>{edu.institution}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Column in Preview */}
                      <div className="w-full md:w-1/3 flex flex-col gap-8">
                        {/* Skills */}
                        <div>
                          <h3 className={`text-xs font-bold tracking-widest uppercase ${tStyle.secondary} mb-3 border-b ${tStyle.border} pb-2`}>Skills</h3>
                          <p className={`text-sm ${tStyle.secondary} leading-relaxed`}>
                            {data.skills}
                          </p>
                        </div>

                        {/* Projects */}
                        <div>
                          <h3 className={`text-xs font-bold tracking-widest uppercase ${tStyle.secondary} mb-3 border-b ${tStyle.border} pb-2`}>Projects</h3>
                          <div className="flex flex-col gap-4">
                            {data.projects.map(proj => (
                              <div key={proj.id}>
                                <h4 className={`text-sm font-bold ${tStyle.text} mb-1`}>{proj.name}</h4>
                                <p className={`text-xs ${tStyle.secondary} leading-relaxed`}>{proj.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* End Flex Row */}

                    {/* Custom Sections (Teal) */}
                    {data.customSections && data.customSections.length > 0 && (
                      <div className="flex flex-col gap-8 mt-4 pt-8 border-t border-black/5">
                        {data.customSections.map(sec => (
                          <div key={sec.id}>
                            <h3 className={`text-xs font-bold tracking-widest uppercase ${tStyle.secondary} mb-3 border-b ${tStyle.border} pb-2`}>{sec.title}</h3>
                            <div className="flex flex-col gap-6">
                              {sec.items.map(item => (
                                <div key={item.id}>
                                  <div className="flex justify-between items-baseline mb-0.5">
                                    <h4 className={`text-sm font-bold ${tStyle.text}`}>{item.title}</h4>
                                    <span className={`text-xs ${tStyle.secondary} font-medium`}>{item.subtitle}</span>
                                  </div>
                                  <p className={`text-sm ${tStyle.secondary} leading-relaxed mt-1 whitespace-pre-wrap`}>{item.content}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTemplate === 'minimal' && (
                  <div className="w-full p-8 md:p-12 flex flex-col gap-6 min-h-max max-w-3xl mx-auto">
                    <div className="text-center border-b pb-6 border-neutral-300">
                      <h1 className="text-4xl font-serif tracking-tight mb-2 uppercase text-neutral-900">{data.name}</h1>
                      <p className="text-sm font-light tracking-widest uppercase text-neutral-500">{data.title}</p>
                    </div>
                    {data.summary && <p className="text-sm text-neutral-600 leading-relaxed text-center italic">"{data.summary}"</p>}
                    
                    <div className="flex flex-col gap-8 mt-4">
                      {/* Experience */}
                      <div>
                        <h3 className="text-sm font-bold tracking-widest uppercase text-neutral-900 border-b border-neutral-200 pb-2 mb-4">Professional Experience</h3>
                        <div className="flex flex-col gap-6">
                           {data.experience.map(exp => (
                             <div key={exp.id} className="flex justify-between items-start">
                               <div>
                                 <h4 className="text-base font-bold text-neutral-900">{exp.role}</h4>
                                 <p className="text-sm font-medium text-neutral-500">{exp.company}</p>
                               </div>
                               <span className="text-xs font-mono text-neutral-400">{exp.period}</span>
                             </div>
                           ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-8">
                        {/* Projects */}
                        <div>
                          <h3 className="text-sm font-bold tracking-widest uppercase text-neutral-900 border-b border-neutral-200 pb-2 mb-4">Projects</h3>
                          <div className="flex flex-col gap-4">
                            {data.projects.map(proj => (
                              <div key={proj.id}>
                                <h4 className="text-sm font-bold text-neutral-800">{proj.name}</h4>
                                <p className="text-xs text-neutral-500 leading-snug">{proj.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Education & Skills */}
                        <div className="flex flex-col gap-8">
                          <div>
                            <h3 className="text-sm font-bold tracking-widest uppercase text-neutral-900 border-b border-neutral-200 pb-2 mb-4">Education</h3>
                            <div className="flex flex-col gap-4">
                              {data.education.map(edu => (
                                <div key={edu.id}>
                                  <h4 className="text-sm font-bold text-neutral-800">{edu.degree}</h4>
                                  <p className="text-xs text-neutral-500">{edu.institution}</p>
                                  <span className="text-xs font-mono text-neutral-400">{edu.year}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h3 className="text-sm font-bold tracking-widest uppercase text-neutral-900 border-b border-neutral-200 pb-2 mb-4">Skills</h3>
                            <p className="text-xs text-neutral-600 leading-relaxed font-mono">{data.skills}</p>
                          </div>
                        </div>
                      </div>
                      </div>
                      
                      {/* Custom Sections (Minimal) */}
                      {data.customSections && data.customSections.length > 0 && (
                        <div className="flex flex-col gap-8">
                          {data.customSections.map(sec => (
                            <div key={sec.id}>
                              <h3 className="text-sm font-bold tracking-widest uppercase text-neutral-900 border-b border-neutral-200 pb-2 mb-4">{sec.title}</h3>
                              <div className="flex flex-col gap-6">
                                {sec.items.map(item => (
                                  <div key={item.id} className="flex flex-col gap-1">
                                    <div className="flex justify-between items-baseline">
                                      <h4 className="text-base font-bold text-neutral-900">{item.title}</h4>
                                      <span className="text-xs font-mono text-neutral-400">{item.subtitle}</span>
                                    </div>
                                    <p className="text-sm text-neutral-500 leading-snug whitespace-pre-wrap">{item.content}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                )}

                {activeTemplate === 'hacker' && (
                  <div className="w-full p-8 md:p-10 flex flex-col md:flex-row gap-8 min-h-max font-mono">
                    {/* Sidebar */}
                    <div className="w-full md:w-1/3 border-r border-green-500/30 pr-6 flex flex-col gap-8">
                       <div>
                         <div className="text-green-500 font-bold mb-2">&gt; USER.IDENT</div>
                         <h1 className="text-2xl font-black text-green-400 leading-none break-words uppercase">{data.name}</h1>
                         <p className="text-xs text-green-600 mt-2">[{data.title}]</p>
                       </div>
                       <div>
                         <div className="text-green-500 font-bold mb-2">&gt; SYS.SKILLS</div>
                         <p className="text-xs text-green-400 leading-relaxed break-words">{data.skills}</p>
                       </div>
                       <div>
                         <div className="text-green-500 font-bold mb-2">&gt; SYS.EDU</div>
                         <div className="flex flex-col gap-4">
                           {data.education.map(edu => (
                             <div key={edu.id} className="border-l border-green-500/50 pl-3">
                               <h4 className="text-sm font-bold text-green-400">{edu.degree}</h4>
                               <p className="text-xs text-green-600">{edu.institution}</p>
                               <span className="text-[10px] text-green-700">{edu.year}</span>
                             </div>
                           ))}
                         </div>
                       </div>
                    </div>
                    {/* Main Area */}
                    <div className="w-full md:w-2/3 flex flex-col gap-8">
                       {data.summary && (
                         <div>
                           <div className="text-green-500 font-bold mb-2">&gt; READ_SUMMARY</div>
                           <p className="text-sm text-green-400 leading-relaxed border border-green-500/20 p-4 bg-green-500/5">{data.summary}</p>
                         </div>
                       )}
                       <div>
                         <div className="text-green-500 font-bold mb-2">&gt; EXEC_EXPERIENCE</div>
                         <div className="flex flex-col gap-6">
                           {data.experience.map(exp => (
                             <div key={exp.id} className="flex flex-col gap-1 border-b border-green-500/20 pb-4">
                               <div className="flex justify-between items-center bg-green-900/20 p-2">
                                 <h4 className="text-sm font-bold text-green-300">{exp.role} @ {exp.company}</h4>
                                 <span className="text-xs text-green-600">[{exp.period}]</span>
                               </div>
                             </div>
                           ))}
                         </div>
                       </div>
                       <div>
                         <div className="text-green-500 font-bold mb-2">&gt; INIT_PROJECTS</div>
                         <div className="flex flex-col gap-4">
                           {data.projects.map(proj => (
                             <div key={proj.id} className="border border-green-500/30 p-3 bg-black">
                               <h4 className="text-sm font-bold text-green-300 mb-1">{proj.name}</h4>
                               <p className="text-xs text-green-500">{proj.description}</p>
                             </div>
                           ))}
                         </div>
                       </div>
                       
                       {/* Custom Sections (Hacker) */}
                       {data.customSections && data.customSections.length > 0 && data.customSections.map(sec => (
                         <div key={sec.id}>
                           <div className="text-green-500 font-bold mb-2">&gt; SYS.{sec.title.toUpperCase().replace(/\s+/g, '_')}</div>
                           <div className="flex flex-col gap-4">
                             {sec.items.map(item => (
                               <div key={item.id} className="border border-green-500/30 p-3 bg-black">
                                 <div className="flex justify-between items-center mb-2 bg-green-900/20 p-1 px-2">
                                   <h4 className="text-sm font-bold text-green-300">{item.title}</h4>
                                   <span className="text-xs text-green-600">[{item.subtitle}]</span>
                                 </div>
                                 <p className="text-xs text-green-500 leading-relaxed whitespace-pre-wrap">{item.content}</p>
                               </div>
                             ))}
                           </div>
                         </div>
                       ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>

          {/* ── Right Side: Dashboard Editor ── */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4 h-full">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/50">Portfolio Dashboard</h3>
                <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-white/40 tracking-wider flex items-center gap-1.5 transition-colors">
                  <div className={`w-1.5 h-1.5 rounded-full ${isSaving ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} /> {isSaving ? 'Saving...' : 'Saved'}
                </span>
              </div>
              
              <div className="flex items-center bg-black/40 border border-white/5 rounded-lg p-1 w-full xl:w-2/3 mb-1">
                <button 
                  onClick={() => {
                    if (builderMode === 'amend') return;
                    if (window.confirm("Loading your existing profile will overwrite current unsaved changes. Continue?")) {
                      setBuilderMode('amend');
                      setData(initialMockData);
                    }
                  }}
                  className={`flex-1 text-[10px] font-bold uppercase tracking-widest py-2 rounded-md transition-all ${builderMode === 'amend' ? 'bg-[#6366f1] text-white shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                >
                  Amend Existing
                </button>
                <button 
                  onClick={() => {
                    if (builderMode === 'new') return;
                    if (window.confirm("Starting a new portfolio will clear all current fields. Continue?")) {
                      setBuilderMode('new');
                      setData(emptyData);
                    }
                  }}
                  className={`flex-1 text-[10px] font-bold uppercase tracking-widest py-2 rounded-md transition-all ${builderMode === 'new' ? 'bg-[#6366f1] text-white shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                >
                  Create New
                </button>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-2 pb-20">

              {/* Basic Info Editor */}
              <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6 shadow-xl flex flex-col gap-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-[#6366f1]/20 rounded-md text-[#6366f1]"><Settings2 className="w-4 h-4" /></div>
                  <h4 className="font-bold text-white tracking-tight">Basic Profile</h4>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-white/40 mb-1.5 ml-1">Full Name</label>
                    <input className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-[#6366f1]/50 focus:outline-none transition-colors"
                      value={data.name} onChange={e => updateField('name', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-white/40 mb-1.5 ml-1">Title</label>
                    <input className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-[#6366f1]/50 focus:outline-none transition-colors"
                      value={data.title} onChange={e => updateField('title', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-white/40 mb-1.5 ml-1">Professional Summary</label>
                  <textarea className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[#6366f1]/50 focus:outline-none transition-colors h-24 resize-none"
                    value={data.summary} onChange={e => updateField('summary', e.target.value)} />
                </div>
              </div>

              {/* AI Insights Tip Card */}
              <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-5 shadow-lg flex gap-4">
                <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-sm font-bold text-indigo-300 mb-1">AI Insight</h5>
                  <p className="text-xs text-indigo-200/70 leading-relaxed">
                    Your summary is strong, but recruiters match faster when you include specific metrics or scale. E.g., "Led a team of 5 to scale product x 10x". Add quantifiable results.
                  </p>
                </div>
              </div>

              {/* Work Experience Editor */}
              <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6 shadow-xl relative group">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-amber-500/20 rounded-md text-amber-500"><Briefcase className="w-4 h-4" /></div>
                    <h4 className="font-bold text-white tracking-tight">Experience</h4>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  {data.experience.map((exp, i) => (
                    <div key={exp.id} className="grid grid-cols-2 gap-4 pb-6 border-b border-white/5 last:border-0 last:pb-0">
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-[10px] uppercase text-white/30 mb-1 ml-1">Role</label>
                        <input className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-[#6366f1]/50 focus:outline-none"
                          value={exp.role}
                          onChange={(e) => {
                            const newExp = [...data.experience];
                            newExp[i].role = e.target.value;
                            updateField('experience', newExp);
                          }} />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase text-white/30 mb-1 ml-1">Company</label>
                        <input className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-[#6366f1]/50 focus:outline-none"
                          value={exp.company}
                          onChange={(e) => {
                            const newExp = [...data.experience];
                            newExp[i].company = e.target.value;
                            updateField('experience', newExp);
                          }} />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase text-white/30 mb-1 ml-1">Period</label>
                        <input className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-[#6366f1]/50 focus:outline-none"
                          value={exp.period}
                          onChange={(e) => {
                            const newExp = [...data.experience];
                            newExp[i].period = e.target.value;
                            updateField('experience', newExp);
                          }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education Editor */}
              <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6 shadow-xl relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-purple-500/20 rounded-md text-purple-400"><GraduationCap className="w-4 h-4" /></div>
                    <h4 className="font-bold text-white tracking-tight">Education</h4>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  {data.education.map((edu, i) => (
                    <div key={edu.id} className="grid grid-cols-2 gap-4 pb-6 border-b border-white/5 last:border-0 last:pb-0">
                      <div className="col-span-2">
                        <label className="block text-[10px] uppercase text-white/30 mb-1 ml-1">Institution</label>
                        <input className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-[#6366f1]/50 focus:outline-none"
                          value={edu.institution} onChange={(e) => {
                            const arr = [...data.education]; arr[i].institution = e.target.value; updateField('education', arr);
                          }} />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase text-white/30 mb-1 ml-1">Degree</label>
                        <input className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-[#6366f1]/50 focus:outline-none"
                          value={edu.degree} onChange={(e) => {
                            const arr = [...data.education]; arr[i].degree = e.target.value; updateField('education', arr);
                          }} />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase text-white/30 mb-1 ml-1">Year</label>
                        <input className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-[#6366f1]/50 focus:outline-none"
                          value={edu.year} onChange={(e) => {
                            const arr = [...data.education]; arr[i].year = e.target.value; updateField('education', arr);
                          }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills & Projects */}
              <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6 shadow-xl relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-rose-500/20 rounded-md text-rose-500"><Zap className="w-4 h-4" /></div>
                    <h4 className="font-bold text-white tracking-tight">Skills</h4>
                  </div>
                </div>
                <textarea className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[#6366f1]/50 focus:outline-none h-20 resize-none font-mono text-white/70"
                  value={data.skills} onChange={e => updateField('skills', e.target.value)} />
              </div>

              <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6 shadow-xl relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-cyan-500/20 rounded-md text-cyan-400"><LinkIcon className="w-4 h-4" /></div>
                    <h4 className="font-bold text-white tracking-tight">Projects</h4>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  {data.projects.map((proj, i) => (
                    <div key={proj.id} className="grid grid-cols-1 gap-4 pb-6 border-b border-white/5 last:border-0 last:pb-0">
                      <div>
                        <label className="block text-[10px] uppercase text-white/30 mb-1 ml-1">Project Name</label>
                        <input className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-[#6366f1]/50 focus:outline-none"
                          value={proj.name} onChange={(e) => {
                            const arr = [...data.projects]; arr[i].name = e.target.value; updateField('projects', arr);
                          }} />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase text-white/30 mb-1 ml-1">Description</label>
                        <textarea className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-[#6366f1]/50 focus:outline-none resize-none h-16"
                          value={proj.description} onChange={(e) => {
                            const arr = [...data.projects]; arr[i].description = e.target.value; updateField('projects', arr);
                          }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom Sections Editor */}
              <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6 shadow-xl relative mt-4">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                     <div className="p-1.5 bg-pink-500/20 rounded-md text-pink-400">
                       <Plus className="w-4 h-4" />
                     </div>
                     <h4 className="font-bold text-white tracking-tight">Custom Sections</h4>
                  </div>
                  <button 
                    onClick={() => updateField('customSections', [...(data.customSections || []), { id: Date.now(), title: 'New Section', items: [] }])}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 transition-colors text-white/70 text-[10px] uppercase font-bold tracking-widest rounded flex items-center gap-1 border border-white/10"
                  >
                    + Add Section
                  </button>
                </div>
                
                <div className="flex flex-col gap-8">
                  {(data.customSections || []).map((section, sIndex) => (
                    <div key={section.id} className="border border-white/5 rounded-lg p-5 bg-black/40 shadow-inner">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/5">
                        <input 
                          className="bg-transparent text-lg font-bold text-white focus:outline-none focus:border-b focus:border-pink-500/50 w-full sm:w-1/2 placeholder:text-white/20 transition-all pb-1"
                          value={section.title}
                          onChange={e => {
                            const newSec = [...data.customSections];
                            newSec[sIndex].title = e.target.value;
                            updateField('customSections', newSec);
                          }}
                          placeholder="Section Title (e.g. Awards)"
                        />
                        <div className="flex gap-2 self-end sm:self-auto shrink-0">
                          <button 
                            onClick={() => {
                              const newSec = [...data.customSections];
                              newSec[sIndex].items.push({ id: Date.now() + Math.random(), title: '', subtitle: '', content: '' });
                              updateField('customSections', newSec);
                            }}
                            className="px-2 py-1 text-[10px] uppercase font-bold tracking-widest text-pink-400 hover:bg-pink-500/10 rounded transition-colors"
                          >+ Add Item</button>
                          <button 
                            onClick={() => {
                              updateField('customSections', data.customSections.filter(s => s.id !== section.id));
                            }}
                            className="px-2 py-1 text-[10px] uppercase font-bold tracking-widest text-red-500/70 hover:bg-red-500/10 hover:text-red-400 rounded transition-colors"
                          >Delete Block</button>
                        </div>
                      </div>

                      <div className="flex flex-col gap-6">
                        {section.items.map((item, iIndex) => (
                          <div key={item.id} className="flex gap-3 pl-2 sm:pl-4 relative group">
                             <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white/5 group-hover:bg-pink-500/30 transition-colors rounded-full" />
                             
                             <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                               <div>
                                 <label className="block text-[10px] uppercase text-white/30 mb-1 ml-1">Heading</label>
                                 <input className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-pink-500/50 focus:outline-none transition-colors" 
                                        placeholder="E.g. Full Stack Developer"
                                        value={item.title} onChange={e => { const a = [...data.customSections]; a[sIndex].items[iIndex].title = e.target.value; updateField('customSections', a); }} />
                               </div>
                               <div>
                                 <label className="block text-[10px] uppercase text-white/30 mb-1 ml-1">Subheading</label>
                                 <input className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-pink-500/50 focus:outline-none transition-colors" 
                                        placeholder="E.g. Meta | 2021-2023"
                                        value={item.subtitle} onChange={e => { const a = [...data.customSections]; a[sIndex].items[iIndex].subtitle = e.target.value; updateField('customSections', a); }} />
                               </div>
                               <div className="sm:col-span-2">
                                 <label className="block text-[10px] uppercase text-white/30 mb-1 ml-1">Content Details</label>
                                 <textarea className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-pink-500/50 focus:outline-none resize-none h-16 transition-colors" 
                                        placeholder="Describe your achievements, tasks, or information here..."
                                        value={item.content} onChange={e => { const a = [...data.customSections]; a[sIndex].items[iIndex].content = e.target.value; updateField('customSections', a); }} />
                               </div>
                             </div>
                             
                             <button 
                               onClick={() => {
                                 const newSec = [...data.customSections];
                                 newSec[sIndex].items = newSec[sIndex].items.filter(it => it.id !== item.id);
                                 updateField('customSections', newSec);
                               }}
                               className="opacity-0 group-hover:opacity-100 mt-5 w-6 h-6 shrink-0 bg-red-500/10 hover:bg-red-500/20 rounded flex items-center justify-center text-red-400 transition-all pointer-events-auto"
                               title="Remove Item"
                             >×</button>
                          </div>
                        ))}
                        {section.items.length === 0 && (
                          <div className="text-xs text-white/20 text-center py-4 font-medium tracking-wide">
                            No items added yet. Click "+ Add Item" above.
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {(!data.customSections || data.customSections.length === 0) && (
                    <div className="text-center py-8 border border-dashed border-white/10 rounded-lg bg-white/[0.01]">
                      <p className="text-sm text-white/40 mb-3">Want to add certifications, awards, or volunteer work?</p>
                      <button 
                        onClick={() => updateField('customSections', [{ id: Date.now(), title: 'Certifications', items: [{ id: Date.now()+1, title: '', subtitle: '', content: '' }] }])}
                        className="px-4 py-2 bg-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest rounded-md hover:bg-indigo-500/30 transition-colors"
                      >
                        Create Custom Section
                      </button>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Start Applying Button Segment */}
        <div className="w-full mt-32 mb-32 flex justify-center">
          <Link href="/apply" className="group relative inline-flex items-center gap-2 px-10 py-5 bg-white text-black font-semibold text-lg rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)]">
            Start Applying  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
