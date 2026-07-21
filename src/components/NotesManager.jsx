import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Sparkles, 
  BookOpen, 
  RotateCw,
  Search
} from 'lucide-react';
import { generateNoteAISummary } from '../services/geminiService';

export default function NotesManager({ notesData, onAddNote, onDeleteNote, onUpdateNoteAI }) {
  const [selectedNoteId, setSelectedNoteId] = useState(notesData[0]?.id || null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);
  const [flippedCardIdx, setFlippedCardIdx] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [newContent, setNewContent] = useState('');

  const activeNote = notesData.find(n => n.id === selectedNoteId) || notesData[0];

  const handleCreateNote = (e) => {
    e.preventDefault();
    if (!newTitle) return;
    const note = {
      id: 'n_' + Math.random().toString(36).substr(2, 9),
      title: newTitle.trim(),
      subject: newSubject.trim() || 'General',
      content: newContent || '# New Study Note\n\nWrite your concepts here...',
      date: new Date().toLocaleDateString(),
      aiAnalysis: null
    };
    onAddNote(note);
    setSelectedNoteId(note.id);
    setNewTitle('');
    setNewSubject('');
    setNewContent('');
    setShowAddModal(false);
  };

  const handleRunAISummary = async () => {
    if (!activeNote) return;
    setLoadingAI(true);
    try {
      const summaryResult = await generateNoteAISummary(activeNote.content, activeNote.subject);
      onUpdateNoteAI(activeNote.id, summaryResult);
    } catch (e) {
      console.error('Note AI summary error:', e);
    } finally {
      setLoadingAI(false);
    }
  };

  const filteredNotes = notesData.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    n.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-stone-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-orange-600" />
            Markdown Study Notes & Gemini Summarizer
          </h2>
          <p className="text-xs text-stone-500 mt-1 font-medium">Organize study materials and generate active recall flashcards</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Study Note</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="glass-card p-4 rounded-3xl border border-stone-200 space-y-4 shadow-sm">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl glass-input text-xs"
            />
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredNotes.map((n) => (
              <div
                key={n.id}
                onClick={() => setSelectedNoteId(n.id)}
                className={`p-3.5 rounded-2xl cursor-pointer border transition-all ${
                  activeNote?.id === n.id
                    ? 'bg-orange-100/80 border-orange-300 text-stone-900 shadow-sm'
                    : 'bg-white border-stone-200 text-stone-700 hover:border-orange-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold truncate">{n.title}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteNote(n.id);
                    }}
                    className="text-stone-400 hover:text-rose-600 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex items-center justify-between text-[10px] text-stone-500 mt-1">
                  <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-bold">{n.subject}</span>
                  <span className="font-mono">{n.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {activeNote ? (
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-3xl border border-stone-200 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                  <div>
                    <h3 className="text-lg font-extrabold text-stone-900">{activeNote.title}</h3>
                    <span className="text-xs text-orange-600 font-bold">{activeNote.subject}</span>
                  </div>

                  <button
                    onClick={handleRunAISummary}
                    disabled={loadingAI}
                    className="btn-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                    <span>{loadingAI ? 'Summarizing...' : 'Gemini AI Flashcards'}</span>
                  </button>
                </div>

                <div className="text-xs text-stone-800 font-mono leading-relaxed bg-amber-50/50 p-4 rounded-2xl border border-amber-200/60 whitespace-pre-wrap min-h-[160px]">
                  {activeNote.content}
                </div>
              </div>

              {activeNote.aiAnalysis && (
                <div className="glass-card p-6 rounded-3xl border border-orange-200 space-y-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-extrabold text-stone-900 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-orange-600" />
                      Gemini 3 Flash Active Recall Flashcards
                    </h4>
                    <span className="text-[10px] font-mono text-orange-700">Click card to flip answer</span>
                  </div>

                  <p className="text-xs text-stone-800 bg-orange-50 p-3 rounded-2xl border border-orange-200 font-medium">
                    💡 <strong>Summary:</strong> {activeNote.aiAnalysis.summary}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {activeNote.aiAnalysis.flashcards?.map((fc, idx) => {
                      const isFlipped = flippedCardIdx === idx;
                      return (
                        <div
                          key={idx}
                          onClick={() => setFlippedCardIdx(isFlipped ? null : idx)}
                          className="glass-panel p-4 rounded-2xl border border-orange-200 cursor-pointer min-h-[140px] flex flex-col justify-between hover:border-orange-300 transition-all select-none shadow-sm"
                        >
                          <div className="text-[10px] font-extrabold text-orange-600 uppercase flex items-center justify-between">
                            <span>Card #{idx + 1}</span>
                            <RotateCw className="w-3 h-3 text-stone-400" />
                          </div>

                          <div className="text-xs text-stone-900 font-bold my-2">
                            {isFlipped ? (
                              <span className="text-emerald-700 font-bold">{fc.answer}</span>
                            ) : (
                              <span>{fc.question}</span>
                            )}
                          </div>

                          <div className="text-[10px] text-stone-400 text-right font-mono">
                            {isFlipped ? 'Answer' : 'Question (Click to Flip)'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="glass-card p-12 text-center rounded-3xl border border-stone-200 text-stone-400 text-xs font-medium">
              Select or create a study note to view and generate AI flashcards.
            </div>
          )}
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-lg p-6 rounded-3xl border border-orange-200 shadow-2xl space-y-5">
            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-600" />
              Create Study Note
            </h3>

            <form onSubmit={handleCreateNote} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Note Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chapter 5 Neural Networks & Optimization"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Computer Science, Machine Learning"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Note Content (Markdown)</label>
                <textarea
                  rows="6"
                  placeholder="Enter key concepts, formulas, theoretical notes..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-mono"
                ></textarea>
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
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
