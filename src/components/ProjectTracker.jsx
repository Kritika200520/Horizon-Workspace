import React, { useState } from 'react';
import { 
  FolderGit2, 
  Plus, 
  Trash2, 
  Clock, 
  Users, 
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

export default function ProjectTracker({ projectsData, onAddProject, onUpdateProjectStatus, onDeleteProject }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [status, setStatus] = useState('In Progress');
  const [dueDate, setDueDate] = useState('2026-07-28');
  const [members, setMembers] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    onAddProject({
      id: 'p_' + Math.random().toString(36).substr(2, 9),
      title: title.trim(),
      subject: subject.trim() || 'General',
      status,
      dueDate,
      members: members.split(',').map(m => m.trim())
    });
    setTitle('');
    setShowAddModal(false);
  };

  const statuses = ['Planning', 'In Progress', 'Review', 'Submitted'];

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-stone-900 flex items-center gap-2">
            <FolderGit2 className="w-6 h-6 text-purple-600" />
            Assignments & Group Projects Board
          </h2>
          <p className="text-xs text-stone-500 font-medium mt-1">Track term projects, group deliverables, and submission deadlines</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Project Deliverable</span>
        </button>
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {statuses.map((colStatus) => {
          const colProjects = projectsData.filter(p => p.status === colStatus);
          return (
            <div key={colStatus} className="glass-card p-4 rounded-3xl border border-stone-200 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <span className="text-xs font-black uppercase text-stone-700 tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  {colStatus}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-700">
                  {colProjects.length}
                </span>
              </div>

              <div className="space-y-3 min-h-[300px]">
                {colProjects.map((proj) => (
                  <div key={proj.id} className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-orange-300 space-y-2.5 shadow-sm transition-all">
                    <div className="flex items-start justify-between">
                      <span className="text-xs font-extrabold text-stone-900">{proj.title}</span>
                      <button
                        onClick={() => onDeleteProject(proj.id)}
                        className="text-stone-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[11px]">
                      <span className="px-2 py-0.5 rounded bg-orange-100 text-orange-800 font-bold">{proj.subject}</span>
                      <span className="text-stone-500 font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3 text-orange-500" />
                        {proj.dueDate}
                      </span>
                    </div>

                    <div className="text-[11px] text-stone-500 flex items-center gap-1 font-medium pt-1">
                      <Users className="w-3.5 h-3.5 text-purple-600" />
                      <span>{proj.members?.join(', ')}</span>
                    </div>

                    {/* Move Status Dropdown */}
                    <div className="pt-2">
                      <select
                        value={proj.status}
                        onChange={(e) => onUpdateProjectStatus(proj.id, e.target.value)}
                        className="w-full px-2 py-1 rounded-lg text-[10px] font-bold bg-stone-50 border border-stone-200 text-stone-700"
                      >
                        {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-md p-6 rounded-3xl border border-purple-200 shadow-2xl space-y-5">
            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-purple-600" />
              New Assignment / Project
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Database Capstone"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Computer Science"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs bg-white text-stone-800"
                  >
                    {statuses.map(s => <option key={s} value={s}>{s}</option>)}
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

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Team Members (Comma separated)</label>
                <input
                  type="text"
                  placeholder="Kritika, Alex, Sophia"
                  value={members}
                  onChange={(e) => setMembers(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
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
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
