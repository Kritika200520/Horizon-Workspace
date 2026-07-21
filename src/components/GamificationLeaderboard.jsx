import React from 'react';
import { 
  Flame, 
  Award, 
  Trophy, 
  Sparkles, 
  ShieldCheck, 
  Users,
  Zap,
  Star
} from 'lucide-react';
import { getUserXP, getUserStreak, getLevelInfo, BADGES_LIST, MOCK_LEADERBOARD } from '../services/gamificationService';

export default function GamificationLeaderboard({ user }) {
  const xp = getUserXP();
  const streak = getUserStreak();
  const levelInfo = getLevelInfo(xp);

  const xpProgressPct = ((xp - levelInfo.prevXP) / (levelInfo.nextXP - levelInfo.prevXP)) * 100;

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl p-8 glass-card border border-orange-200/80 shadow-md">
        <div className="glow-aura-peach top-0 right-0"></div>
        <div className="glow-aura-lavender bottom-0 left-0"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-900 border border-orange-200 text-xs font-bold font-mono">
              <Trophy className="w-3.5 h-3.5 text-orange-600" />
              HORIZON GAMIFICATION & LEADERBOARD
            </div>

            <h2 className="text-3xl font-black text-stone-900 tracking-tight">
              Level {levelInfo.level}: <span className="gradient-text-warm">{levelInfo.title}</span>
            </h2>

            <p className="text-stone-600 text-xs leading-relaxed max-w-xl font-medium">
              Earn XP points by completing study tasks, running Pomodoro sessions, logging high marks, and solving AI quizzes!
            </p>
          </div>

          {/* Streak Flame Badge */}
          <div className="glass-panel p-6 rounded-3xl border border-orange-300 flex items-center gap-4 bg-gradient-to-r from-orange-100/80 to-amber-100/80 shadow-md">
            <div className="p-3 rounded-2xl bg-orange-500 text-white shadow-md">
              <Flame className="w-7 h-7 animate-bounce" />
            </div>
            <div>
              <div className="text-3xl font-black text-stone-900">{streak} Days</div>
              <div className="text-xs font-extrabold uppercase text-orange-800 tracking-wider">Active Study Streak</div>
            </div>
          </div>
        </div>

        {/* Level XP Progress Bar */}
        <div className="relative z-10 mt-6 pt-6 border-t border-stone-200 space-y-2">
          <div className="flex justify-between text-xs font-mono font-bold text-stone-700">
            <span>Level {levelInfo.level} ({xp} XP)</span>
            <span>Next Level: {levelInfo.nextXP} XP</span>
          </div>

          <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-purple-600 transition-all duration-1000"
              style={{ width: `${Math.min(100, xpProgressPct)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Badges Shelf */}
      <div className="glass-card p-6 rounded-3xl border border-stone-200 space-y-4 shadow-sm">
        <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-orange-600" />
          Unlockable Achievement Badges
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {BADGES_LIST.map((b) => (
            <div
              key={b.id}
              className={`p-4 rounded-2xl border flex flex-col items-center text-center space-y-2 transition-all ${
                b.unlocked
                  ? 'bg-white border-orange-300 shadow-sm text-stone-900'
                  : 'bg-stone-100/60 border-stone-200 opacity-50 grayscale'
              }`}
            >
              <div className="text-3xl">{b.icon}</div>
              <div className="text-xs font-extrabold">{b.name}</div>
              <div className="text-[10px] text-stone-500 leading-tight font-medium">{b.description}</div>
              {b.unlocked && (
                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Unlocked
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Friend Leaderboard Table */}
      <div className="glass-card p-6 rounded-3xl border border-stone-200 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            Friends & Classmates XP Leaderboard
          </h3>

          <span className="text-xs font-mono font-bold text-orange-700">Ranked by Total XP</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-amber-50/70 text-stone-600 uppercase text-[10px] font-mono tracking-wider border-b border-stone-200">
              <tr>
                <th className="px-6 py-4">Rank</th>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Level / Title</th>
                <th className="px-6 py-4">Streak</th>
                <th className="px-6 py-4 text-right">Total XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200/80">
              {MOCK_LEADERBOARD.map((lb) => (
                <tr key={lb.rank} className={`hover:bg-amber-50/40 transition-colors ${lb.isUser ? 'bg-orange-100/60 font-bold' : ''}`}>
                  <td className="px-6 py-4 font-black text-stone-900 text-sm">
                    {lb.rank === 1 ? '🥇 #1' : lb.rank === 2 ? '🥈 #2' : lb.rank === 3 ? '🥉 #3' : `#${lb.rank}`}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={lb.avatar} alt="Avatar" className="w-8 h-8 rounded-xl object-cover border border-orange-300" />
                      <span className="font-extrabold text-stone-900 text-sm">{lb.name} {lb.isUser && '(You)'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-stone-700 font-medium">{lb.level}</td>
                  <td className="px-6 py-4 font-bold text-orange-700">🔥 {lb.streak} Days</td>
                  <td className="px-6 py-4 text-right font-mono font-black text-stone-900 text-sm">{lb.xp} XP</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
