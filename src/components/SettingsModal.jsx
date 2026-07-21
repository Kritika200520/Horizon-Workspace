import React, { useState } from 'react';
import { Key, Sparkles, Mail, ShieldCheck, X } from 'lucide-react';
import { getStoredGeminiKey, setStoredGeminiKey } from '../services/geminiService';
import { getResendApiKey, setResendApiKey, getUserEmail, setUserEmail } from '../services/emailService';

export default function SettingsModal({ isOpen, onClose, onSaved }) {
  if (!isOpen) return null;

  const [geminiKey, setGeminiKey] = useState(getStoredGeminiKey());
  const [resendKey, setResendKey] = useState(getResendApiKey());
  const [userEmail, setUserEmailState] = useState(getUserEmail());
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStoredGeminiKey(geminiKey);
    setResendApiKey(resendKey);
    setUserEmail(userEmailState);
    setSaved(true);
    if (onSaved) onSaved();
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
      <div className="glass-panel w-full max-w-lg p-6 rounded-3xl border border-orange-200 shadow-2xl space-y-6 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1 rounded-lg hover:bg-stone-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <h3 className="text-xl font-black text-stone-900 flex items-center gap-2">
            <Key className="w-5 h-5 text-orange-600" />
            API & Notification Configuration
          </h3>
          <p className="text-xs text-stone-500 font-medium">Configure your Gemini 3 Flash and Resend Email credentials</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-stone-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              Google AI Studio (Gemini) API Key
            </label>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-xs font-mono"
            />
            <p className="text-[10px] text-stone-500 font-medium">
              Leave blank to use Horizon's built-in intelligent Gemini 3 Flash simulation engine.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-stone-700 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-purple-600" />
              Resend API Key (Optional)
            </label>
            <input
              type="password"
              placeholder="re_..."
              value={resendKey}
              onChange={(e) => setResendKey(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-xs font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-stone-700">
              Target Notification Email Address
            </label>
            <input
              type="email"
              required
              placeholder="student@university.edu"
              value={userEmail}
              onChange={(e) => setUserEmailState(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-xs"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-stone-200">
            {saved ? (
              <span className="text-xs text-emerald-700 font-extrabold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> Configuration Saved!
              </span>
            ) : <span></span>}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary px-4 py-2 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary px-5 py-2 rounded-xl text-xs font-bold"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
