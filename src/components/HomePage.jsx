import React from 'react';
import { 
  Sparkles, 
  Flame, 
  Trophy, 
  ShieldAlert, 
  CloudRain, 
  Clock, 
  ArrowRight, 
  CheckCircle2,
  TrendingUp,
  Brain,
  Zap,
  BookOpen,
  Calendar,
  Wand2,
  MessageCircle
} from 'lucide-react';
import StandingCharacterMascot from './StandingCharacterMascot';
import { getUserXP, getUserStreak } from '../services/gamificationService';

export default function HomePage({ user, currentMood, setCurrentMood, onNavigate }) {
  const xp = getUserXP();
  const streak = getUserStreak();

  const character = user?.fictionalCharacter || {
    name: 'Nobita Nobi',
    universe: 'Doraemon',
    greetingQuote: 'Doraemon! Help me finish this homework!',
    colorAura: 'from-yellow-400 to-orange-400'
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* ANIMATED FULL-BODY STANDING & WAVING CHARACTER HERO BANNER */}
      <div className="glass-card p-8 rounded-3xl border border-orange-200 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-purple-500/10 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left Welcome Details */}
        <div className="space-y-4 max-w-xl z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-900 border border-orange-200 text-xs font-extrabold font-mono">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            HORIZON AI OS
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Welcome back, <span className="gradient-text-warm">{user?.name || 'Scholar'}</span>!
          </h1>

          {/* In-Character Speech Dialogue Bubble */}
          <div className="p-4 rounded-2xl bg-white/90 border border-amber-200 shadow-sm relative space-y-1">
            <div className="flex items-center gap-2 text-xs font-black text-stone-900">
              <span>💬</span>
              <span>{character.name} ({character.universe} Standing Mascot) Says:</span>
            </div>
            <p className="text-xs text-stone-700 font-bold italic leading-relaxed">
              "{character.greetingQuote}"
            </p>
          </div>

          {/* Study Vibe Switcher */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <span className="text-xs font-bold text-stone-700">Current Study Vibe:</span>
            <div className="flex items-center gap-2">
              {[
                { id: 'focused', label: '🔥 Deep Focus' },
                { id: 'creative', label: '💡 Creative' },
                { id: 'relaxed', label: '🍃 Relaxed' }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setCurrentMood(m.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                    currentMood === m.id
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-white text-stone-700 hover:bg-orange-50 border border-stone-200'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right ACTUAL FULL-BODY STANDING & WAVING CHARACTER MASCOT */}
        <div className="relative shrink-0 flex flex-col items-center select-none z-10 pr-4">
          <StandingCharacterMascot character={character} size="large" />
        </div>

      </div>

      {/* BENTO GRID WORKSPACE WIDGETS */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        
        {/* BENTO 1: GEMINI 3 FLASH AI PULSE */}
        <div className="glass-card p-6 rounded-3xl border border-purple-200 bg-gradient-to-br from-purple-50 via-white to-amber-50 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase text-purple-700 tracking-wider">AI Coach</span>
              <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
            </div>
            <h3 className="text-base font-extrabold text-stone-900">Gemini 3 Flash</h3>
            <p className="text-xs text-stone-500 font-medium leading-relaxed">
              Generate 4-phase visual roadmaps, solution outlines, and exam predictions.
            </p>
          </div>

          <button
            onClick={() => onNavigate('ai-analysis')}
            className="w-full btn-primary py-2.5 rounded-2xl text-xs font-extrabold flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
          >
            <span>Launch AI Coach</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* BENTO 2: STREAK & LEVEL CARD */}
        <div className="glass-card p-6 rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-orange-50 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-6 h-6 text-orange-500 fill-orange-500" />
              <div>
                <div className="text-lg font-black text-stone-900 font-mono">{streak} Days</div>
                <div className="text-[10px] text-stone-500 font-mono">Current Daily Streak</div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-base font-black text-purple-700 font-mono">{xp} XP</div>
              <div className="text-[10px] text-purple-600 font-mono font-bold">Level 6 Scholar</div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('gamification')}
            className="w-full btn-secondary py-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>Leaderboard & Badges</span>
          </button>
        </div>

        {/* BENTO 3: ATTENDANCE 75% GUARD ALERT */}
        <div className="glass-card p-6 rounded-3xl border border-rose-200 bg-rose-50/40 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-800 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              Attendance Guard (&lt;75%)
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-200 text-rose-900 font-mono">ALERT</span>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-extrabold text-stone-900">Organic Chemistry</div>
            <div className="text-xs text-rose-700 font-mono font-bold">66.7% Attended (12/18 Classes)</div>
            <p className="text-[10px] text-stone-500 font-medium">⚠️ Attend next 3 consecutive classes to recover above 75%!</p>
          </div>

          <button
            onClick={() => onNavigate('attendance')}
            className="w-full py-2 rounded-xl text-xs font-bold bg-white text-rose-800 border border-rose-200 hover:bg-rose-100 transition-colors cursor-pointer"
          >
            Log Class Attendance
          </button>
        </div>

        {/* BENTO 4: POMODORO SOUNDSCAPE QUICK LAUNCHER */}
        <div className="glass-card p-6 rounded-3xl border border-blue-200 bg-blue-50/30 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
              <CloudRain className="w-4 h-4 text-blue-600" />
              Focus Soundscapes
            </span>
            <span className="text-[10px] text-blue-700 font-mono font-bold">Web Audio</span>
          </div>

          <p className="text-xs text-stone-600 font-medium">
            Listen to 🌧️ Lofi Rain, 🍃 Forest Stream, or ✨ Deep Space white noise.
          </p>

          <button
            onClick={() => onNavigate('pomodoro')}
            className="w-full py-2 rounded-xl text-xs font-bold bg-white text-blue-900 border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer"
          >
            Start Focus Soundscape
          </button>
        </div>

        {/* BENTO 5: EXAM COUNTDOWN TICKER */}
        <div className="glass-card p-6 rounded-3xl border border-amber-200 bg-amber-50/40 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600" />
              Upcoming Exam Ticker
            </span>
            <span className="text-[10px] text-amber-800 font-mono font-bold">Live</span>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-extrabold text-stone-900">Quantum Physics Final</div>
            <div className="text-sm font-black text-amber-900 font-mono">6 Days, 17 Hours Left</div>
          </div>

          <button
            onClick={() => onNavigate('exams')}
            className="w-full py-2 rounded-xl text-xs font-bold bg-white text-amber-900 border border-amber-200 hover:bg-amber-100 transition-colors cursor-pointer"
          >
            View Exam Calendar
          </button>
        </div>

        {/* BENTO 6: AI QUIZ & PYQ ANALYZER */}
        <div className="glass-card p-6 rounded-3xl border border-emerald-200 bg-emerald-50/30 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              PYQ & Flashcards Hub
            </span>
            <span className="text-[10px] text-emerald-800 font-mono font-bold">PDF / Image</span>
          </div>

          <p className="text-xs text-stone-600 font-medium">
            Upload PDF or photo question papers for topic weightage & 3D Flashcards.
          </p>

          <button
            onClick={() => onNavigate('quiz')}
            className="w-full py-2 rounded-xl text-xs font-bold bg-white text-emerald-900 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
          >
            Analyze PYQ / Notes
          </button>
        </div>

      </div>
    </div>
  );
}
