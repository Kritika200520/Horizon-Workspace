import React, { useState, useEffect } from 'react';
import AuthScreen from './components/AuthScreen';
import NavigationHeader from './components/NavigationHeader';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import AttendanceTracker from './components/AttendanceTracker';
import ClassTimetable from './components/ClassTimetable';
import MarksTracker from './components/MarksTracker';
import AIAnalysis from './components/AIAnalysis';
import PomodoroTimer from './components/PomodoroTimer';
import TodoList from './components/TodoList';
import ProjectTracker from './components/ProjectTracker';
import ExamCountdownCalendar from './components/ExamCountdownCalendar';
import StudyGroupChat from './components/StudyGroupChat';
import QuizPyqGenerator from './components/QuizPyqGenerator';
import CodingGithubTracker from './components/CodingGithubTracker';
import ResumeBuilder from './components/ResumeBuilder';
import GamificationLeaderboard from './components/GamificationLeaderboard';
import RemindersHub from './components/RemindersHub';
import NotesManager from './components/NotesManager';
import SettingsModal from './components/SettingsModal';
import AmbientParticles from './components/AmbientParticles';

import { getStoredGeminiKey } from './services/geminiService';
import { sendEmailReminder, buildReminderEmailHtml } from './services/emailService';
import { addXP } from './services/gamificationService';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [geminiKeySet, setGeminiKeySet] = useState(!!getStoredGeminiKey());
  const [toastMessage, setToastMessage] = useState(null);

  // Active Soundscape Mode for Screen-Wide Ambient Visual Sync ('rain', 'forest', 'space', 'none')
  const [activeSoundscape, setActiveSoundscape] = useState('none');

  // Persistent Session Authentication State
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('horizon_user') || localStorage.getItem('lumina_user') || localStorage.getItem('simar_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [currentMood, setCurrentMood] = useState('focused');

  // Persistence State
  const [marksData, setMarksData] = useState(() => {
    const saved = localStorage.getItem('horizon_marks_data');
    return saved ? JSON.parse(saved) : getInitialMarks();
  });

  const [todoData, setTodoData] = useState(() => {
    const saved = localStorage.getItem('horizon_todo_data');
    return saved ? JSON.parse(saved) : getInitialTodos();
  });

  const [attendanceData, setAttendanceData] = useState(() => {
    const saved = localStorage.getItem('horizon_attendance_data');
    return saved ? JSON.parse(saved) : getInitialAttendance();
  });

  const [timetableData, setTimetableData] = useState(() => {
    const saved = localStorage.getItem('horizon_timetable_data');
    return saved ? JSON.parse(saved) : getInitialTimetable();
  });

  const [projectsData, setProjectsData] = useState(() => {
    const saved = localStorage.getItem('horizon_projects_data');
    return saved ? JSON.parse(saved) : getInitialProjects();
  });

  const [examsData, setExamsData] = useState(() => {
    const saved = localStorage.getItem('horizon_exams_data');
    return saved ? JSON.parse(saved) : getInitialExams();
  });

  const [codingData, setCodingData] = useState(() => {
    const saved = localStorage.getItem('horizon_coding_data');
    return saved ? JSON.parse(saved) : getInitialCoding();
  });

  const [pomodoroStats, setPomodoroStats] = useState(() => {
    const saved = localStorage.getItem('horizon_pomodoro_stats');
    return saved ? JSON.parse(saved) : { completedSessions: 14, totalFocusMinutes: 350 };
  });

  const [notesData, setNotesData] = useState(() => {
    const saved = localStorage.getItem('horizon_notes_data');
    return saved ? JSON.parse(saved) : getInitialNotes();
  });

  const [aiResult, setAiResult] = useState(() => {
    const saved = localStorage.getItem('horizon_ai_result');
    return saved ? JSON.parse(saved) : null;
  });

  // Syncs
  useEffect(() => {
    if (user) localStorage.setItem('horizon_user', JSON.stringify(user));
    else localStorage.removeItem('horizon_user');
  }, [user]);

  useEffect(() => localStorage.setItem('horizon_marks_data', JSON.stringify(marksData)), [marksData]);
  useEffect(() => localStorage.setItem('horizon_todo_data', JSON.stringify(todoData)), [todoData]);
  useEffect(() => localStorage.setItem('horizon_attendance_data', JSON.stringify(attendanceData)), [attendanceData]);
  useEffect(() => localStorage.setItem('horizon_timetable_data', JSON.stringify(timetableData)), [timetableData]);
  useEffect(() => localStorage.setItem('horizon_projects_data', JSON.stringify(projectsData)), [projectsData]);
  useEffect(() => localStorage.setItem('horizon_exams_data', JSON.stringify(examsData)), [examsData]);
  useEffect(() => localStorage.setItem('horizon_coding_data', JSON.stringify(codingData)), [codingData]);
  useEffect(() => localStorage.setItem('horizon_pomodoro_stats', JSON.stringify(pomodoroStats)), [pomodoroStats]);
  useEffect(() => localStorage.setItem('horizon_notes_data', JSON.stringify(notesData)), [notesData]);
  useEffect(() => localStorage.setItem('horizon_ai_result', JSON.stringify(aiResult)), [aiResult]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleEarnXP = (amount) => {
    addXP(amount);
    showToast(`+${amount} XP Earned! Great effort! 🎉`);
  };

  const handleLogin = (userProfile) => {
    setUser(userProfile);
    showToast(`Welcome back, ${userProfile.name}!`);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('home');
  };

  const handleSendEmailReminder = async ({ title, details, category, dueDate, geminiTip }) => {
    const htmlContent = buildReminderEmailHtml({ title, details, category, dueDate, geminiTip });
    await sendEmailReminder({
      subject: `[Horizon AI Alert] ${title}`,
      htmlContent,
      reminderType: category || 'General Reminder'
    });
    showToast(`📧 Email reminder dispatched for "${title}"!`);
  };

  // Attendance Handlers
  const handleAddAttendanceSubject = (newSub) => {
    setAttendanceData(prev => [...prev, newSub]);
    showToast(`Attendance tracker added for ${newSub.subject}`);
  };

  const handleLogAttendance = (id, isAttended) => {
    setAttendanceData(prev => prev.map(a => {
      if (a.id === id) {
        return {
          ...a,
          attended: isAttended ? a.attended + 1 : a.attended,
          total: a.total + 1
        };
      }
      return a;
    }));
    showToast(isAttended ? 'Class logged as Attended! +15 XP' : 'Class logged as Missed.');
    if (isAttended) handleEarnXP(15);
  };

  const handleDeleteAttendanceSubject = (id) => {
    setAttendanceData(prev => prev.filter(a => a.id !== id));
  };

  // Timetable Handlers
  const handleAddClassSlot = (newClass) => {
    setTimetableData(prev => [...prev, newClass]);
    showToast(`Class slot added for ${newClass.subject}`);
  };

  const handleDeleteClassSlot = (id) => {
    setTimetableData(prev => prev.filter(c => c.id !== id));
  };

  // Project Handlers
  const handleAddProject = (newProj) => {
    setProjectsData(prev => [...prev, newProj]);
    showToast(`Project "${newProj.title}" added to board.`);
  };

  const handleUpdateProjectStatus = (id, newStatus) => {
    setProjectsData(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  const handleDeleteProject = (id) => {
    setProjectsData(prev => prev.filter(p => p.id !== id));
  };

  // Exam Handlers
  const handleAddExam = (newExam) => {
    setExamsData(prev => [...prev, newExam]);
    showToast(`Countdown set for ${newExam.subject}`);
  };

  const handleDeleteExam = (id) => {
    setExamsData(prev => prev.filter(e => e.id !== id));
  };

  // Coding Handlers
  const handleAddCoding = (newCode) => {
    setCodingData(prev => [newCode, ...prev]);
    handleEarnXP(50);
  };

  const handleDeleteCoding = (id) => {
    setCodingData(prev => prev.filter(c => c.id !== id));
  };

  // Marks Handlers
  const handleAddMark = (newMark) => {
    setMarksData(prev => [newMark, ...prev]);
    handleEarnXP(75);
  };

  const handleDeleteMark = (id) => {
    setMarksData(prev => prev.filter(m => m.id !== id));
  };

  // Todo Handlers
  const handleAddTask = (newTask) => {
    setTodoData(prev => [newTask, ...prev]);
    showToast(`Task "${newTask.title}" added to queue.`);
  };

  const handleToggleTask = (id) => {
    setTodoData(prev => prev.map(t => {
      if (t.id === id) {
        if (!t.completed) handleEarnXP(50);
        return { ...t, completed: !t.completed };
      }
      return t;
    }));
  };

  const handleDeleteTask = (id) => {
    setTodoData(prev => prev.filter(t => t.id !== id));
  };

  // Notes Handlers
  const handleAddNote = (newNote) => {
    setNotesData(prev => [newNote, ...prev]);
    showToast(`Note "${newNote.title}" saved.`);
  };

  const handleDeleteNote = (id) => {
    setNotesData(prev => prev.filter(n => n.id !== id));
  };

  const handleUpdateNoteAI = (id, aiAnalysis) => {
    setNotesData(prev => prev.map(n => n.id === id ? { ...n, aiAnalysis } : n));
    handleEarnXP(40);
  };

  if (!user) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-stone-800 font-sans flex relative overflow-x-hidden">
      {/* Synchronized Screen-Wide Ambient Particles */}
      <AmbientParticles soundscapeMode={activeSoundscape} />

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 px-4 py-3 rounded-2xl glass-panel border border-orange-300 text-xs font-bold text-stone-900 shadow-xl animate-bounce flex items-center gap-2">
          <span>☀️</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Fixed Vertical Left Sidebar Navigation */}
      <NavigationHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        geminiKeySet={geminiKeySet}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Spacious Workspace Content Area */}
      <main className="flex-1 md:pl-64 pb-12 relative z-10 w-full min-h-screen">
        {activeTab === 'home' && (
          <HomePage
            user={user}
            currentMood={currentMood}
            setCurrentMood={setCurrentMood}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard
            marksData={marksData}
            todoData={todoData}
            pomodoroStats={pomodoroStats}
            notesData={notesData}
            aiResult={aiResult}
            onNavigate={setActiveTab}
            onOpenAddMarks={() => setActiveTab('marks')}
            onOpenAddTask={() => setActiveTab('todos')}
            onSendEmailReminder={handleSendEmailReminder}
          />
        )}

        {activeTab === 'attendance' && (
          <AttendanceTracker
            attendanceData={attendanceData}
            onAddSubject={handleAddAttendanceSubject}
            onLogAttendance={handleLogAttendance}
            onDeleteSubject={handleDeleteAttendanceSubject}
          />
        )}

        {activeTab === 'timetable' && (
          <ClassTimetable
            timetableData={timetableData}
            onAddClass={handleAddClassSlot}
            onDeleteClass={handleDeleteClassSlot}
          />
        )}

        {activeTab === 'marks' && (
          <MarksTracker
            marksData={marksData}
            onAddMark={handleAddMark}
            onDeleteMark={handleDeleteMark}
          />
        )}

        {activeTab === 'ai-analysis' && (
          <AIAnalysis
            marksData={marksData}
            todoData={todoData}
            pomodoroStats={pomodoroStats}
            notesData={notesData}
            aiResult={aiResult}
            setAiResult={setAiResult}
            geminiKeySet={geminiKeySet}
            onSendEmailReminder={handleSendEmailReminder}
          />
        )}

        {activeTab === 'pomodoro' && (
          <PomodoroTimer
            pomodoroStats={pomodoroStats}
            setPomodoroStats={setPomodoroStats}
            onSoundscapeChange={setActiveSoundscape}
          />
        )}

        {activeTab === 'todos' && (
          <TodoList
            todoData={todoData}
            onAddTask={handleAddTask}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onSendEmailReminder={handleSendEmailReminder}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectTracker
            projectsData={projectsData}
            onAddProject={handleAddProject}
            onUpdateProjectStatus={handleUpdateProjectStatus}
            onDeleteProject={handleDeleteProject}
          />
        )}

        {activeTab === 'exams' && (
          <ExamCountdownCalendar
            examsData={examsData}
            onAddExam={handleAddExam}
            onDeleteExam={handleDeleteExam}
          />
        )}

        {activeTab === 'chat' && (
          <StudyGroupChat user={user} />
        )}

        {activeTab === 'quiz' && (
          <QuizPyqGenerator onEarnXP={handleEarnXP} />
        )}

        {activeTab === 'coding' && (
          <CodingGithubTracker
            codingData={codingData}
            onAddChallenge={handleAddCoding}
            onDeleteChallenge={handleDeleteCoding}
          />
        )}

        {activeTab === 'resume' && (
          <ResumeBuilder user={user} />
        )}

        {activeTab === 'gamification' && (
          <GamificationLeaderboard user={user} />
        )}

        {activeTab === 'notes' && (
          <NotesManager
            notesData={notesData}
            onAddNote={handleAddNote}
            onDeleteNote={handleDeleteNote}
            onUpdateNoteAI={handleUpdateNoteAI}
          />
        )}

        {activeTab === 'reminders' && (
          <RemindersHub
            onSendEmailReminder={handleSendEmailReminder}
          />
        )}
      </main>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSaved={() => setGeminiKeySet(!!getStoredGeminiKey())}
      />
    </div>
  );
}

