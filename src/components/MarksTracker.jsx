import React, { useState } from 'react';
import { 
  GraduationCap, 
  Plus, 
  Trash2, 
  Award, 
  Search,
  Filter,
  Calculator,
  TrendingUp,
  Sparkles
} from 'lucide-react';

export default function MarksTracker({ marksData, onAddMark, onDeleteMark }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  // Simulator State
  const [simulatedScore, setSimulatedScore] = useState(92);

  const [subject, setSubject] = useState('');
  const [score, setScore] = useState('');
  const [maxScore, setMaxScore] = useState('100');
  const [category, setCategory] = useState('Exam');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject || !score) return;
    onAddMark({
      id: 'm_' + Math.random().toString(36).substr(2, 9),
      subject: subject.trim(),
      score: Number(score),
      maxScore: Number(maxScore) || 100,
      category,
      date
    });
    setSubject('');
    setScore('');
    setShowAddModal(false);
  };

  const getGradeLetter = (pct) => {
    if (pct >= 90) return { letter: 'A+', color: 'text-emerald-700 bg-emerald-100 border-emerald-300' };
    if (pct >= 80) return { letter: 'A', color: 'text-orange-700 bg-orange-100 border-orange-300' };
    if (pct >= 70) return { letter: 'B+', color: 'text-purple-700 bg-purple-100 border-purple-300' };
    if (pct >= 60) return { letter: 'B', color: 'text-amber-700 bg-amber-100 border-amber-300' };
    if (pct >= 50) return { letter: 'C', color: 'text-yellow-700 bg-yellow-100 border-yellow-300' };
    return { letter: 'F', color: 'text-rose-700 bg-rose-100 border-rose-300' };
  };

  const filteredMarks = marksData.filter(m => {
    const matchesSearch = m.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || m.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate current average
  const currentAvg = marksData.length 
    ? marksData.reduce((acc, m) => acc + (Number(m.score) / Number(m.maxScore)) * 100, 0) / marksData.length
    : 0;

  // Calculate projected average if student scores `simulatedScore` in next exam
  const newTotalPct = marksData.reduce((acc, m) => acc + (Number(m.score) / Number(m.maxScore)) * 100, 0) + Number(simulatedScore);
  const projectedAvg = ((newTotalPct) / (marksData.length + 1)).toFixed(1);
  const avgDiff = (projectedAvg - currentAvg).toFixed(1);

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-stone-900 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-orange-600" />
            Marks & Performance Tracker
          </h2>
          <p className="text-xs text-stone-500 mt-1 font-medium">Log scores, calculate weighted grades, and feed data to Gemini 3 Flash</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Log New Mark</span>
        </button>
      </div>

      {/* Live Target Score Simulator Widget */}
      <div className="glass-card p-6 rounded-3xl border border-orange-200 shadow-md space-y-4 bg-gradient-to-r from-orange-50/60 via-amber-50/40 to-purple-50/60">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-orange-500 text-white shadow-md">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-stone-900 flex items-center gap-2">
                Live Target Score Simulator
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-purple-100 text-purple-900 border border-purple-200">Interactive</span>
              </h3>
              <p className="text-xs text-stone-500 font-medium">Simulate how your next exam score will shift your overall GPA</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div>Current Avg: <strong className="text-stone-900">{currentAvg.toFixed(1)}%</strong></div>
            <div className="text-orange-600 font-extrabold">Projected: <strong>{projectedAvg}%</strong> ({avgDiff >= 0 ? `+${avgDiff}%` : `${avgDiff}%`})</div>
          </div>
        </div>

        {/* Slider Controls */}
        <div className="space-y-2 pt-2">
          <div className="flex justify-between text-xs font-bold text-stone-700">
            <span>Simulate Upcoming Exam Score:</span>
            <span className="px-3 py-1 rounded-xl bg-orange-500 text-white font-mono">{simulatedScore}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={simulatedScore}
            onChange={(e) => setSimulatedScore(e.target.value)}
            className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between glass-panel p-4 rounded-2xl border border-stone-200 shadow-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-stone-400" />
          <input
            type="text"
            placeholder="Search by subject name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl glass-input text-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-stone-500" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="glass-input px-3 py-2 rounded-xl text-xs bg-white text-stone-800"
          >
            <option value="All">All Categories</option>
            <option value="Exam">Exams</option>
            <option value="Midterm">Midterms</option>
            <option value="Quiz">Quizzes</option>
            <option value="Assignment">Assignments</option>
          </select>
        </div>
      </div>

      {/* Marks Table */}
      <div className="glass-card rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-amber-50/70 text-stone-600 uppercase text-[10px] font-mono tracking-wider border-b border-stone-200">
              <tr>
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Score</th>
                <th className="px-6 py-4">Percentage</th>
                <th className="px-6 py-4">Grade</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200/80">
              {filteredMarks.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-stone-400 font-medium">
                    No marks logged yet. Click "Log New Mark" above to start tracking!
                  </td>
                </tr>
              ) : (
                filteredMarks.map((m) => {
                  const pct = ((Number(m.score) / Number(m.maxScore)) * 100).toFixed(1);
                  const grade = getGradeLetter(Number(pct));
                  return (
                    <tr key={m.id} className="hover:bg-amber-50/40 transition-colors">
                      <td className="px-6 py-4 font-bold text-stone-900 text-sm">{m.subject}</td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-stone-100 text-stone-700 border border-stone-200">
                          {m.category || 'Exam'}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono font-semibold text-stone-800">
                        {m.score} / {m.maxScore}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3 w-36">
                          <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400"
                              style={{ width: `${Math.min(100, pct)}%` }}
                            ></div>
                          </div>
                          <span className="font-mono text-xs font-bold text-stone-700">{pct}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-black border ${grade.color}`}>
                          {grade.letter}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-stone-500 font-mono text-[11px]">{m.date}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => onDeleteMark(m.id)}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete mark entry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-md p-6 rounded-3xl border border-orange-200 shadow-2xl space-y-5">
            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-orange-600" />
              Log Subject Score
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Subject Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Advanced Calculus, Physics II"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Your Score</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 88"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Max Score</label>
                  <input
                    type="number"
                    required
                    placeholder="100"
                    value={maxScore}
                    onChange={(e) => setMaxScore(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs bg-white text-stone-800"
                  >
                    <option value="Exam">Exam</option>
                    <option value="Midterm">Midterm</option>
                    <option value="Quiz">Quiz</option>
                    <option value="Assignment">Assignment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs bg-white text-stone-800"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn-secondary px-4 py-2 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-5 py-2 rounded-xl text-xs font-bold"
                >
                  Save Score
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
