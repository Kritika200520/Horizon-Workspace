# 🌅 Horizon AI - Ultimate Student Study OS

<p align="center">
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Gemini_3_Flash-AI-8E44AD?style=for-the-badge&logo=google&logoColor=white" alt="Gemini AI" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/License-MIT-green.style=for-the-badge" alt="License" />
</p>

<p align="center">
  <b>A futuristic, aesthetic, all-in-one Study Operating System empowering students with AI exam predictions, 28+ animated waving anime companions, classmate search directory, direct & group chat rooms, and automated study velocity tracking.</b>
</p>

---

## 🚀 Key Features

### 🤖 1. Gemini 3 Flash AI Engine
- **PYQ Analyzer**: Paste previous year question papers to get instant topic weightage distributions, predicted high-repeat questions, and step-by-step model derivations.
- **Active Recall Flashcard & Quiz Generator**: Automatically converts lecture notes into 3D interactive flashcards and multiple-choice quizzes.

### 🎒 2. 28+ Animated Waving Character Companions
Stay motivated during late-night study sessions with your favorite anime heroes standing and continuously waving on your home workspace:
- 🍥 **Naruto Shippuden**: Naruto Uzumaki, Sasuke Uchiha, Sakura Haruno, Kakashi Hatake
- 🐉 **Dragon Ball Z**: Goku, Vegeta
- ⚡ **Pokémon**: Pikachu
- 👒 **One Piece**: Monkey D. Luffy, Nami, Nico Robin, Sanji, Roronoa Zoro
- 🎒 **Shinchan**: Shinchan Nohara, Toru Kazama, Nene Sakurada (Nani), Boo-chan, Masao Sato, Himawari
- 🐱 **Doraemon**: Nobita Nobi, Shizuka Minamoto, Doraemon, Dorami, Sunio Honekawa, Gian
- ⚡ **Harry Potter**: Harry Potter, Hermione Granger, Ron Weasley, Draco Malfoy, Hedwig, Cedric Diggory

### 💬 3. Classmate Search, Direct Messaging & Group Chat Creator
- **Directory Search**: Search classmates by name, email, or major with instant contact adding.
- **1-on-1 Direct Chat**: Chat privately with friends in real-time.
- **Group Chat Creator**: Create custom study group rooms, select emoji icons (📚, ⚛️, ⚡, 💻), select members with checkboxes, and ask **Horizon AI Buddy** for live exam assistance!

### 🛡️ 4. Attendance Guard (<75% Bunk Calculator)
- Real-time attendance percentage calculator.
- Calculates exact number of safe classes you can skip ("bunk") or mandatory classes you must attend to maintain 75% eligibility.

### ⏱️ 5. Aesthetic Pomodoro Focus & Lo-Fi Soundscapes
- Integrated Pomodoro timer with custom interval controls.
- Ambient lo-fi soundscapes (Rainfall, Cafe ambience, Cyberpunk focus) for deep work sessions.

### 📊 6. Marks & GPA Analytics Tracker
- Visual graphs and grade breakdown tracking target vs. actual scores across all subjects.

### 📧 7. Automated Email & Notification Dispatcher
- Integrated with **Resend API** to send task deadline reminders, exam countdown alerts, and study schedule summaries directly to your inbox.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite 5, Tailwind CSS
- **Icons**: Lucide React Icons
- **AI Integration**: Google Gemini 3 Flash REST API
- **Email Service**: Resend API
- **Storage**: LocalStorage with real-time cross-tab synchronization (`window.addEventListener('storage')`)

---

## ⚡ Quick Start & Setup

### Prerequisites
- Node.js (v18.0 or higher)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/your-username/horizon-ai.git
cd horizon-ai
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Environment Variables
Create a `.env` file in the root directory:
```env
VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
VITE_RESEND_API_KEY=your_resend_api_key_here
```

### 4. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser!

### 5. Build for Production
```bash
npm run build
```

---

## 📁 Project Structure

```
horizon-ai/
├── public/
│   └── assets/           # Mascot renders & visual assets
├── src/
│   ├── components/       # UI Components (Dashboard, StandingCharacterMascot, StudyGroupChat, etc.)
│   ├── services/         # API Services (geminiService, emailService, gamificationService)
│   ├── App.jsx           # Main Router & Layout Container
│   ├── index.css         # Global Tailwind & Glassmorphism styles
│   └── main.jsx          # App Entry point
├── package.json
└── README.md
```

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<p align="center">
  <b>Built with ❤️ for students worldwide by Horizon AI Team</b>
</p>