// Initial Seed Datasets
function getInitialAttendance() {
  return [
    { id: 'att1', subject: 'Quantum Physics', attended: 14, total: 20, targetPct: 75 },
    { id: 'att2', subject: 'Advanced Calculus', attended: 18, total: 20, targetPct: 75 },
    { id: 'att3', subject: 'Organic Chemistry', attended: 12, total: 18, targetPct: 75 },
    { id: 'att4', subject: 'Data Structures', attended: 22, total: 24, targetPct: 75 }
  ];
}

function getInitialTimetable() {
  return [
    { id: 'c1', day: 'Monday', subject: 'Advanced Calculus', time: '09:00 AM - 10:30 AM', room: 'Hall 302', instructor: 'Prof. R. Sharma' },
    { id: 'c2', day: 'Monday', subject: 'Quantum Physics', time: '11:00 AM - 12:30 PM', room: 'Physics Lab B', instructor: 'Dr. H. Vance' },
    { id: 'c3', day: 'Tuesday', subject: 'Organic Chemistry', time: '10:00 AM - 11:30 AM', room: 'Chem Lab 101', instructor: 'Dr. A. Miller' }
  ];
}

function getInitialProjects() {
  return [
    { id: 'p1', title: 'Distributed Database Capstone', subject: 'Data Structures', status: 'In Progress', dueDate: '2026-07-28', members: ['Kritika', 'Alex', 'Sophia'] },
    { id: 'p2', title: 'Quantum Wave Simulator', subject: 'Quantum Physics', status: 'Planning', dueDate: '2026-08-05', members: ['Kritika', 'Liam'] }
  ];
}

