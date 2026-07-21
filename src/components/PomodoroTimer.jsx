import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  CloudRain, 
  Radio, 
  Sparkles, 
  Trees,
  CheckCircle2,
  Clock,
  Settings
} from 'lucide-react';

export default function PomodoroTimer({ pomodoroStats, setPomodoroStats, onSoundscapeChange }) {
  // Timer Mode State (minutes)
  const [durationMinutes, setDurationMinutes] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [modeLabel, setModeLabel] = useState('Deep Focus');
  const [customMinInput, setCustomMinInput] = useState('');
  const [showCustomModal, setShowCustomModal] = useState(false);

  // Soundscape Web Audio State
  const [activeSoundscape, setActiveSoundscape] = useState('none');
  const [volume, setVolume] = useState(0.5);

  const audioCtxRef = useRef(null);
  const noiseNodeRef = useRef(null);
  const gainNodeRef = useRef(null);

  // Timer Tick Engine
  useEffect(() => {
    let interval = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
      // Update statistics
      setPomodoroStats((prev) => ({
        completedSessions: prev.completedSessions + 1,
        totalFocusMinutes: prev.totalFocusMinutes + Math.round(durationMinutes)
      }));
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft, durationMinutes, setPomodoroStats]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(durationMinutes * 60);
  };

  const selectDuration = (mins, label) => {
    setIsRunning(false);
    setDurationMinutes(mins);
    setSecondsLeft(mins * 60);
    setModeLabel(label);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    const val = parseInt(customMinInput, 10);
    if (!val || val <= 0) return;
    selectDuration(val, `Custom ${val}m Focus`);
    setShowCustomModal(false);
  };

  // Soundscape Web Audio Synthesizer Engine
  const startWebAudio = (type) => {
    stopWebAudio();
    if (type === 'none') return;

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);

      if (type === 'white') {
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }
      } else if (type === 'rain') {
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (white * 0.4) + (Math.sin(i * 0.01) * 0.1);
        }
      } else if (type === 'forest') {
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.sin(i * 0.005) * 0.15 + (Math.random() * 0.1);
        }
      } else {
        // Deep Space Pink/Brown noise
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = output[i];
        }
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;
      whiteNoise.loop = true;

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(volume * 0.3, ctx.currentTime);

      whiteNoise.connect(gainNode);
      gainNode.connect(ctx.destination);
      whiteNoise.start();

      noiseNodeRef.current = whiteNoise;
      gainNodeRef.current = gainNode;
    } catch (e) {
      console.warn('Web Audio synthesis not supported:', e);
    }
  };

  const stopWebAudio = () => {
    if (noiseNodeRef.current) {
      try { noiseNodeRef.current.stop(); } catch (e) {}
    }
    if (audioCtxRef.current) {
      try { audioCtxRef.current.close(); } catch (e) {}
    }
  };

  const handleSelectSoundscape = (type) => {
    setActiveSoundscape(type);
    startWebAudio(type);
    if (onSoundscapeChange) {
      onSoundscapeChange(type); // Triggers background visual sync!
    }
  };

  const handleVolumeChange = (newVol) => {
    setVolume(newVol);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(newVol * 0.3, audioCtxRef.current.currentTime);
    }
  };

  const formatTime = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-900 border border-orange-200 text-xs font-bold font-mono">
          ⏱️ AESTHETIC FOCUS TIMER ENGINE
        </span>
        <h2 className="text-3xl font-black text-stone-900 tracking-tight">Focus & Ambient Soundscape Hub</h2>
        <p className="text-xs text-stone-500 font-medium">Boost focus velocity with custom duration timers and synchronized ambient visual soundscapes</p>
      </div>

      {/* Main Timer Dial Card */}
      <div className="glass-card max-w-2xl mx-auto p-8 sm:p-12 rounded-3xl border border-orange-200 shadow-xl flex flex-col items-center space-y-8 relative overflow-hidden bg-gradient-to-b from-white/90 via-[#FFFBF5]/80 to-amber-50/50">
        
        {/* Preset Duration Selector Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 z-10">
          <button
            onClick={() => selectDuration(25, '25m Deep Focus')}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
              durationMinutes === 25 ? 'bg-orange-500 text-white shadow-md' : 'btn-secondary'
            }`}
          >
            25m Sprint
          </button>

          <button
            onClick={() => selectDuration(45, '45m Marathon')}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
              durationMinutes === 45 ? 'bg-orange-500 text-white shadow-md' : 'btn-secondary'
            }`}
          >
            45m Focus
          </button>

          <button
            onClick={() => selectDuration(60, '1 Hour Focus')}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
              durationMinutes === 60 ? 'bg-orange-500 text-white shadow-md' : 'btn-secondary'
            }`}
          >
            1hr Focus
          </button>

          <button
            onClick={() => selectDuration(120, '2 Hour Focus')}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
              durationMinutes === 120 ? 'bg-orange-500 text-white shadow-md' : 'btn-secondary'
            }`}
          >
            2hr Focus
          </button>

          <button
            onClick={() => selectDuration(180, '3 Hour Deep Work')}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
              durationMinutes === 180 ? 'bg-orange-500 text-white shadow-md' : 'btn-secondary'
            }`}
          >
            3hr Deep Work
          </button>

          <button
            onClick={() => setShowCustomModal(true)}
            className="btn-secondary px-3 py-2 rounded-2xl text-xs font-extrabold flex items-center gap-1 cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5 text-stone-500" />
            <span>Custom</span>
          </button>
        </div>

        {/* Circular Clock Dial */}
        <div className="relative w-72 h-72 rounded-full border-8 border-stone-200/80 flex flex-col items-center justify-center bg-white shadow-inner z-10">
          <span className="text-5xl font-black text-stone-900 font-mono tracking-tight">
            {formatTime(secondsLeft)}
          </span>
          <span className="text-xs font-extrabold uppercase text-orange-700 mt-2 tracking-wider font-mono">
            {modeLabel}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 z-10">
          <button
            onClick={toggleTimer}
            className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/20 hover:scale-105 transition-transform cursor-pointer"
          >
            {isRunning ? <Pause className="w-7 h-7 fill-white" /> : <Play className="w-7 h-7 fill-white ml-1" />}
          </button>

          <button
            onClick={resetTimer}
            className="w-12 h-12 rounded-2xl glass-panel border border-stone-300 text-stone-600 hover:text-stone-900 flex items-center justify-center cursor-pointer hover:bg-stone-50"
            title="Reset Timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Synchronized Ambient Web Audio Soundscape Controls */}
      <div className="glass-card max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
              <Radio className="w-5 h-5 text-orange-600" />
              Synchronized Web Audio Soundscapes & Background Visuals
            </h3>
            <p className="text-xs text-stone-500 font-medium">Selecting a soundscape instantly updates your screen background visuals (Rain, Forest leaves, Cosmic stars)</p>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3 w-48">
            <VolumeX className="w-4 h-4 text-stone-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <Volume2 className="w-4 h-4 text-orange-600" />
          </div>
        </div>

        {/* Soundscape Options Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { id: 'none', name: 'Mute Audio', icon: VolumeX, color: 'text-stone-400' },
            { id: 'rain', name: '🌧️ Lofi Rain', icon: CloudRain, color: 'text-blue-500' },
            { id: 'forest', name: '🍃 Forest Stream', icon: Trees, color: 'text-emerald-500' },
            { id: 'white', name: '📻 White Noise', icon: Radio, color: 'text-amber-500' },
            { id: 'space', name: '✨ Deep Space', icon: Sparkles, color: 'text-purple-500' }
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = activeSoundscape === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectSoundscape(item.id)}
                className={`p-3.5 rounded-2xl border text-xs font-bold flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-orange-500 text-white border-orange-500 shadow-md scale-105'
                    : 'bg-white text-stone-800 border-stone-200 hover:border-orange-300'
                }`}
              >
                <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : item.color}`} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Timer Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-sm p-6 rounded-3xl border border-orange-200 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-600" />
              Set Custom Focus Duration
            </h3>

            <form onSubmit={handleCustomSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Enter Duration (in Minutes)</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 90 or 150"
                  value={customMinInput}
                  onChange={(e) => setCustomMinInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-mono"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="btn-secondary px-4 py-2 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-5 py-2 rounded-xl text-xs font-bold"
                >
                  Start Custom Timer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
