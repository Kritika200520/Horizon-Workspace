import React from 'react';
import { Sparkles, Mail, Key, ShieldCheck } from 'lucide-react';

export default function Header({ activeTab, onOpenSettings, geminiKeySet, user }) {
  const titles = {
    home: 'Mindful Home & Mood Check-In',
    dashboard: 'Academic Overview & Intelligence',
    marks: 'Marks Tracker & Grade Analytics',
    'ai-analysis': 'Gemini 3 Flash AI Strategy Hub',
    pomodoro: 'Aesthetic Pomodoro Focus Timer',
    todos: 'Smart Todo & Deadline Scheduler',
    notes: 'Markdown Notes & AI Summaries',
    reminders: 'Email & Notification Dispatcher'
  };

  return (
    <header className="h-20 border-b border-slate-800/60 glass-panel px-8 flex items-center justify-between sticky top-0 z-20">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          {titles[activeTab] || 'Horizon AI Hub'}
        </h1>
        <p className="text-xs text-slate-400 font-medium mt-0.5">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })} • Horizon AI Student OS
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Gemini Engine Indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-xs text-slate-300">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          <span className="font-mono text-[11px] text-purple-300 font-semibold">Gemini 3 Flash</span>
        </div>

        {/* User Avatar & Info */}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
            alt="User Avatar"
            className="w-9 h-9 rounded-xl object-cover border border-purple-500/40"
          />
          <div className="hidden sm:block">
            <div className="text-xs font-bold text-white leading-tight">{user?.name || 'Scholar'}</div>
            <div className="text-[10px] text-purple-300 font-mono">{user?.provider || 'Google'}</div>
          </div>
        </div>

        {/* Settings button */}
        <button
          onClick={onOpenSettings}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl btn-secondary text-xs font-semibold"
          title="Configure Gemini API & Resend Email Keys"
        >
          <Key className="w-3.5 h-3.5 text-purple-400" />
          <span className="hidden sm:inline">Keys</span>
          {geminiKeySet ? (
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          )}
        </button>
      </div>
    </header>
  );
}
