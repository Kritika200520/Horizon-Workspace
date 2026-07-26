import React, { useState } from 'react';
import { 
  Home, 
  LayoutDashboard, 
  GraduationCap, 
  Sparkles, 
  Timer, 
  CheckSquare, 
  FileText, 
  BellRing, 
  Key, 
  LogOut, 
  Sun,
  ShieldAlert,
  Calendar,
  FolderGit2,
  Clock,
  MessageSquare,
  Code,
  Trophy,
  Flame,
  Menu,
  X,
  BookOpen,
  ChevronRight
} from 'lucide-react';
import { getUserXP, getUserStreak } from '../services/gamificationService';

export default function NavigationHeader({ 
  activeTab, 
  setActiveTab, 
  user, 
  geminiKeySet, 
  onOpenSettings, 
  onLogout 
}) {
  const xp = getUserXP();
  const streak = getUserStreak();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Categorized Navigation Items
  const MENU_GROUPS = [
    {
      title: 'WORKSPACE',
      items: [
        { id: 'home', label: 'Home Workspace', icon: Home },
        { id: 'dashboard', label: 'Analytics Dashboard', icon: LayoutDashboard },
        { id: 'todos', label: 'Task Priorities', icon: CheckSquare },
        { id: 'reminders', label: 'Reminders Hub', icon: BellRing }
      ]
    },
    {
      title: 'AI & ACADEMICS',
      items: [
        { id: 'ai-analysis', label: 'Gemini 3 Flash AI', icon: Sparkles, badge: 'Flash' },
        { id: 'quiz', label: 'AI Quiz & PYQ Analyzer', icon: BookOpen, badge: 'PDF/Pic' },
        { id: 'attendance', label: 'Attendance Guard', icon: ShieldAlert, badge: '<75%' },
        { id: 'timetable', label: 'Class Timetable', icon: Calendar },
        { id: 'marks', label: 'Marks & GPA', icon: GraduationCap },
        { id: 'notes', label: 'Markdown Notes', icon: FileText }
      ]
    },
    {
      title: 'FOCUS & PROJECTS',
      items: [
        { id: 'pomodoro', label: 'Pomodoro Soundscapes', icon: Timer },
        { id: 'projects', label: 'Group Projects Board', icon: FolderGit2 },
        { id: 'exams', label: 'Exam Tickers & Calendar', icon: Clock }
      ]
    },
    {
      title: 'CAREER & NEXUS',
      items: [
        { id: 'chat', label: 'Study Group Chat', icon: MessageSquare },
        { id: 'coding', label: 'Coding & GitHub', icon: Code },
        { id: 'resume', label: 'AI Resume Builder', icon: FileText },
        { id: 'gamification', label: 'XP & Leaderboard', icon: Trophy, badge: '🔥' }
      ]
    }
  ];

  const currentTabObj = MENU_GROUPS.flatMap(g => g.items).find(i => i.id === activeTab) || { label: 'Home Workspace', icon: Home };
  const CurrentIcon = currentTabObj.icon;

  const SidebarContent = () => (
    <div className="flex flex-col h-full justify-between p-4 space-y-6">
      
      {/* Brand Header */}
      <div className="space-y-4">
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 px-2 py-1 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 via-amber-400 to-purple-500 p-0.5 shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#FFFBF5] rounded-[14px] flex items-center justify-center">
              <Sun className="w-5 h-5 text-orange-500 animate-spin-slow" />
            </div>
          </div>
          <div>
            <div className="font-black text-lg tracking-tight gradient-text-warm">HORIZON AI</div>
            <div className="text-[10px] text-stone-400 font-mono font-bold uppercase tracking-wider">Student OS</div>
          </div>
        </div>

        {/* Navigation Categories Menu */}
        <div className="space-y-5 overflow-y-auto max-h-[calc(100vh-230px)] pr-1">
          {MENU_GROUPS.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1.5">
              <div className="px-3 text-[10px] font-mono font-extrabold uppercase text-stone-400 tracking-wider">
                {group.title}
              </div>

              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const ItemIcon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileOpen(false);
                      }}
                      className={`w-full px-3 py-2 rounded-2xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20 scale-[1.02]'
                          : 'text-stone-700 hover:bg-orange-100/60 hover:text-stone-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <ItemIcon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-orange-600'}`} />
                        <span>{item.label}</span>
                      </div>

                      {item.badge && (
                        <span className={`text-[9px] px-2 py-0.5 rounded-full font-extrabold font-mono ${
                          isActive
                            ? 'bg-white/25 text-white'
                            : 'bg-purple-100 text-purple-900 border border-purple-200'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Google User Profile Capsule */}
      <div className="pt-3 border-t border-stone-200/80 space-y-3">
        <div className="p-3.5 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                alt="Google User Avatar"
                className="w-10 h-10 rounded-2xl object-cover border-2 border-amber-400 shadow-sm"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[8px] text-white font-black">✓</span>
            </div>

            <div>
              <div className="text-xs font-black text-stone-900 leading-tight">{user?.name || 'Guest Student'}</div>
              <div className="text-[10px] text-stone-500 font-mono truncate max-w-[110px]" title={user?.email}>
                {user?.email || 'guest@university.edu'}
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono mt-0.5">
                <span className="text-orange-600 font-bold flex items-center gap-0.5">
                  <Flame className="w-3 h-3 fill-orange-500" />
                  {streak}d
                </span>
                <span className="text-stone-300">•</span>
                <span className="text-purple-700 font-extrabold">{xp} XP</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1 shrink-0">
            <button
              onClick={onOpenSettings}
              className="p-1.5 rounded-xl text-stone-400 hover:text-orange-600 hover:bg-orange-50 cursor-pointer"
              title="API Key Settings"
            >
              <Key className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onLogout}
              className="p-1.5 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );

  return (
    <>
      {/* DESKTOP FIXED LEFT SIDEBAR (W-64) */}
      <aside className="hidden md:block w-64 fixed top-0 left-0 bottom-0 z-40 bg-[#FFFBF5]/95 backdrop-blur-xl border-r border-orange-200/80 shadow-sm">
        <SidebarContent />
      </aside>

      {/* MOBILE TOP BAR WITH DRAWER TOGGLE */}
      <div className="md:hidden sticky top-0 z-40 px-4 py-3 bg-[#FAF6F0]/90 backdrop-blur-xl border-b border-orange-200/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 rounded-xl glass-panel border border-orange-200 text-stone-800"
          >
            {isMobileOpen ? <X className="w-5 h-5 text-orange-600" /> : <Menu className="w-5 h-5 text-orange-600" />}
          </button>
          <div className="font-black text-base gradient-text-warm">HORIZON AI</div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-orange-100 text-orange-900 border border-orange-200 text-xs font-extrabold">
          <CurrentIcon className="w-3.5 h-3.5 text-orange-600" />
          <span>{currentTabObj.label}</span>
        </div>
      </div>

      {/* MOBILE OVERLAY DRAWER */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div onClick={() => setIsMobileOpen(false)} className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm"></div>
          <div className="relative z-10 w-72 bg-[#FFFBF5] h-full shadow-2xl border-r border-orange-200">
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
}
