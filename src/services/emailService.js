// Email & Reminders Service with Resend Integration & Visual Dispatch Simulator

const RESEND_KEY_STORAGE = 'horizon_resend_api_key';
const USER_EMAIL_STORAGE = 'horizon_user_email';
const DISPATCH_LOG_STORAGE = 'horizon_email_dispatch_log';

export const getResendApiKey = () => localStorage.getItem(RESEND_KEY_STORAGE) || import.meta.env.VITE_RESEND_API_KEY || '';
export const setResendApiKey = (key) => localStorage.setItem(RESEND_KEY_STORAGE, key ? key.trim() : '');

export const getUserEmail = () => localStorage.getItem(USER_EMAIL_STORAGE) || 'student@example.com';
export const setUserEmail = (email) => localStorage.setItem(USER_EMAIL_STORAGE, email ? email.trim() : '');

export const getDispatchLogs = () => {
  try {
    const raw = localStorage.getItem(DISPATCH_LOG_STORAGE);
    return raw ? JSON.parse(raw) : getInitialDemoLogs();
  } catch (e) {
    return getInitialDemoLogs();
  }
};

export const clearDispatchLogs = () => {
  localStorage.setItem(DISPATCH_LOG_STORAGE, JSON.stringify([]));
};

function saveDispatchLog(logEntry) {
  const logs = getDispatchLogs();
  logs.unshift(logEntry);
  localStorage.setItem(DISPATCH_LOG_STORAGE, JSON.stringify(logs.slice(0, 30)));
}

/**
 * Send Email via Resend API (or simulate delivery if no key provided)
 */
export async function sendEmailReminder({ to, subject, htmlContent, reminderType = 'Task Deadline' }) {
  const apiKey = getResendApiKey();
  const recipient = to || getUserEmail();
  const timestamp = new Date().toLocaleString();

  const logEntry = {
    id: 'msg_' + Math.random().toString(36).substr(2, 9),
    timestamp,
    to: recipient,
    subject,
    reminderType,
    status: 'Sent',
    via: apiKey ? 'Resend API (Live)' : 'Dispatch Simulator',
    htmlContent
  };

  if (apiKey) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Horizon AI <onboarding@resend.dev>',
          to: [recipient],
          subject: subject,
          html: htmlContent
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        console.warn('Resend API error:', errData);
        logEntry.status = 'Resend Key Error (Simulated locally)';
        logEntry.errorDetails = errData.message || 'API call unauthenticated';
      } else {
        logEntry.status = 'Delivered via Resend';
      }
    } catch (err) {
      console.warn('Network error calling Resend:', err);
      logEntry.status = 'Delivered (Simulated fallback)';
    }
  }

  saveDispatchLog(logEntry);

  // Trigger browser in-app notification if permitted
  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification(`Horizon AI: ${subject}`, {
        body: `Reminder sent to ${recipient}`,
        icon: '/favicon.ico'
      });
    } catch (e) {
      console.log('Notification API error:', e);
    }
  }

  return logEntry;
}

/**
 * Aesthetic HTML Email Template Builder
 */
export function buildReminderEmailHtml({ title, details, category, dueDate, geminiTip }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #080C14; color: #F8FAFC; margin: 0; padding: 20px; }
    .card { background: #0F172A; border: 1px solid #1E293B; border-radius: 16px; padding: 24px; max-width: 550px; margin: 0 auto; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .header { text-align: center; border-bottom: 1px solid #1E293B; padding-bottom: 16px; margin-bottom: 20px; }
    .logo { font-size: 24px; font-weight: 800; color: #818CF8; letter-spacing: -0.5px; }
    .tag { display: inline-block; background: rgba(99, 102, 241, 0.15); color: #818CF8; border: 1px solid rgba(99, 102, 241, 0.3); padding: 4px 12px; border-radius: 99px; font-size: 12px; font-weight: 600; text-transform: uppercase; margin-bottom: 12px; }
    .title { font-size: 20px; font-weight: 700; color: #FFFFFF; margin: 0 0 8px 0; }
    .details { color: #94A3B8; font-size: 14px; line-height: 1.6; margin-bottom: 16px; background: #0D1322; padding: 12px 16px; border-radius: 8px; }
    .ai-box { background: linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.1) 100%); border-left: 3px solid #8B5CF6; padding: 12px 16px; border-radius: 6px; font-size: 13px; color: #C084FC; margin-top: 16px; }
    .footer { text-align: center; font-size: 12px; color: #64748B; margin-top: 24px; border-top: 1px solid #1E293B; padding-top: 16px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="logo">⚡ HORIZON AI</div>
      <div style="color: #64748B; font-size: 12px;">Smart Student Productivity & Reminders</div>
    </div>
    <span class="tag">${category || 'REMINDER'}</span>
    <h2 class="title">${title}</h2>
    <div class="details">
      ${details || 'You have an upcoming task or exam deadline.'}
      ${dueDate ? `<div style="margin-top: 8px; font-weight: 600; color: #38BDF8;">⏰ Due Date: ${dueDate}</div>` : ''}
    </div>
    ${geminiTip ? `
      <div class="ai-box">
        <strong>✨ Gemini 3 Flash Tip:</strong> ${geminiTip}
      </div>
    ` : ''}
    <div class="footer">
      Sent via Horizon AI Automated Reminders Engine • Track your marks & focus time at your dashboard.
    </div>
  </div>
</body>
</html>
  `;
}

function getInitialDemoLogs() {
  return [
    {
      id: 'msg_demo1',
      timestamp: new Date(Date.now() - 3600000).toLocaleString(),
      to: getUserEmail(),
      subject: '📚 Exam Alert: Advanced Calculus Midterm',
      reminderType: 'Exam Alert',
      status: 'Delivered',
      via: 'Dispatch Simulator',
      htmlContent: buildReminderEmailHtml({
        title: 'Advanced Calculus Midterm Exam',
        details: 'Unit 3 Integration & Differential Equations revision. Prepare formula cheat sheet.',
        category: 'EXAM ALERT',
        dueDate: 'Tomorrow at 10:00 AM',
        geminiTip: 'Run 3 Pomodoro sprints tonight focusing on Definite Integrals and integration by parts.'
      })
    }
  ];
}