function getInitialExams() {
  return [
    { id: 'ex1', subject: 'Quantum Physics Final Exam', targetDate: '2026-07-28T10:00' },
    { id: 'ex2', subject: 'Advanced Calculus Midterm', targetDate: '2026-08-02T14:00' }
  ];
}

function getInitialCoding() {
  return [
    { id: 'cod1', title: 'Lowest Common Ancestor of BST', difficulty: 'Medium', topic: 'Binary Search Tree', date: '2026-07-20' },
    { id: 'cod2', title: 'Trapping Rain Water', difficulty: 'Hard', topic: 'Two Pointers / Monotonic Stack', date: '2026-07-19' }
  ];
}

function getInitialMarks() {
  return [
    { id: 'm1', subject: 'Advanced Calculus', score: 88, maxScore: 100, category: 'Midterm', date: '2026-07-15' },
    { id: 'm2', subject: 'Data Structures & Algorithms', score: 94, maxScore: 100, category: 'Exam', date: '2026-07-10' },
    { id: 'm3', subject: 'Quantum Physics', score: 72, maxScore: 100, category: 'Quiz', date: '2026-07-18' },
    { id: 'm4', subject: 'Organic Chemistry', score: 68, maxScore: 100, category: 'Exam', date: '2026-07-12' },
    { id: 'm5', subject: 'Machine Learning', score: 96, maxScore: 100, category: 'Assignment', date: '2026-07-19' }
  ];
}

