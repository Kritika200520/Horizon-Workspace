import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Calendar as CalendarIcon, 
  Plus, 
  Trash2, 
  AlertCircle,
  Sparkles,
  Award
} from 'lucide-react';

export default function ExamCountdownCalendar({ examsData, onAddExam, onDeleteExam }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [subject, setSubject] = useState('');
  const [examDate, setExamDate] = useState('2026-07-28T10:00');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject) return;
    onAddExam({
      id: 'ex_' + Math.random().toString(36).substr(2, 9),
      subject: subject.trim(),
      targetDate: examDate
    });
    setSubject('');
    setShowAddModal(false);
  };

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-stone-900 flex items-center gap-2">
            <Clock className="w-6 h-6 text-orange-600" />
            Live Exam Countdown Tickers & Calendar
          </h2>
          <p className="text-xs text-stone-500 font-medium mt-1">Real-time countdown clocks to major exams and integrated monthly calendar</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Exam Countdown</span>
        </button>
      </div>

      {/* Countdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examsData.map((exam) => (
          <CountdownCard key={exam.id} exam={exam} onDelete={onDeleteExam} />
        ))}
      </div>

      {/* Integrated Monthly Calendar Preview */}
      <div className="glass-card p-6 rounded-3xl border border-stone-200 space-y-4 shadow-sm">
        <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-purple-600" />
          Integrated Monthly Study Calendar (July 2026)
        </h3>

        <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-stone-500 font-mono pb-2 border-b border-stone-200">
          <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
        </div>

        <div className="grid grid-cols-7 gap-2 text-xs font-semibold">
          {Array.from({ length: 31 }, (_, i) => i + 1).map((dayNum) => {
            const hasExam = dayNum === 23 || dayNum === 28;
            return (
              <div
                key={dayNum}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  hasExam
                    ? 'bg-orange-100 border-orange-300 text-orange-900 font-black shadow-sm'
                    : 'bg-white border-stone-200 text-stone-700'
                }`}
              >
                <div>{dayNum}</div>
                {hasExam && (
                  <span className="block text-[9px] font-bold text-orange-700 mt-1 uppercase">EXAM</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-md p-6 rounded-3xl border border-orange-200 shadow-2xl space-y-5">
            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-600" />
              Add Exam Countdown
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Exam Subject Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Quantum Physics Final Exam"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Exam Date & Time</label>
                <input
                  type="datetime-local"
                  required
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-mono bg-white text-stone-800"
                />
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
                  Start Ticker
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function CountdownCard({ exam, onDelete }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const updateTicker = () => {
      const diff = new Date(exam.targetDate) - new Date();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / 1000 / 60) % 60);
      const secs = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, mins, secs });
    };

    updateTicker();
    const interval = setInterval(updateTicker, 1000);
    return () => clearInterval(interval);
  }, [exam.targetDate]);

  return (
    <div className="glass-card p-6 rounded-3xl border border-orange-200 bg-gradient-to-tr from-orange-50/70 to-amber-50/50 space-y-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-black text-stone-900">{exam.subject}</h3>
        <button onClick={() => onDelete(exam.id)} className="text-stone-400 hover:text-rose-600 p-1">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Countdown Digits */}
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="p-3 rounded-2xl bg-white border border-orange-200 shadow-sm">
          <div className="text-2xl font-black text-orange-600 font-mono">{timeLeft.days}</div>
          <div className="text-[10px] text-stone-500 font-bold uppercase">Days</div>
        </div>

        <div className="p-3 rounded-2xl bg-white border border-orange-200 shadow-sm">
          <div className="text-2xl font-black text-stone-900 font-mono">{timeLeft.hours}</div>
          <div className="text-[10px] text-stone-500 font-bold uppercase">Hours</div>
        </div>

        <div className="p-3 rounded-2xl bg-white border border-orange-200 shadow-sm">
          <div className="text-2xl font-black text-stone-900 font-mono">{timeLeft.mins}</div>
          <div className="text-[10px] text-stone-500 font-bold uppercase">Mins</div>
        </div>

        <div className="p-3 rounded-2xl bg-white border border-orange-200 shadow-sm">
          <div className="text-2xl font-black text-purple-600 font-mono">{timeLeft.secs}</div>
          <div className="text-[10px] text-stone-500 font-bold uppercase">Secs</div>
        </div>
      </div>
    </div>
  );
}
