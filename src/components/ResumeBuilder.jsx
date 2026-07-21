import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  Download, 
  Sparkles, 
  Briefcase, 
  GraduationCap, 
  Code
} from 'lucide-react';

export default function ResumeBuilder({ user }) {
  const [resumeData, setResumeData] = useState({
    fullName: user?.name || 'Kritika S. Narayan',
    title: 'Computer Science & AI Scholar',
    email: user?.email || 'kritika@university.edu',
    phone: '+1 (555) 234-5678',
    education: 'B.S. Computer Science & Artificial Intelligence • GPA 3.9/4.0',
    skills: 'Python, C++, React, Node.js, PyTorch, SQL, Git, Algorithms',
    projects: '• Horizon AI Student OS: Developed full-stack student productivity platform with Gemini 3 Flash.\n• Distributed Systems Engine: Built high-concurrency consensus algorithm in C++.',
    honors: 'Dean\'s Honor List (2025-2026), 1st Place Campus AI Hackathon'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-stone-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-orange-600" />
            AI Student Resume Builder
          </h2>
          <p className="text-xs text-stone-500 font-medium mt-1">Format academic honors, coursework, and technical projects into an ATS-friendly resume</p>
        </div>

        <button
          onClick={handlePrint}
          className="btn-primary px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Export PDF</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor Panel */}
        <div className="glass-card p-6 rounded-3xl border border-stone-200 space-y-4 shadow-sm">
          <h3 className="text-sm font-extrabold text-stone-900">Resume Details</h3>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name & Title</label>
              <input
                type="text"
                value={resumeData.fullName}
                onChange={(e) => setResumeData({ ...resumeData, fullName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl glass-input text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Education & GPA</label>
              <input
                type="text"
                value={resumeData.education}
                onChange={(e) => setResumeData({ ...resumeData, education: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl glass-input text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Technical Skills</label>
              <input
                type="text"
                value={resumeData.skills}
                onChange={(e) => setResumeData({ ...resumeData, skills: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl glass-input text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Key Projects</label>
              <textarea
                rows="4"
                value={resumeData.projects}
                onChange={(e) => setResumeData({ ...resumeData, projects: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl glass-input text-xs font-mono"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Live Resume Sheet Preview */}
        <div className="glass-card p-8 rounded-3xl border border-stone-200 bg-white shadow-md space-y-6 text-stone-900 font-sans">
          <div className="border-b-2 border-stone-900 pb-4 text-center space-y-1">
            <h1 className="text-2xl font-black uppercase tracking-tight">{resumeData.fullName}</h1>
            <p className="text-xs font-bold text-stone-600">{resumeData.title}</p>
            <div className="text-[11px] text-stone-500 font-mono">
              {resumeData.email} • {resumeData.phone}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-orange-600 border-b border-stone-200 pb-1">
              Education
            </h4>
            <p className="text-xs font-semibold text-stone-800">{resumeData.education}</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-orange-600 border-b border-stone-200 pb-1">
              Technical Skills
            </h4>
            <p className="text-xs font-medium text-stone-800">{resumeData.skills}</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-orange-600 border-b border-stone-200 pb-1">
              Projects & Research
            </h4>
            <pre className="text-xs font-sans text-stone-800 whitespace-pre-wrap leading-relaxed font-medium">
              {resumeData.projects}
            </pre>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-orange-600 border-b border-stone-200 pb-1">
              Honors & Leadership
            </h4>
            <p className="text-xs font-medium text-stone-800">{resumeData.honors}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
