// Horizon AI Gamification & XP Engine

const XP_STORAGE = 'horizon_user_xp';
const STREAK_STORAGE = 'horizon_user_streak';
const BADGES_STORAGE = 'horizon_unlocked_badges';

export const getUserXP = () => {
  const saved = localStorage.getItem(XP_STORAGE);
  return saved ? parseInt(saved, 10) : 1450;
};

export const addXP = (amount) => {
  const current = getUserXP();
  const next = current + amount;
  localStorage.setItem(XP_STORAGE, next.toString());
  return next;
};

export const getUserStreak = () => {
  const saved = localStorage.getItem(STREAK_STORAGE);
  return saved ? parseInt(saved, 10) : 7;
};

export const getLevelInfo = (xp) => {
  if (xp >= 5000) return { level: 6, title: 'Grand Scholar', nextXP: 7500, prevXP: 5000 };
  if (xp >= 3500) return { level: 5, title: 'Master Academic', nextXP: 5000, prevXP: 3500 };
  if (xp >= 2000) return { level: 4, title: 'Focus Titan', nextXP: 3500, prevXP: 2000 };
  if (xp >= 1000) return { level: 3, title: 'Dedicated Student', nextXP: 2000, prevXP: 1000 };
  if (xp >= 500) return { level: 2, title: 'Rising Apprentice', nextXP: 1000, prevXP: 500 };
  return { level: 1, title: 'Novice Learner', nextXP: 500, prevXP: 0 };
};

export const BADGES_LIST = [
  { id: 'b1', name: 'Focus Titan', icon: '⚡', description: 'Log 5+ Pomodoro focus sessions', unlocked: true },
  { id: 'b2', name: 'Grade Master', icon: '🏆', description: 'Achieve 90%+ in 3 logged subjects', unlocked: true },
  { id: 'b3', name: 'Streak Flame', icon: '🔥', description: 'Maintain a 7-day study streak', unlocked: true },
  { id: 'b4', name: 'Quiz Wizard', icon: '🧙', description: 'Score 100% on an AI Quiz', unlocked: true },
  { id: 'b5', name: 'Attendance Guard', icon: '🛡️', description: 'Keep 85%+ attendance in all subjects', unlocked: false },
  { id: 'b6', name: 'Code Samurai', icon: '💻', description: 'Solve 20+ coding challenges', unlocked: false }
];

export const MOCK_LEADERBOARD = [
  { rank: 1, name: 'Kritika S. Narayan', xp: 2450, level: 'Level 4 Focus Titan', streak: 7, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', isUser: true },
  { rank: 2, name: 'Alex Vance', xp: 2180, level: 'Level 4 Focus Titan', streak: 6, avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80', isUser: false },
  { rank: 3, name: 'Sophia Chen', xp: 1950, level: 'Level 3 Dedicated Student', streak: 5, avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80', isUser: false },
  { rank: 4, name: 'Liam Miller', xp: 1620, level: 'Level 3 Dedicated Student', streak: 4, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', isUser: false },
  { rank: 5, name: 'Emma Watson', xp: 1240, level: 'Level 3 Dedicated Student', streak: 3, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', isUser: false }
];
