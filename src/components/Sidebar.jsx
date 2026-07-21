import React from 'react';
import { 
  Home,
  LayoutDashboard, 
  GraduationCap, 
  Sparkles, 
  Timer, 
  CheckSquare, 
  FileText, 
  BellRing, 
  Zap,
  Settings,
  LogOut
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, geminiKeySet, onOpenSettings, onLogout }) {
  const navItems = [
    { id: 'home', label: 'Mindful Home', icon: Home, badge: 'New' },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'marks', label: 'Marks & Trends', icon: GraduationCap },
    { id: 'ai-analysis', label: 'AI Analysis', icon: Sparkles, badge: 'Gemini 3' },
    { id: 'pomodoro', label: 'Pomodoro Focus', icon: Timer },
    { id: 'todos', label: 'Todo Tasks', icon: CheckSquare },
    { id: 'notes', label: 'Markdown Notes', icon: FileText },
    { id: 'reminders', label: 'Email & Alerts', icon: BellRing }
  ];

  return (
    <aside className="w-64 glass-panel border-r border-slate-800/60 flex flex-col justify-between p-4 min-h-screen sticky top-0 z-30 select-none">
      <div>
        {/* App Logo */}
        <div className="flex items-center gap-3 px-3 py-4 mb-6">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-purple-500/25">
            <div className="w-full h-full bg-[#060911] rounded-[10px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-purple-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="font-extrabold text-lg tracking-tight gradient-text">HORIZON AI</div>
            <div className="text-[10px] text-slate-400 font-mono tracking-wider uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
              Student OS v3.0
            </div>
          </div>
        </div>

        {/* Gemini Engine Badge */}
        <div className="mx-2 mb-6 p-3 rounded-xl bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-slate-900/60 border border-purple-500/20 backdrop-blur-md">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-300 font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              Engine
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${geminiKeySet ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'}`}>
              {geminiKeySet ? 'API Connected' : 'Gemini 3 Flash'}
            </span>
          </div>
          <div className="text-[11px] text-slate-400 line-clamp-1">
            {geminiKeySet ? 'Google AI Studio Key' : 'Gemini 3 Flash Active'}
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600/30 to-indigo-600/20 text-white border border-purple-500/30 shadow-md shadow-purple-950/50'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-purple-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer / Settings & Logout */}
      <div className="pt-4 border-t border-slate-800/60 space-y-1">
        <button
          onClick={onOpenSettings}
          className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all cursor-pointer"
        >
          <Settings className="w-4 h-4 text-slate-400" />
          <span>API & Email Keys</span>
        </button>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
