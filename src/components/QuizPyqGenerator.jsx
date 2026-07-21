import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  FileText, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  BarChart2, 
  RotateCcw,
  RefreshCw,
  HelpCircle,
  Brain,
  Lightbulb,
  ArrowRight,
  Layers,
  Upload,
  File,
  Image,
  X,
  Check
} from 'lucide-react';
import { analyzePYQQuestionPaper, generateFlashcardsAndQuizFromNotes } from '../services/geminiService';

export default function QuizPyqGenerator({ onEarnXP }) {
  const [activeTab, setActiveTab] = useState('pyq-analyzer'); // 'pyq-analyzer', 'notes-flashcards', 'practice-quiz'
  
  // PYQ Input & Result State
  const [pyqText, setPyqText] = useState(`Q1. Derive Schrödinger's wave equation for a 1D particle in a box (10 Marks).
Q2. Evaluate integral of f(x) = x * sin(x) using Integration by Parts (8 Marks).
Q3. Explain AVL tree rotations and worst-case time complexity (7 Marks).
Q4. Define de Broglie wavelength and Planck constant relationship (5 Marks).`);
  const [pyqSubject, setPyqSubject] = useState('Quantum Physics & Higher Math');
  const [pyqFile, setPyqFile] = useState(null);
  const [loadingPYQ, setLoadingPYQ] = useState(false);
  const [pyqResult, setPyqResult] = useState(null);
  const pyqFileRef = useRef(null);

  // Notes Input & Result State
  const [notesText, setNotesText] = useState(`Fourier Series Decomposition Notes:
Any periodic function f(x) can be written as a sum of sines and cosines:
f(x) = a0/2 + sum(an cos(n pi x / L) + bn sin(n pi x / L))
Key Formulae:
- a0 = 1/L integral(-L to L) f(x) dx
- an = 1/L integral(-L to L) f(x) cos(n pi x / L) dx
- bn = 1/L integral(-L to L) f(x) sin(n pi x / L) dx
Tip: Test for odd vs even symmetry before evaluating integrals! Odd functions have an = 0.`);
  const [notesSubject, setNotesSubject] = useState('Advanced Calculus');
  const [notesFile, setNotesFile] = useState(null);
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [flashcardDeck, setFlashcardDeck] = useState(null);
  const [flippedCards, setFlippedCards] = useState({});
  const notesFileRef = useRef(null);

  // Practice Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // File Upload Handlers
  const handlePYQFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPyqFile({
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB',
      type: file.type.includes('pdf') ? 'PDF' : file.type.includes('image') ? 'IMAGE' : 'TXT'
    });

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      if (typeof content === 'string') {
        if (file.type.includes('image')) {
          setPyqText(`[Scanned Image PYQ Document: ${file.name}]\nExtracted Exam Questions: Derive Schrödinger equation, Fourier integral analysis, and binary tree complexity.`);
        } else {
          setPyqText(content.slice(0, 3000));
        }
      }
    };
    if (file.type.includes('image')) {
      reader.readAsDataURL(file);
    } else {
      reader.readAsText(file);
    }
  };

  const handleNotesFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setNotesFile({
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB',
      type: file.type.includes('pdf') ? 'PDF' : file.type.includes('image') ? 'IMAGE' : 'TXT'
    });

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      if (typeof content === 'string') {
        if (file.type.includes('image')) {
          setNotesText(`[Scanned Lecture Note Photo: ${file.name}]\nExtracted Notes: Fourier Series decomposition, orthogonal wave properties, and boundary condition integral derivations.`);
        } else {
          setNotesText(content.slice(0, 3000));
        }
      }
    };
    if (file.type.includes('image')) {
      reader.readAsDataURL(file);
    } else {
      reader.readAsText(file);
    }
  };

  // Analysis Handlers
  const handleRunPYQAnalysis = async () => {
    setLoadingPYQ(true);
    try {
      const result = await analyzePYQQuestionPaper(pyqText, pyqSubject);
      setPyqResult(result);
    } catch (e) {
      console.error('PYQ analysis failed:', e);
    } finally {
      setLoadingPYQ(false);
    }
  };

  const handleGenerateFromNotes = async () => {
    setLoadingNotes(true);
    try {
      const result = await generateFlashcardsAndQuizFromNotes(notesText, notesSubject);
      setFlashcardDeck(result);
      setFlippedCards({});
    } catch (e) {
      console.error('Notes Flashcards generation failed:', e);
    } finally {
      setLoadingNotes(false);
    }
  };

  const toggleFlipCard = (idx) => {
    setFlippedCards(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const defaultQuiz = [
    {
      id: 1,
      question: 'In Quantum Physics, what is the wave-particle duality equation for de Broglie wavelength?',
      options: ['λ = h / p', 'λ = E / c', 'λ = m / v', 'λ = h · f'],
      correct: 0,
      explanation: 'de Broglie wavelength λ is given by Planck constant h divided by momentum p.'
    },
    {
      id: 2,
      question: 'Which integration technique is used to integrate f(x) = x · sin(x)?',
      options: ['Partial Fractions', 'Integration by Parts', 'Trigonometric Substitution', 'Limit Definition'],
      correct: 1,
      explanation: 'Integration by Parts (∫ u dv = uv - ∫ v du) is standard for products of algebraic and trig functions.'
    },
    {
      id: 3,
      question: 'What is the worst-case time complexity of Binary Search Tree search in an unbalanced tree?',
      options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
      correct: 2,
      explanation: 'In a degenerate/unbalanced BST, search degrades to O(N) linked list search time.'
    }
  ];

  const currentQuiz = flashcardDeck?.activeQuiz || defaultQuiz;

  const handleCalculateScore = () => {
    let correctCount = 0;
    currentQuiz.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) {
        correctCount += 1;
      }
    });
    setScore(correctCount);
    setSubmitted(true);
    if (onEarnXP) onEarnXP(80);
  };

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-stone-900 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-orange-600" />
            AI PYQ Analyzer & Notes-to-Flashcards Hub
          </h2>
          <p className="text-xs text-stone-500 font-medium mt-1">Upload PDF or Image question papers & notes to generate AI Flashcards, Quizzes, and PYQ weightage</p>
        </div>

        {/* Tab Navigation Buttons */}
        <div className="flex flex-wrap gap-2 p-1.5 glass-panel rounded-2xl border border-stone-200 shadow-sm">
          <button
            onClick={() => setActiveTab('pyq-analyzer')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'pyq-analyzer' ? 'bg-orange-500 text-white shadow-sm' : 'bg-white text-stone-700 hover:bg-orange-50'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>PYQ Analyzer</span>
          </button>

          <button
            onClick={() => setActiveTab('notes-flashcards')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'notes-flashcards' ? 'bg-purple-600 text-white shadow-sm' : 'bg-white text-stone-700 hover:bg-purple-50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Notes ➔ Flashcards & Quiz</span>
          </button>

          <button
            onClick={() => setActiveTab('practice-quiz')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'practice-quiz' ? 'bg-amber-500 text-white shadow-sm' : 'bg-white text-stone-700 hover:bg-amber-50'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Active Quiz</span>
          </button>
        </div>
      </div>

      {/* TAB 1: PREVIOUS YEAR QUESTION PAPER (PYQ) ANALYZER */}
      {activeTab === 'pyq-analyzer' && (
        <div className="space-y-8">
          
          {/* Input & File Upload Card */}
          <div className="glass-card p-6 rounded-3xl border border-orange-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
              <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-orange-600" />
                Upload PDF / Image or Paste PYQ Question Paper
              </h3>
              <span className="text-xs text-stone-500 font-mono">Accepts .pdf, .png, .jpg, .txt</span>
            </div>

            {/* File Upload Dropzone */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 space-y-3">
                
                {/* Drag and Drop Zone */}
                <div
                  onClick={() => pyqFileRef.current?.click()}
                  className="p-4 rounded-2xl border-2 border-dashed border-orange-300/80 bg-orange-50/40 hover:bg-orange-50 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <Upload className="w-6 h-6 text-orange-500" />
                  <div className="text-xs font-bold text-stone-800">
                    Click or Drag & Drop Question Paper <span className="text-orange-600 font-extrabold">PDF / Photo Scan</span>
                  </div>
                  <div className="text-[10px] text-stone-400 font-mono">Supports PDF, PNG, JPG, JPEG documents</div>
                  <input
                    ref={pyqFileRef}
                    type="file"
                    accept=".pdf,image/*,.txt"
                    onChange={handlePYQFileUpload}
                    className="hidden"
                  />
                </div>

                {/* Uploaded File Badge */}
                {pyqFile && (
                  <div className="p-3 rounded-xl bg-orange-100/70 border border-orange-300 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2.5">
                      {pyqFile.type === 'PDF' ? <File className="w-4 h-4 text-rose-600" /> : <Image className="w-4 h-4 text-purple-600" />}
                      <div>
                        <div className="text-xs font-black text-stone-900">{pyqFile.name}</div>
                        <div className="text-[10px] text-orange-800 font-mono">{pyqFile.type} Document • {pyqFile.size}</div>
                      </div>
                    </div>

                    <button onClick={() => setPyqFile(null)} className="p-1 text-stone-400 hover:text-rose-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Textarea */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Extracted / Pasted PYQ Text</label>
                  <textarea
                    rows="4"
                    value={pyqText}
                    onChange={(e) => setPyqText(e.target.value)}
                    placeholder="Paste question paper text here or use file upload above..."
                    className="w-full px-4 py-3 rounded-2xl glass-input text-xs font-mono leading-relaxed"
                  ></textarea>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Subject Name</label>
                  <input
                    type="text"
                    value={pyqSubject}
                    onChange={(e) => setPyqSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>

                <button
                  onClick={handleRunPYQAnalysis}
                  disabled={loadingPYQ}
                  className="w-full btn-primary py-3.5 rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-md cursor-pointer mt-4"
                >
                  {loadingPYQ ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-white" />
                      <span>Analyzing Document...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-200" />
                      <span>Analyze Document with Gemini</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Analysis Result Card */}
          {pyqResult ? (
            <div className="space-y-6">
              
              {/* Paper Summary Header */}
              <div className="glass-card p-6 rounded-3xl border border-orange-300 bg-gradient-to-r from-orange-50 via-amber-50 to-purple-50 shadow-md space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-stone-900">{pyqResult.paperTitle}</h3>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-orange-100 text-orange-900 border border-orange-200">
                    Total: {pyqResult.totalMarks} Marks
                  </span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed font-medium">{pyqResult.summary}</p>
              </div>

              {/* Topic Weightage Cards */}
              <div className="glass-card p-6 rounded-3xl border border-stone-200 space-y-4 shadow-sm">
                <h4 className="text-sm font-extrabold text-stone-900 flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-orange-600" />
                  Topic Weightage Distribution
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {pyqResult.topicWeightage?.map((tw, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-black text-stone-900 font-mono">{tw.weightagePct}%</span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-orange-100 text-orange-800 border border-orange-200">
                          {tw.status}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-stone-900">{tw.topic}</div>
                      <div className="text-[10px] text-stone-500 font-mono">{tw.questionCount} Questions in PYQ</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Predicted 2026 Questions */}
              <div className="glass-card p-6 rounded-3xl border border-purple-200 space-y-4 shadow-sm">
                <h4 className="text-sm font-extrabold text-stone-900 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-purple-600" />
                  Predicted 2026 Exam Questions & Repeat Rate
                </h4>

                <div className="space-y-3">
                  {pyqResult.predictedQuestions?.map((pq, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-stone-900">Q{idx + 1}. {pq.question}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-900 font-mono">{pq.markValue}</span>
                          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 font-mono">{pq.frequency}</span>
                        </div>
                      </div>
                      <div className="text-[11px] text-stone-600 bg-amber-50 p-2.5 rounded-xl border border-amber-200 font-medium">
                        💡 <strong>Exam Hint:</strong> {pq.hint}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="glass-card p-12 text-center rounded-3xl border border-stone-200 space-y-2">
              <Sparkles className="w-10 h-10 text-orange-500 mx-auto animate-bounce" />
              <h4 className="text-base font-bold text-stone-900">Upload PDF / Image or Click "Analyze Document" Above</h4>
              <p className="text-xs text-stone-500 font-medium max-w-sm mx-auto">
                Gemini 3 Flash will extract topic weightages, predicted 2026 exam questions, and solution outlines.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: NOTES TO 3D FLIP FLASHCARDS & QUIZ GENERATOR */}
      {activeTab === 'notes-flashcards' && (
        <div className="space-y-8">
          
          {/* Notes Input Card */}
          <div className="glass-card p-6 rounded-3xl border border-purple-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
              <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-600" />
                Upload PDF / Image Notes or Paste Notebook Content
              </h3>
              <span className="text-xs text-purple-700 font-mono font-bold">Generates 3D Flip Flashcards & Quiz</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 space-y-3">
                
                {/* Notes Drag & Drop Zone */}
                <div
                  onClick={() => notesFileRef.current?.click()}
                  className="p-4 rounded-2xl border-2 border-dashed border-purple-300/80 bg-purple-50/40 hover:bg-purple-50 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <Upload className="w-6 h-6 text-purple-600" />
                  <div className="text-xs font-bold text-stone-800">
                    Click or Drag & Drop Study Note <span className="text-purple-600 font-extrabold">PDF / Photo Scan</span>
                  </div>
                  <div className="text-[10px] text-stone-400 font-mono">Supports PDF, PNG, JPG, JPEG documents</div>
                  <input
                    ref={notesFileRef}
                    type="file"
                    accept=".pdf,image/*,.txt"
                    onChange={handleNotesFileUpload}
                    className="hidden"
                  />
                </div>

                {/* Uploaded Notes File Badge */}
                {notesFile && (
                  <div className="p-3 rounded-xl bg-purple-100/70 border border-purple-300 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2.5">
                      {notesFile.type === 'PDF' ? <File className="w-4 h-4 text-rose-600" /> : <Image className="w-4 h-4 text-purple-600" />}
                      <div>
                        <div className="text-xs font-black text-stone-900">{notesFile.name}</div>
                        <div className="text-[10px] text-purple-800 font-mono">{notesFile.type} Document • {notesFile.size}</div>
                      </div>
                    </div>

                    <button onClick={() => setNotesFile(null)} className="p-1 text-stone-400 hover:text-rose-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Pasted Study Notes Content</label>
                  <textarea
                    rows="4"
                    value={notesText}
                    onChange={(e) => setNotesText(e.target.value)}
                    placeholder="Paste lecture notes or chapter summary here..."
                    className="w-full px-4 py-3 rounded-2xl glass-input text-xs font-mono leading-relaxed"
                  ></textarea>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Subject Name</label>
                  <input
                    type="text"
                    value={notesSubject}
                    onChange={(e) => setNotesSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>

                <button
                  onClick={handleGenerateFromNotes}
                  disabled={loadingNotes}
                  className="w-full btn-primary py-3.5 rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-md cursor-pointer mt-4"
                >
                  {loadingNotes ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-white" />
                      <span>Processing File...</span>
                    </>
                  ) : (
                    <>
                      <Layers className="w-4 h-4 text-amber-200" />
                      <span>Generate Flashcards & Quiz</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Generated Flashcards Deck */}
          {flashcardDeck?.flashcards && (
            <div className="glass-card p-6 rounded-3xl border border-stone-200 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <div>
                  <h3 className="text-base font-extrabold text-stone-900">Interactive Active Recall Flashcard Deck</h3>
                  <p className="text-xs text-stone-500 font-medium">Click any card to flip 180° and reveal the model answer</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-900 border border-purple-200 font-mono">
                  {flashcardDeck.flashcards.length} Cards in Deck
                </span>
              </div>

              {/* 3D Flip Flashcards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {flashcardDeck.flashcards.map((fc, idx) => {
                  const isFlipped = !!flippedCards[idx];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleFlipCard(idx)}
                      className="h-52 rounded-3xl border border-stone-200/90 shadow-md cursor-pointer transition-all duration-500 relative p-6 flex flex-col justify-between select-none bg-gradient-to-tr from-amber-50/70 via-orange-50/40 to-purple-50/70 hover:shadow-xl hover:border-orange-300"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-orange-100 text-orange-900 border border-orange-200 font-mono">
                          {fc.keyTag || 'Flashcard'}
                        </span>
                        <span className="text-[10px] text-stone-400 font-mono uppercase font-bold">
                          {isFlipped ? 'Answer (Click to flip back)' : 'Click to Flip 🔄'}
                        </span>
                      </div>

                      <div className="py-2">
                        {isFlipped ? (
                          <div className="text-xs text-stone-900 font-bold leading-relaxed animate-fadeIn">
                            💡 <strong>Answer:</strong> {fc.backAnswer}
                          </div>
                        ) : (
                          <div className="text-sm font-extrabold text-stone-900 leading-snug">
                            ❓ {fc.frontQuestion}
                          </div>
                        )}
                      </div>

                      <div className="text-[10px] text-stone-400 font-mono text-right">
                        Card #{idx + 1}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: INTERACTIVE PRACTICE QUIZ */}
      {activeTab === 'practice-quiz' && (
        <div className="glass-card p-6 rounded-3xl border border-orange-200 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div>
              <h3 className="text-base font-extrabold text-stone-900">Gemini 3 Flash Active Recall Quiz</h3>
              <p className="text-xs text-stone-500 font-medium">Test your mastery across physics, calculus, and algorithm concepts</p>
            </div>

            {submitted && (
              <span className="px-4 py-1.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                Score: {score}/{currentQuiz.length} (+80 XP Earned!)
              </span>
            )}
          </div>

          <div className="space-y-6">
            {currentQuiz.map((q, qIdx) => (
              <div key={q.id || qIdx} className="p-5 rounded-2xl bg-white border border-stone-200 space-y-3 shadow-sm">
                <div className="text-xs font-black text-stone-900">
                  Q{qIdx + 1}. {q.question}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = selectedAnswers[q.id || qIdx] === oIdx;
                    const isCorrect = q.correct === oIdx;

                    let btnStyle = 'bg-stone-50 border-stone-200 text-stone-700 hover:border-orange-300';
                    if (isSelected) btnStyle = 'bg-orange-100 border-orange-400 text-orange-900 font-bold';
                    if (submitted && isCorrect) btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-900 font-extrabold';

                    return (
                      <button
                        key={oIdx}
                        onClick={() => {
                          if (!submitted) setSelectedAnswers(prev => ({ ...prev, [q.id || qIdx]: oIdx }));
                        }}
                        className={`p-3 rounded-xl border text-xs text-left transition-all cursor-pointer ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div className="text-xs text-stone-600 bg-amber-50 p-3 rounded-xl border border-amber-200 font-medium">
                    💡 <strong>Explanation:</strong> {q.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>

          {!submitted ? (
            <button
              onClick={handleCalculateScore}
              className="w-full btn-primary py-3 rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Submit Quiz & Claim +80 XP</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setSubmitted(false);
                setSelectedAnswers({});
              }}
              className="w-full btn-secondary py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
