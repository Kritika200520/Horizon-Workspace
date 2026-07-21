import React, { useState } from 'react';
import { 
  Sparkles, 
  RefreshCw, 
  Target, 
  Calendar, 
  Award, 
  AlertCircle, 
  CheckCircle2, 
  Send,
  Cpu,
  Brain,
  BellRing,
  HelpCircle,
  MapPin,
  Check,
  Clock,
  ArrowRight
} from 'lucide-react';
import { analyzeStudentPerformance } from '../services/geminiService';

export default function AIAnalysis({ 
  marksData, 
  todoData, 
  pomodoroStats, 
  notesData, 
  aiResult, 
  setAiResult, 
  geminiKeySet,
  onSendEmailReminder
}) {
  const [loading, setLoading] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [completedMilestones, setCompletedMilestones] = useState({});

  const handleRunAnalysis = async (promptOverride) => {
    setLoading(true);
    const activePrompt = promptOverride !== undefined ? promptOverride : customPrompt;
    try {
      const result = await analyzeStudentPerformance({
        marksData,
        todoData,
        pomodoroStats,
        notesData,
        customPrompt: activePrompt
      });
      setAiResult(result);
    } catch (e) {
      console.error('AI Analysis failed:', e);
    } finally {
      setLoading(false);
    }
  };

  const toggleMilestone = (key) => {
    setCompletedMilestones(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl p-8 glass-card border border-orange-200/80 shadow-md">
        <div className="glow-aura-peach top-0 left-0"></div>
        <div className="glow-aura-lavender bottom-0 right-0"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-900 border border-orange-200 text-xs font-bold font-mono flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-orange-600" />
                GEMINI 3 FLASH ROADMAP ENGINE
              </span>
              <span className="text-xs text-stone-500 font-medium">
                {geminiKeySet ? 'API Connected' : 'Simulated Engine'}
              </span>
            </div>

            <h2 className="text-2xl font-black text-stone-900 tracking-tight gradient-text-warm">
              Deep Gemini 3 Flash AI Visual Roadmap Hub
            </h2>
            <p className="text-xs text-stone-600 max-w-xl font-medium">
              Generates step-by-step interactive study roadmaps tailored to your specific questions & target grades.
            </p>
          </div>

          <button
            onClick={() => handleRunAnalysis()}
            disabled={loading}
            className="btn-primary px-6 py-3 rounded-2xl text-xs font-extrabold flex items-center gap-2 shadow-lg min-w-[200px] justify-center cursor-pointer"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Generating Roadmap...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Generate Roadmap</span>
              </>
            )}
          </button>
        </div>

        {/* Custom Prompt Box */}
        <div className="relative z-10 mt-6 pt-6 border-t border-stone-200 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <HelpCircle className="w-4 h-4 absolute left-3.5 top-3.5 text-orange-500" />
            <input
              type="text"
              placeholder="Ask Gemini 3 Flash for a roadmap (e.g., how do i get full in physics?)..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRunAnalysis()}
              className="w-full pl-10 pr-4 py-3 rounded-2xl glass-input text-xs font-medium"
            />
          </div>
          <button
            onClick={() => handleRunAnalysis()}
            disabled={loading}
            className="btn-primary px-5 py-3 rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <Send className="w-3.5 h-3.5 text-white" />
            <span>Generate Pathway</span>
          </button>
        </div>
      </div>

      {/* Main Analysis Display */}
      {aiResult ? (
        <div className="space-y-8">
          
          {/* VISUAL ROADMAP STEPPER CARD */}
          {aiResult.roadmap && (
            <div className="glass-card p-6 sm:p-8 rounded-3xl border-2 border-orange-300 shadow-xl space-y-6 bg-gradient-to-r from-orange-50/70 via-amber-50/50 to-purple-50/70">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-orange-200 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-orange-500 text-white shadow-md">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-stone-900">{aiResult.roadmap.title}</h3>
                    <div className="text-xs text-orange-700 font-bold">{aiResult.roadmap.subtitle}</div>
                  </div>
                </div>

                <button
                  onClick={() => onSendEmailReminder({
                    title: `Gemini Roadmap: ${aiResult.roadmap.title}`,
                    details: aiResult.roadmap.phases.map(p => `[${p.timeline}] ${p.name}: ${p.description}`).join('\n\n'),
                    category: 'STUDY ROADMAP',
                    geminiTip: aiResult.motivationalQuote
                  })}
                  className="btn-secondary px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2"
                >
                  <BellRing className="w-4 h-4 text-orange-600" />
                  <span>Email Full Roadmap</span>
                </button>
              </div>

              {/* Roadmaps Stepper Nodes */}
              <div className="space-y-6 relative">
                {aiResult.roadmap.phases.map((phase, pIdx) => (
                  <div key={pIdx} className="relative flex flex-col md:flex-row items-start gap-4 p-5 rounded-2xl bg-white border border-orange-200/90 shadow-sm">
                    
                    {/* Phase Number Node */}
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white font-black text-base flex items-center justify-center shadow-md">
                        {phase.phaseNumber || pIdx + 1}
                      </div>
                      <div className="block md:hidden font-extrabold text-stone-900 text-sm">{phase.name}</div>
                    </div>

                    {/* Phase Content */}
                    <div className="flex-1 space-y-3 w-full">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <div className="hidden md:block text-sm font-extrabold text-stone-900">{phase.name}</div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-orange-100 text-orange-800 border border-orange-200 font-mono">
                            {phase.timeline}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-purple-100 text-purple-800 border border-purple-200 flex items-center gap-1 font-mono">
                            <Clock className="w-3 h-3 text-purple-600" />
                            {phase.sprintTip}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-stone-600 font-medium">{phase.description}</p>

                      {/* Milestones Checklist */}
                      <div className="space-y-2 pt-1">
                        <div className="text-[10px] font-mono uppercase text-stone-400 font-extrabold">Milestone Action Checklist:</div>
                        <div className="grid grid-cols-1 gap-2">
                          {phase.milestones.map((m, mIdx) => {
                            const mKey = `${pIdx}_${mIdx}`;
                            const isDone = !!completedMilestones[mKey];
                            return (
                              <div
                                key={mIdx}
                                onClick={() => toggleMilestone(mKey)}
                                className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2.5 cursor-pointer transition-all ${
                                  isDone ? 'bg-emerald-50 border-emerald-200 text-emerald-900 opacity-70 line-through' : 'bg-stone-50/80 border-stone-200 hover:border-orange-300 text-stone-800'
                                }`}
                              >
                                <div className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                                  isDone ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-stone-300 bg-white'
                                }`}>
                                  {isDone && <Check className="w-3 h-3" />}
                                </div>
                                <span>{m}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top Score Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-3xl border border-orange-200 flex items-center gap-4 shadow-sm">
              <div className="p-3 rounded-2xl bg-orange-100 text-orange-600">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-stone-500 font-bold uppercase">Efficiency Rating</div>
                <div className="text-2xl font-black text-stone-900">{aiResult.efficiencyScore}%</div>
                <div className="text-[10px] text-orange-700 font-mono">GEMINI CALIBRATED</div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-3xl border border-purple-200 flex items-center gap-4 shadow-sm">
              <div className="p-3 rounded-2xl bg-purple-100 text-purple-600">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-stone-500 font-bold uppercase">Predicted Grade Range</div>
                <div className="text-2xl font-black text-stone-900">{aiResult.predictedGrade}</div>
                <div className="text-[10px] text-purple-700 font-mono">TARGET TRAJECTORY</div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-3xl border border-stone-200 flex items-center justify-between p-6 shadow-sm">
              <div>
                <div className="text-xs text-stone-500 font-bold uppercase">Email AI Strategy</div>
                <div className="text-sm font-bold text-stone-900">Send Action Plan</div>
                <div className="text-[10px] text-stone-500">Dispatch report to your inbox</div>
              </div>
              <button
                onClick={() => onSendEmailReminder({
                  title: `Gemini 3 Flash Strategy: ${aiResult.verdictTitle}`,
                  details: `Efficiency Score: ${aiResult.efficiencyScore}%. Predicted Grade: ${aiResult.predictedGrade}`,
                  category: 'AI ACTION PLAN',
                  geminiTip: aiResult.motivationalQuote
                })}
                className="p-3 rounded-xl bg-orange-100 text-orange-700 hover:bg-orange-200 border border-orange-200 transition-all cursor-pointer"
                title="Email Strategy"
              >
                <BellRing className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-3xl border border-emerald-200 space-y-4 shadow-sm">
              <h3 className="text-sm font-extrabold text-emerald-800 flex items-center gap-2 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Key Academic Strengths
              </h3>
              <ul className="space-y-2.5 text-xs text-stone-800 font-medium">
                {aiResult.strengths?.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5"></span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card p-6 rounded-3xl border border-rose-200 space-y-4 shadow-sm">
              <h3 className="text-sm font-extrabold text-rose-800 flex items-center gap-2 uppercase tracking-wider">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                Risk Factors & Growth Opportunities
              </h3>
              <ul className="space-y-2.5 text-xs text-stone-800 font-medium">
                {aiResult.weaknesses?.map((w, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-rose-50 border border-rose-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5"></span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Subject Strategy */}
          <div className="glass-card p-6 rounded-3xl border border-stone-200 space-y-4 shadow-sm">
            <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-600" />
              Subject-by-Subject Recommendations
            </h3>

            <div className="space-y-3">
              {aiResult.subjectRecommendations?.map((rec, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
                  <div>
                    <div className="text-sm font-extrabold text-stone-900">{rec.subject}</div>
                    <div className="text-xs text-stone-600 font-medium mt-0.5">{rec.tip}</div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    rec.status === 'Excellence' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                    rec.status === 'On Track' ? 'bg-orange-100 text-orange-800 border border-orange-200' :
                    'bg-amber-100 text-amber-900 border border-amber-200'
                  }`}>
                    {rec.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 glass-card rounded-3xl border border-stone-200 shadow-sm">
          <Sparkles className="w-12 h-12 text-orange-500 mx-auto mb-4 animate-bounce" />
          <h3 className="text-lg font-extrabold text-stone-900">Click "Generate Roadmap" Above</h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto mt-1 font-medium">
            Gemini 3 Flash will build a 4-phase step-by-step visual study roadmap tailored to your target scores.
          </p>
        </div>
      )}
    </div>
  );
}
