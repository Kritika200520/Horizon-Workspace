import React, { useState } from 'react';
import { 
  CheckSquare, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Tag, 
  BellRing
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TodoList({ todoData, onAddTask, onToggleTask, onDeleteTask, onSendEmailReminder }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterPriority, setFilterPriority] = useState('All');

  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [priority, setPriority] = useState('High');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    onAddTask({
      id: 't_' + Math.random().toString(36).substr(2, 9),
      title: title.trim(),
      subject: subject.trim() || 'General',
      priority,
      dueDate,
      completed: false
    });
    setTitle('');
    setSubject('');
    setShowAddModal(false);
  };

  const handleToggle = (task) => {
    if (!task.completed) {
      try {
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
      } catch (e) {}
    }
    onToggleTask(task.id);
  };

  const handleEmailReminder = (task) => {
    onSendEmailReminder({
      title: `Task Reminder: ${task.title}`,
      details: `Subject Tag: ${task.subject}. Priority Level: ${task.priority}.`,
      category: `${task.priority.toUpperCase()} PRIORITY TASK`,
      dueDate: task.dueDate,
      geminiTip: `Break down "${task.title}" into 25-minute Pomodoro focus sprints today.`
    });
  };

  const getPriorityBadge = (prio) => {
    if (prio === 'Urgent') return 'bg-rose-100 text-rose-800 border-rose-200';
    if (prio === 'High') return 'bg-purple-100 text-purple-800 border-purple-200';
    if (prio === 'Medium') return 'bg-orange-100 text-orange-800 border-orange-200';
    return 'bg-stone-100 text-stone-700 border-stone-200';
  };

  const filteredTasks = todoData.filter(t => {
    if (filterPriority === 'All') return true;
    if (filterPriority === 'Pending') return !t.completed;
    if (filterPriority === 'Completed') return t.completed;
    return t.priority === filterPriority;
  });

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-stone-900 flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-orange-600" />
            Smart Task Board & Scheduler
          </h2>
          <p className="text-xs text-stone-500 mt-1 font-medium">Organize study priorities with automated email notifications</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Study Task</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 glass-panel p-2 rounded-2xl border border-stone-200 shadow-sm">
        {['All', 'Pending', 'Urgent', 'High', 'Medium', 'Completed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilterPriority(tab)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterPriority === tab
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="glass-card p-12 text-center rounded-3xl border border-stone-200 text-stone-400 text-xs font-medium">
            No tasks match the selected filter. Click "Add Study Task" to create one!
          </div>
        ) : (
          filteredTasks.map((t) => (
            <div
              key={t.id}
              className={`glass-card p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm ${
                t.completed ? 'opacity-60 bg-stone-100/60 border-stone-200' : 'border-stone-200 hover:border-orange-300 bg-white'
              }`}
            >
              <div className="flex items-start sm:items-center gap-3 flex-1">
                <button
                  onClick={() => handleToggle(t)}
                  className={`mt-0.5 sm:mt-0 w-6 h-6 rounded-lg flex items-center justify-center border transition-all cursor-pointer ${
                    t.completed ? 'bg-emerald-500 text-white border-emerald-500' : 'border-stone-300 hover:border-orange-500 bg-white'
                  }`}
                >
                  {t.completed && <CheckCircle2 className="w-4 h-4" />}
                </button>

                <div className="space-y-1">
                  <span className={`text-sm font-bold text-stone-900 ${t.completed ? 'line-through text-stone-400' : ''}`}>
                    {t.title}
                  </span>
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-stone-500">
                    <span className="flex items-center gap-1 font-mono text-stone-600">
                      <Tag className="w-3 h-3 text-orange-500" />
                      {t.subject}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-mono text-stone-600">
                      <Clock className="w-3 h-3 text-amber-600" />
                      Due {t.dueDate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${getPriorityBadge(t.priority)}`}>
                  {t.priority}
                </span>

                {!t.completed && (
                  <button
                    onClick={() => handleEmailReminder(t)}
                    className="p-2 rounded-xl bg-orange-100 text-orange-800 hover:bg-orange-200 border border-orange-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    title="Send Email Reminder Now"
                  >
                    <BellRing className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Email Alert</span>
                  </button>
                )}

                <button
                  onClick={() => onDeleteTask(t.id)}
                  className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-md p-6 rounded-3xl border border-orange-200 shadow-2xl space-y-5">
            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-orange-600" />
              Add Study Task & Priority
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Complete Physics Chapter 4 Problem Set"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Subject Tag</label>
                <input
                  type="text"
                  placeholder="e.g. Mathematics, Organic Chemistry"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs bg-white text-stone-800"
                  >
                    <option value="Urgent">Urgent</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
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
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
