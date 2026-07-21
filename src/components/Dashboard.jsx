import React, { useEffect, useRef } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Plus, 
  ArrowRight, 
  Award,
  BrainCircuit,
  Zap,
  BellRing,
  Sun
} from 'lucide-react';

export default function Dashboard({ 
  marksData, 
  todoData, 
  pomodoroStats, 
  notesData, 
  aiResult, 
  onNavigate,
  onOpenAddMarks,
  onOpenAddTask,
  onSendEmailReminder
}) {
  const canvasRef = useRef(null);

  const avgScore = marksData.length 
    ? (marksData.reduce((acc, m) => acc + (Number(m.score) / Number(m.maxScore)) * 100, 0) / marksData.length).toFixed(1)
    : 0;

  const totalFocusHours = (pomodoroStats.totalFocusMinutes / 60).toFixed(1);
  const pendingTasks = todoData.filter(t => !t.completed).length;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.parentElement.clientWidth;
    const height = canvas.height = 180;

    ctx.clearRect(0, 0, width, height);

    if (marksData.length < 2) {
      ctx.beginPath();
      ctx.strokeStyle = '#F97316';
      ctx.lineWidth = 3;
      ctx.moveTo(0, height / 2);
      for (let x = 0; x < width; x += 10) {
        ctx.lineTo(x, height / 2 + Math.sin(x * 0.03) * 20);
      }
      ctx.stroke();
      return;
    }

    const sorted = [...marksData].sort((a, b) => new Date(a.date) - new Date(b.date));
    const padding = 35;
    const chartW = width - padding * 2;
    const chartH = height - padding * 2;

    const points = sorted.map((m, idx) => {
      const pct = (Number(m.score) / Number(m.maxScore)) * 100;
      const x = padding + (idx / (sorted.length - 1)) * chartW;
      const y = height - padding - ((pct - 40) / 60) * chartH;
      return { x, y: Math.max(padding, Math.min(height - padding, y)), score: pct, subject: m.subject };
    });

    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(249, 115, 22, 0.25)');
    gradient.addColorStop(1, 'rgba(249, 115, 22, 0.0)');

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      const xc = (points[i].x + points[i - 1].x) / 2;
      const yc = (points[i].y + points[i - 1].y) / 2;
      ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, xc, yc);
    }
    ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
    ctx.lineTo(points[points.length - 1].x, height - padding);
    ctx.lineTo(points[0].x, height - padding);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = '#EA580C';
    ctx.lineWidth = 3.5;
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      const xc = (points[i].x + points[i - 1].x) / 2;
      const yc = (points[i].y + points[i - 1].y) / 2;
      ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, xc, yc);
    }
    ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
    ctx.stroke();

    points.forEach((pt) => {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#F97316';
      ctx.shadowColor = 'rgba(249, 115, 22, 0.4)';
      ctx.shadowBlur = 8;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.shadowBlur = 0;
    });

  }, [marksData]);

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl p-8 glass-card border border-orange-200/80 shadow-md">
        <div className="glow-aura-peach top-0 right-0"></div>
        <div className="glow-aura-lavender bottom-0 left-0"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-900 border border-orange-200 text-xs font-bold font-mono">
              <Sun className="w-3.5 h-3.5 text-orange-500" />
              <span>GEMINI 3 FLASH WEEKLY VERDICT</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              {aiResult?.verdictTitle || 'Strong Consistency & High Focus Velocity'}
            </h2>

            <p className="text-stone-600 text-xs leading-relaxed max-w-2xl font-medium">
              {aiResult?.summary || 'Your academic velocity is trending upward. Maintaining structured Pomodoro sessions in weak subject areas will lock in your target A-grade trajectory.'}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('ai-analysis')}
                className="btn-primary px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
              >
                <span>Full Gemini Strategy Hub</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onSendEmailReminder({
                  title: `Weekly AI Report: ${aiResult?.verdictTitle || 'Progress Summary'}`,
                  details: `Academic Average: ${avgScore}%. Efficiency Score: ${aiResult?.efficiencyScore || 85}%. Predicted Grade: ${aiResult?.predictedGrade || 'A-'}`,
                  category: 'WEEKLY AI SUMMARY',
                  geminiTip: aiResult?.motivationalQuote || 'Keep building consistent daily study momentum.'
                })}
                className="btn-secondary px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
              >
                <BellRing className="w-3.5 h-3.5 text-orange-600" />
                <span>Email Report</span>
              </button>
            </div>
          </div>

          {/* Efficiency Gauge Card */}
          <div className="glass-panel p-6 rounded-2xl border border-stone-200 flex flex-col items-center justify-center text-center space-y-3 shadow-sm">
            <div className="text-xs font-extrabold uppercase tracking-wider text-stone-500">AI Efficiency Score</div>
            <div className="relative flex items-center justify-center">
              <svg className="w-28 h-28 transform -rotate-90">
                <circle cx="56" cy="56" r="48" stroke="#E7E5E4" strokeWidth="8" fill="transparent" />
                <circle 
                  cx="56" 
                  cy="56" 
                  r="48" 
                  stroke="url(#efficiencyWarmGradient)" 
                  strokeWidth="8" 
                  strokeDasharray={2 * Math.PI * 48}
                  strokeDashoffset={2 * Math.PI * 48 * (1 - (aiResult?.efficiencyScore || 85) / 100)}
                  strokeLinecap="round"
                  fill="transparent" 
                />
                <defs>
                  <linearGradient id="efficiencyWarmGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#EA580C" />
                    <stop offset="100%" stopColor="#D97706" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-stone-900">{aiResult?.efficiencyScore || 85}%</span>
                <span className="text-[10px] text-orange-700 font-extrabold uppercase">OPTIMAL</span>
              </div>
            </div>
            <div className="text-xs font-bold text-stone-700">
              Predicted: <span className="text-orange-600 font-extrabold">{aiResult?.predictedGrade || 'A- (88-92%)'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-card glass-card-hover p-5 rounded-2xl border border-stone-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500">Marks Average</span>
            <div className="p-2 rounded-xl bg-orange-100 text-orange-600">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-stone-900">{avgScore}%</div>
          <div className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>Across {marksData.length} logged subjects</span>
          </div>
        </div>

        <div className="glass-card glass-card-hover p-5 rounded-2xl border border-stone-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500">Focus Time</span>
            <div className="p-2 rounded-xl bg-purple-100 text-purple-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-stone-900">{totalFocusHours} hrs</div>
          <div className="text-[11px] text-stone-600 font-medium">
            {pomodoroStats.completedSessions || 0} Pomodoro sessions completed
          </div>
        </div>

        <div className="glass-card glass-card-hover p-5 rounded-2xl border border-stone-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500">Pending Tasks</span>
            <div className="p-2 rounded-xl bg-rose-100 text-rose-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-stone-900">{pendingTasks}</div>
          <div className="text-[11px] text-rose-700 font-bold">
            {todoData.filter(t => t.priority === 'Urgent').length} urgent deadlines
          </div>
        </div>

        <div className="glass-card glass-card-hover p-5 rounded-2xl border border-stone-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500">Study Notes</span>
            <div className="p-2 rounded-xl bg-amber-100 text-amber-600">
              <BrainCircuit className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-stone-900">{notesData.length}</div>
          <div className="text-[11px] text-amber-800 font-medium">
            Markdown supported with AI flashcards
          </div>
        </div>
      </div>

      {/* Analytics Chart & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-6 rounded-3xl border border-stone-200 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-orange-600" />
                Score Trend & Progress Trajectory
              </h3>
              <p className="text-xs text-stone-500 font-medium">Historical performance logging across exams & assignments</p>
            </div>
            <button
              onClick={() => onNavigate('marks')}
              className="text-xs text-orange-600 font-bold hover:text-orange-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="relative w-full h-[180px]">
            <canvas ref={canvasRef} className="w-full h-full"></canvas>
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-stone-200 space-y-4">
          <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
            <Zap className="w-4 h-4 text-orange-500" />
            Quick Launch Actions
          </h3>

          <div className="space-y-3">
            <button
              onClick={onOpenAddMarks}
              className="w-full p-3 rounded-2xl bg-white border border-stone-200 hover:border-orange-300 text-left flex items-center justify-between group transition-all shadow-sm cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-orange-100 text-orange-600">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900 group-hover:text-orange-600">Log Exam Score</div>
                  <div className="text-[10px] text-stone-500">Record new mark for AI trend analysis</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-orange-600 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => onNavigate('pomodoro')}
              className="w-full p-3 rounded-2xl bg-white border border-stone-200 hover:border-orange-300 text-left flex items-center justify-between group transition-all shadow-sm cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-100 text-purple-600">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900 group-hover:text-purple-600">Start 25m Focus Sprint</div>
                  <div className="text-[10px] text-stone-500">With ambient rain soundscapes</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-purple-600 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onOpenAddTask}
              className="w-full p-3 rounded-2xl bg-white border border-stone-200 hover:border-orange-300 text-left flex items-center justify-between group transition-all shadow-sm cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-rose-100 text-rose-600">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900 group-hover:text-rose-600">Add Study Task</div>
                  <div className="text-[10px] text-stone-500">Set deadline & email reminder</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-rose-600 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