function getInitialTodos() {
  return [
    { id: 't1', title: 'Complete Physics Chapter 4 Problem Set', subject: 'Quantum Physics', priority: 'Urgent', dueDate: '2026-07-23', completed: false },
    { id: 't2', title: 'Review Reaction Mechanisms Cheat Sheet', subject: 'Organic Chemistry', priority: 'High', dueDate: '2026-07-24', completed: false },
    { id: 't3', title: 'Implement Binary Search Tree in C++', subject: 'Data Structures', priority: 'Medium', dueDate: '2026-07-25', completed: true },
    { id: 't4', title: 'Read Gemini 3 API Documentation', subject: 'Machine Learning', priority: 'Low', dueDate: '2026-07-26', completed: false }
  ];
}

function getInitialNotes() {
  return [
    {
      id: 'n1',
      title: 'Fourier Series & Partial Differential Equations',
      subject: 'Advanced Calculus',
      date: '2026-07-16',
      content: `### Fourier Series Decomposition

Any periodic function f(x) can be written as a sum of sines and cosines:

$$f(x) = \\frac{a_0}{2} + \\sum_{n=1}^{\\infty} \\left( a_n \\cos\\left(\\frac{n \\pi x}{L}\\right) + b_n \\sin\\left(\\frac{n \\pi x}{L}\\right) \\right)$$

Key Formulae for Coefficients:
- $a_0 = \\frac{1}{L} \\int_{-L}^{L} f(x) dx$
- $a_n = \\frac{1}{L} \\int_{-L}^{L} f(x) \\cos\\left(\\frac{n \\pi x}{L}\\right) dx$
- $b_n = \\frac{1}{L} \\int_{-L}^{L} f(x) \\sin\\left(\\frac{n \\pi x}{L}\\right) dx$

Application Tip: Test for odd vs even symmetry before evaluating integrals! Odd functions have $a_n = 0$.`,
      aiAnalysis: {
        summary: 'Deconstructs periodic functions into orthogonal sine/cosine basis terms using Euler-Fourier formulas.',
        keyConcepts: ['Harmonic Frequency Expansion', 'Orthogonality of Sine/Cosine', 'Boundary Condition Integrals'],
        flashcards: [
          { question: 'What is the condition for $a_n = 0$ in a Fourier Series?', answer: 'When f(x) is an odd function over symmetric bounds [-L, L].' },
          { question: 'What is the formula for the DC coefficient $a_0$?', answer: 'Average value of f(x): $\\frac{1}{L} \\int_{-L}^{L} f(x) dx$.' },
          { question: 'Why do we use Fourier Series in engineering?', answer: 'To reduce complex differential equations into easy linear algebraic frequency terms.' }
        ]
      }
    }
  ];
}
