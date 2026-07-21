import React, { useState } from 'react';
import { 
  Timer, 
  Volume2, 
  Sparkles, 
  Calculator, 
  Play, 
  Pause, 
  CloudRain, 
  Wind, 
  Radio, 
  X,
  Send
} from 'lucide-react';
import { audioSynth } from '../services/audioService';

export default function FloatingDock({ onNavigate, onOpenAddMarks }) {
  const [isPlayingTimer, setIsPlayingTimer] = useState(false);
  const [activeAudio, setActiveAudio] = useState('off');
  const [showAudioMenu, setShowAudioMenu] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [quickPrompt, setQuickPrompt] = useState('');

  const handleToggleAudio = (soundKey) => {
    setActiveAudio(soundKey);
    setShowAudioMenu(false);
    if (soundKey === 'off') {
      audioSynth.stopAmbientTrack();
    } else {
      audioSynth.playAmbientTrack(soundKey, 0.5);
    }
  };

  const handleAskQuickAi = (e) => {
    e.preventDefault();
    if (!quickPrompt) return;
    onNavigate('ai-analysis');
    setShowAiModal(false);
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 select-none">
      
      {/* Soundscape Quick Menu Popup */}
      {showAudioMenu && (
        <div className="mb-3 p-3 rounded-2xl glass-panel border border-orange-200 shadow-xl flex items-center gap-2 animate-bounce-short">
          {[
            { id: 'off', label: 'Mute', icon: X },
            { id: 'rain', label: 'Rain', icon: CloudRain },
            { id: 'white_noise', label: 'Noise', icon: Wind },
            { id: 'space_drone', label: 'Space', icon: Radio }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleToggleAudio(item.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeAudio === item.id
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'bg-white text-stone-700 hover:bg-orange-50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Main Floating Pill Dock */}
      <div className="flex items-center gap-2 p-2 rounded-2xl glass-panel border border-orange-200/90 shadow-lg backdrop-blur-xl">
        
        {/* Quick Pomodoro Toggle */}
        <button
          onClick={() => onNavigate('pomodoro')}
          className="p-2.5 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition-colors shadow-sm flex items-center gap-2 text-xs font-bold cursor-pointer"
          title="Open Focus Timer"
        >
          <Timer className="w-4 h-4" />
          <span className="hidden sm:inline">25m Focus</span>
        </button>

        <div className="w-px h-6 bg-stone-200"></div>

        {/* Ambient Audio Toggle */}
        <button
          onClick={() => setShowAudioMenu(!showAudioMenu)}
          className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeAudio !== 'off'
              ? 'bg-purple-100 border-purple-300 text-purple-900 shadow-sm'
              : 'bg-white border-stone-200 text-stone-700 hover:border-orange-300'
          }`}
          title="Ambient Soundscapes"
        >
          <Volume2 className="w-4 h-4 text-orange-600" />
          <span className="hidden sm:inline">Audio</span>
        </button>

        {/* Quick Ask AI Trigger */}
        <button
          onClick={() => setShowAiModal(true)}
          className="p-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 transition-opacity shadow-sm flex items-center gap-1.5 text-xs font-bold cursor-pointer"
          title="Ask Gemini 3 Flash"
        >
          <Sparkles className="w-4 h-4 text-amber-200" />
          <span className="hidden sm:inline">Ask AI</span>
        </button>

        <div className="w-px h-6 bg-stone-200"></div>

        {/* Target Grade Predictor */}
        <button
          onClick={() => onNavigate('marks')}
          className="p-2.5 rounded-xl bg-white border border-stone-200 text-stone-800 hover:border-orange-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
          title="Grade Simulator"
        >
          <Calculator className="w-4 h-4 text-amber-600" />
          <span className="hidden sm:inline font-mono">GPA Predictor</span>
        </button>

      </div>

      {/* Quick AI Ask Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-lg p-6 rounded-3xl border border-orange-200 shadow-2xl space-y-4 relative">
            <button
              onClick={() => setShowAiModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-orange-600" />
              Quick Ask Gemini 3 Flash
            </h3>

            <form onSubmit={handleAskQuickAi} className="space-y-3">
              <input
                type="text"
                placeholder="Ask anything (e.g. How to study Quantum Physics in 3 days?)..."
                value={quickPrompt}
                onChange={(e) => setQuickPrompt(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl glass-input text-xs"
                autoFocus
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAiModal(false)}
                  className="btn-secondary px-4 py-2 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Ask Gemini</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
