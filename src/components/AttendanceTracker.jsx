import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  AlertTriangle, 
  BookOpen, 
  Calendar,
  Sparkles
} from 'lucide-react';

export default function AttendanceTracker({ attendanceData, onAddSubject, onLogAttendance, onDeleteSubject }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [subject, setSubject] = useState('');
  const [attended, setAttended] = useState('');
  const [total, setTotal] = useState('');
  const [targetPct, setTargetPct] = useState('75');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject) return;
    onAddSubject({
      id: 'att_' + Math.random().toString(36).substr(2, 9),
      subject: subject.trim(),
      attended: Number(attended) || 0,
      total: Number(total) || 0,
      targetPct: Number(targetPct) || 75
    });
    setSubject('');
    setAttended('');
    setTotal('');
    setShowAddModal(false);
  };

  const calculateShortage = (att, tot, target = 75) => {
    if (tot === 0) return { pct: 0, status: 'Safe', needed: 0 };
    const pct = (att / tot) * 100;
    if (pct >= target) {
      return { pct: pct.toFixed(1), status: 'Safe', needed: 0 };
    }
    // Calculate required consecutive attended classes to hit target
    const targetDec = target / 100;
    const needed = Math.ceil((targetDec * tot - att) / (1 - targetDec));
    return { pct: pct.toFixed(1), status: 'Shortage', needed: Math.max(1, needed) };
  };

  // Find subjects with critical shortage
  const shortageSubjects = attendanceData.filter(item => {
    const res = calculateShortage(item.attended, item.total, item.targetPct);
    return res.status === 'Shortage';
  });

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-stone-900 flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-rose-600" />
            Attendance Tracker & Shortage Alerts
          </h2>
          <p className="text-xs text-stone-500 font-medium mt-1">Track attended classes and prevent 75% attendance shortage penalties</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Subject Tracker</span>
        </button>
      </div>

      {/* Critical Shortage Warning Banner */}
      {shortageSubjects.length > 0 && (
        <div className="glass-card p-6 rounded-3xl border-2 border-rose-300 bg-gradient-to-r from-rose-50 via-amber-50 to-orange-50 space-y-3 shadow-md">
          <div className="flex items-center gap-3 text-rose-700">
            <AlertTriangle className="w-6 h-6 shrink-0 animate-bounce" />
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider">Critical Attendance Shortage Warning</h3>
              <p className="text-xs text-stone-700 font-medium">
                {shortageSubjects.length} subject(s) are currently below the required 75% threshold!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {shortageSubjects.map(sub => {
              const res = calculateShortage(sub.attended, sub.total, sub.targetPct);
              return (
                <div key={sub.id} className="p-3 rounded-2xl bg-white border border-rose-200 flex items-center justify-between shadow-sm">
                  <div>
                    <div className="text-xs font-black text-stone-900">{sub.subject}</div>
                    <div className="text-[11px] text-rose-700 font-extrabold font-mono">
                      Current: {res.pct}% (Attended {sub.attended}/{sub.total})
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-xl text-xs font-extrabold bg-rose-100 text-rose-800 border border-rose-200">
                    Need +{res.needed} classes
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Subject Attendance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {attendanceData.map((item) => {
          const res = calculateShortage(item.attended, item.total, item.targetPct);
          const isDanger = res.status === 'Shortage';

          return (
            <div
              key={item.id}
              className={`glass-card p-6 rounded-3xl border transition-all space-y-4 shadow-sm ${
                isDanger ? 'border-rose-300 bg-rose-50/30' : 'border-stone-200 hover:border-orange-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-stone-900">{item.subject}</h3>
                  <div className="text-xs text-stone-500 font-medium">Target: {item.targetPct}%</div>
                </div>

                <button
                  onClick={() => onDeleteSubject(item.id)}
                  className="text-stone-400 hover:text-rose-600 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Progress Bar & Big Percentage */}
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-black text-stone-900">{res.pct}%</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold border ${
                    isDanger ? 'bg-rose-100 text-rose-800 border-rose-200' : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                  }`}>
                    {isDanger ? 'Shortage Alert' : 'On Track'}
                  </span>
                </div>

                <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isDanger ? 'bg-rose-500' : 'bg-gradient-to-r from-orange-500 to-emerald-500'
                    }`}
                    style={{ width: `${Math.min(100, Number(res.pct))}%` }}
                  ></div>
                </div>

                <div className="text-xs text-stone-600 font-mono font-bold flex justify-between pt-1">
                  <span>Attended: {item.attended}</span>
                  <span>Total Classes: {item.total}</span>
                </div>
              </div>

              {/* Attendance Log Controls */}
              <div className="flex items-center gap-2 pt-2 border-t border-stone-200">
                <button
                  onClick={() => onLogAttendance(item.id, true)}
                  className="flex-1 btn-pastel-sage py-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>+ Attended</span>
                </button>

                <button
                  onClick={() => onLogAttendance(item.id, false)}
                  className="flex-1 py-2 rounded-xl bg-rose-100 text-rose-800 hover:bg-rose-200 border border-rose-200 text-xs font-extrabold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>+ Missed</span>
                </button>
              </div>

              {isDanger && (
                <div className="text-[11px] text-rose-700 font-bold text-center bg-rose-100/70 p-2 rounded-xl border border-rose-200">
                  ⚠️ Attend next <strong>{res.needed}</strong> consecutive classes to reach {item.targetPct}%!
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-md p-6 rounded-3xl border border-orange-200 shadow-2xl space-y-5">
            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-orange-600" />
              Add Subject Attendance Tracker
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Subject Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Advanced Quantum Physics"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Classes Attended</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 18"
                    value={attended}
                    onChange={(e) => setAttended(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Total Classes</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 25"
                    value={total}
                    onChange={(e) => setTotal(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Required Threshold (%)</label>
                <input
                  type="number"
                  placeholder="75"
                  value={targetPct}
                  onChange={(e) => setTargetPct(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-mono"
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
                  Save Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
