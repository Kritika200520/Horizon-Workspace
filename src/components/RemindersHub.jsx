import React, { useState } from 'react';
import { 
  BellRing, 
  Mail, 
  Send, 
  Key, 
  Eye, 
  CheckCircle2, 
  ShieldCheck
} from 'lucide-react';
import { 
  getResendApiKey, 
  setResendApiKey, 
  getUserEmail, 
  setUserEmail, 
  getDispatchLogs, 
  clearDispatchLogs, 
  sendEmailReminder,
  buildReminderEmailHtml 
} from '../services/emailService';

export default function RemindersHub({ onSendEmailReminder }) {
  const [resendKey, setResendKeyInput] = useState(getResendApiKey());
  const [userEmailInput, setUserEmailInput] = useState(getUserEmail());
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [logs, setLogs] = useState(getDispatchLogs());
  const [previewLog, setPreviewLog] = useState(logs[0] || null);

  const [testTitle, setTestTitle] = useState('Organic Chemistry Lab Exam');
  const [testCategory, setTestCategory] = useState('EXAM ALERT');
  const [testDetails, setTestDetails] = useState('Review Functional Groups, Reaction Mechanisms & Spectral Analysis.');
  const [testDueDate, setTestDueDate] = useState('Tomorrow at 9:00 AM');
  const [sending, setSending] = useState(false);

  const handleSaveConfig = (e) => {
    e.preventDefault();
    setResendApiKey(resendKey);
    setUserEmail(userEmailInput);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleDispatchTest = async () => {
    setSending(true);
    const htmlContent = buildReminderEmailHtml({
      title: testTitle,
      details: testDetails,
      category: testCategory,
      dueDate: testDueDate,
      geminiTip: 'Allocate 2 Pomodoro sprints on reaction mechanisms before sleeping.'
    });

    const newLog = await sendEmailReminder({
      to: userEmailInput,
      subject: `[Horizon AI Alert] ${testTitle}`,
      htmlContent,
      reminderType: testCategory
    });

    const updatedLogs = getDispatchLogs();
    setLogs(updatedLogs);
    setPreviewLog(newLog);
    setSending(false);
  };

  const handleClearLogs = () => {
    clearDispatchLogs();
    setLogs([]);
    setPreviewLog(null);
  };

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-stone-900 flex items-center gap-2">
            <BellRing className="w-6 h-6 text-orange-600" />
            Email Reminders & Notification Hub
          </h2>
          <p className="text-xs text-stone-500 mt-1 font-medium">Configure Resend API delivery and preview live HTML email dispatches</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Dispatch Engine Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-6 rounded-3xl border border-stone-200 space-y-5 shadow-sm">
          <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
            <Key className="w-4 h-4 text-orange-600" />
            Resend Email Integration Settings
          </h3>

          <form onSubmit={handleSaveConfig} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Your Notification Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3 text-stone-400" />
                <input
                  type="email"
                  required
                  placeholder="student@example.com"
                  value={userEmailInput}
                  onChange={(e) => setUserEmailInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Resend API Key <span className="text-stone-400 font-normal">(Optional)</span>
              </label>
              <input
                type="password"
                placeholder="re_123456789..."
                value={resendKey}
                onChange={(e) => setResendKeyInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-mono"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              {savedSuccess ? (
                <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Settings Saved!
                </span>
              ) : <span></span>}

              <button
                type="submit"
                className="btn-primary px-5 py-2 rounded-xl text-xs font-bold"
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-orange-200 space-y-5 shadow-sm">
          <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
            <Send className="w-4 h-4 text-orange-600" />
            Live Email Dispatch Simulator
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Reminder Category</label>
              <select
                value={testCategory}
                onChange={(e) => setTestCategory(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl glass-input text-xs bg-white text-stone-800"
              >
                <option value="EXAM ALERT">EXAM ALERT</option>
                <option value="TASK DEADLINE">URGENT TASK DEADLINE</option>
                <option value="WEEKLY AI SUMMARY">WEEKLY AI SUMMARY</option>
                <option value="STUDY MOTIVATION">STUDY MOTIVATION</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Reminder Subject</label>
              <input
                type="text"
                value={testTitle}
                onChange={(e) => setTestTitle(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl glass-input text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Due Date</label>
                <input
                  type="text"
                  value={testDueDate}
                  onChange={(e) => setTestDueDate(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl glass-input text-xs"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleDispatchTest}
                  disabled={sending}
                  className="w-full btn-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{sending ? 'Sending...' : 'Dispatch Email'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 glass-card p-4 rounded-3xl border border-stone-200 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold text-stone-900 uppercase">Dispatch Log History</h3>
            <button
              onClick={handleClearLogs}
              className="text-[11px] text-stone-400 hover:text-rose-600"
            >
              Clear Log
            </button>
          </div>

          <div className="space-y-2 max-h-[450px] overflow-y-auto pr-1">
            {logs.length === 0 ? (
              <div className="text-center py-8 text-xs text-stone-400 font-medium">
                No email logs yet. Trigger a dispatch above!
              </div>
            ) : (
              logs.map((log) => (
                <div
                  key={log.id}
                  onClick={() => setPreviewLog(log)}
                  className={`p-3 rounded-2xl cursor-pointer border transition-all ${
                    previewLog?.id === log.id
                      ? 'bg-orange-100/80 border-orange-300 text-stone-900 shadow-sm'
                      : 'bg-white border-stone-200 text-stone-700 hover:border-orange-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold truncate">{log.subject}</span>
                    <span className="text-[10px] text-stone-400 font-mono">{log.timestamp.split(',')[1] || log.timestamp}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-stone-500 mt-1">
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold">{log.reminderType}</span>
                    <span className="text-emerald-700 font-bold">{log.status}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="lg:col-span-2 glass-card p-6 rounded-3xl border border-stone-200 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h3 className="text-sm font-extrabold text-stone-900 flex items-center gap-2">
              <Eye className="w-4 h-4 text-orange-600" />
              Live HTML Email Card Renderer
            </h3>

            {previewLog && (
              <span className="text-xs font-mono text-stone-500">
                To: <span className="text-stone-800 font-bold">{previewLog.to}</span>
              </span>
            )}
          </div>

          {previewLog ? (
            <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-stone-200 overflow-hidden min-h-[350px]">
              <iframe
                title="Email Preview"
                srcDoc={previewLog.htmlContent}
                className="w-full h-[380px] rounded-xl border-0 bg-transparent"
              ></iframe>
            </div>
          ) : (
            <div className="text-center py-20 text-stone-400 text-xs font-medium">
              Select an email log entry to inspect its rendered HTML template.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
