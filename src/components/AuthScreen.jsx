import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  Sun
} from 'lucide-react';
import StandingCharacterMascot from './StandingCharacterMascot';

export default function AuthScreen({ onLogin }) {
  const [name, setName] = useState('Kritika S Narayan');
  const [email, setEmail] = useState('kritika.narayan@gmail.com');
  const [university, setUniversity] = useState('Stanford University');

  // Fictional Character Avatar State
  const [selectedUniverse, setSelectedUniverse] = useState('One Piece');
  const [selectedCharacter, setSelectedCharacter] = useState({
    name: 'Monkey D. Luffy',
    universe: 'One Piece',
    greetingQuote: "I'm gonna be King of the Pirates & get 100% on exams!",
    colorAura: 'from-red-500 to-yellow-400'
  });

  const FICTIONAL_PRESETS = [
    {
      universe: 'One Piece',
      icon: '👒',
      characters: [
        { name: 'Monkey D. Luffy', greetingQuote: "I'm gonna be King of the Pirates & get 100% on exams!", colorAura: 'from-red-500 to-yellow-400' },
        { name: 'Nami', greetingQuote: 'Mapping out our 100% GPA study navigator!', colorAura: 'from-orange-500 to-amber-400' },
        { name: 'Nico Robin', greetingQuote: 'Uncovering history & ancient knowledge for our test!', colorAura: 'from-purple-600 to-indigo-500' },
        { name: 'Sanji', greetingQuote: 'Serving gourmet study energy for your exams, Mademoiselle!', colorAura: 'from-amber-400 to-yellow-300' },
        { name: 'Roronoa Zoro', greetingQuote: 'Three-Sword Style focus mode: Cut down all hard questions!', colorAura: 'from-emerald-600 to-green-500' }
      ]
    },
    {
      universe: 'Naruto Shippuden',
      icon: '🍥',
      characters: [
        { name: 'Naruto Uzumaki', greetingQuote: 'Believe it! Shadow Clone Jutsu for 100% study velocity!', colorAura: 'from-orange-500 to-yellow-400' },
        { name: 'Sasuke Uchiha', greetingQuote: 'Chidori focus mode: Ace all exam questions with ease!', colorAura: 'from-blue-600 to-indigo-500' },
        { name: 'Sakura Haruno', greetingQuote: 'Inner Sakura says: Study hard and crush this test!', colorAura: 'from-pink-500 to-rose-400' },
        { name: 'Kakashi Hatake', greetingQuote: 'Sharing-gan focus: Master all formulas in 5 minutes!', colorAura: 'from-slate-600 to-zinc-500' }
      ]
    },
    {
      universe: 'Dragon Ball Z',
      icon: '🐉',
      characters: [
        { name: 'Goku', greetingQuote: 'Kamehameha! Power up your study level over 9000!', colorAura: 'from-amber-500 to-orange-600' },
        { name: 'Vegeta', greetingQuote: 'Prince of all Saiyans demands 100% top marks!', colorAura: 'from-blue-600 to-cyan-500' }
      ]
    },
    {
      universe: 'Pokémon',
      icon: '⚡',
      characters: [
        { name: 'Pikachu', greetingQuote: 'Pika Pika! Electro-charge your exam preparation!', colorAura: 'from-yellow-400 to-amber-500' }
      ]
    },
    {
      universe: 'Shinchan',
      icon: '🎒',
      characters: [
        { name: 'Shinchan Nohara', greetingQuote: "Buri Buri Dance! Let's conquer Calculus!", colorAura: 'from-red-500 to-yellow-400' },
        { name: 'Toru Kazama', greetingQuote: 'My study schedule is 100% optimized for top marks!', colorAura: 'from-blue-600 to-indigo-500' },
        { name: 'Nene Sakurada (Nani)', greetingQuote: 'Real play study session starts now!', colorAura: 'from-pink-500 to-rose-400' },
        { name: 'Boo-chan', greetingQuote: 'Dropping knowledge bombs on the exam paper!', colorAura: 'from-emerald-500 to-green-400' },
        { name: 'Masao Sato (Mausao)', greetingQuote: 'I-I hope the exam isn\'t too hard!', colorAura: 'from-green-400 to-teal-400' },
        { name: 'Himawari Nohara', greetingQuote: 'Giggle! Shiny A+ grades for everyone!', colorAura: 'from-amber-400 to-yellow-300' }
      ]
    },
    {
      universe: 'Doraemon',
      icon: '🐱',
      characters: [
        { name: 'Nobita Nobi', greetingQuote: 'Doraemon! Help me finish this homework!', colorAura: 'from-yellow-400 to-orange-400' },
        { name: 'Shizuka Minamoto', greetingQuote: "Let's study together and get top grades!", colorAura: 'from-pink-400 to-rose-400' },
        { name: 'Doraemon', greetingQuote: 'Anywhere Door to 100% exam scores!', colorAura: 'from-blue-500 to-sky-300' },
        { name: 'Dorami', greetingQuote: 'I brought melon bread and study gadgets!', colorAura: 'from-amber-400 to-yellow-300' },
        { name: 'Sunio Honekawa', greetingQuote: 'My new study desk is imported from Paris!', colorAura: 'from-cyan-500 to-blue-400' },
        { name: 'Gian (Gein)', greetingQuote: 'My study velocity will shake the exam hall!', colorAura: 'from-orange-500 to-amber-600' }
      ]
    },
    {
      universe: 'Harry Potter',
      icon: '⚡',
      characters: [
        { name: 'Harry Potter', greetingQuote: 'Mischief Managed! Ready to ace exams today?', colorAura: 'from-amber-500 to-red-600' },
        { name: 'Hermione Granger', greetingQuote: "It's Levi-O-sa, not Levio-sa! Let's get 100%!", colorAura: 'from-purple-500 to-amber-500' },
        { name: 'Ron Weasley', greetingQuote: "Bloody hell! Let's finish this problem set!", colorAura: 'from-orange-600 to-red-500' },
        { name: 'Draco Malfoy', greetingQuote: 'My father will hear about how fast we study!', colorAura: 'from-emerald-600 to-teal-500' },
        { name: 'Hedwig', greetingQuote: 'Hoot hoot! Delivering A+ exam results!', colorAura: 'from-slate-200 to-sky-100' },
        { name: 'Cedric Diggory', greetingQuote: 'Hufflepuff Triwizard champion focus activated!', colorAura: 'from-yellow-500 to-amber-400' }
      ]
    }
  ];

  const getGoogleAvatar = (userEmail) => {
    if (!userEmail) return 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80';
    const cleanEmail = userEmail.trim().toLowerCase();
    return `https://unavatar.io/${cleanEmail}?fallback=https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80`;
  };

  const handleGoogleLogin = () => {
    const googleEmail = email.trim() || 'kritika.narayan@gmail.com';
    const googleName = name.trim() || 'Kritika S Narayan';
    const profilePic = getGoogleAvatar(googleEmail);

    onLogin({
      name: googleName,
      email: googleEmail,
      university,
      avatar: profilePic,
      fictionalCharacter: selectedCharacter
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    handleGoogleLogin();
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center p-4 sm:p-8 font-sans">
      <div className="w-full max-w-5xl glass-card p-8 sm:p-12 rounded-3xl border border-orange-200 shadow-2xl space-y-8 bg-[#FFFBF5]/90">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-900 border border-orange-200 text-xs font-extrabold font-mono">
            <Sun className="w-4 h-4 text-orange-500 animate-spin-slow" />
            ANIME & FICTIONAL COMPANION CREATOR
          </div>
          <h1 className="text-3xl font-black text-stone-900">Choose Your Waving Character Companion</h1>
          <p className="text-xs text-stone-500 font-medium">Select your favorite anime hero to stand & wave on your Home Page!</p>
        </div>

        {/* 1-Click Google Sign In Banner */}
        <div className="p-4 rounded-3xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-bold text-lg shadow-md">
              G
            </div>
            <div>
              <div className="text-xs font-black text-stone-900">Quick Google Account Sign-In</div>
              <div className="text-[10px] text-stone-500 font-mono">Syncs your real Google Profile Picture to sidebar</div>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-stone-900 text-white hover:bg-stone-800 transition-all text-xs font-extrabold flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <span>Continue with Google</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* User Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-stone-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Kritika S Narayan"
                className="w-full px-4 py-3 rounded-2xl glass-input text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-stone-700 mb-1">Google Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. kritika.narayan@gmail.com"
                className="w-full px-4 py-3 rounded-2xl glass-input text-xs font-bold"
              />
            </div>
          </div>

          {/* Fictional Character Selection Section */}
          <div className="space-y-4 pt-4 border-t border-stone-200">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-black uppercase text-stone-800 tracking-wider">
                👒 Select Character Companion (Standing & Waving 👋)
              </label>
              <span className="text-[10px] text-purple-700 font-mono font-bold">One Piece, Naruto, DBZ, Pokémon, Shinchan, Doraemon, Harry Potter</span>
            </div>

            {/* Franchise Tabs */}
            <div className="flex flex-wrap gap-2">
              {FICTIONAL_PRESETS.map((preset) => (
                <button
                  key={preset.universe}
                  type="button"
                  onClick={() => setSelectedUniverse(preset.universe)}
                  className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedUniverse === preset.universe
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-white text-stone-700 border border-stone-200 hover:bg-orange-50'
                  }`}
                >
                  <span>{preset.icon}</span>
                  <span>{preset.universe}</span>
                </button>
              ))}
            </div>

            {/* Character Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {FICTIONAL_PRESETS.find(p => p.universe === selectedUniverse)?.characters.map((char) => {
                const isSelected = selectedCharacter.name === char.name;
                return (
                  <div
                    key={char.name}
                    onClick={() => setSelectedCharacter({ ...char, universe: selectedUniverse })}
                    className={`p-4 rounded-3xl border-2 transition-all cursor-pointer space-y-3 flex flex-col items-center justify-between select-none ${
                      isSelected
                        ? 'border-orange-500 bg-orange-50/80 shadow-md scale-105'
                        : 'border-stone-200 bg-white hover:border-orange-300'
                    }`}
                  >
                    {/* Full-Body Standing Mascot Preview */}
                    <StandingCharacterMascot character={{ ...char, universe: selectedUniverse }} size="small" />

                    <p className="text-[10px] text-stone-600 font-medium italic text-center">
                      "{char.greetingQuote}"
                    </p>

                    {isSelected && (
                      <div className="px-3 py-1 rounded-full bg-orange-500 text-white text-[10px] font-extrabold flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>Selected Companion</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full btn-primary py-4 rounded-2xl text-sm font-black flex items-center justify-center gap-2 shadow-lg cursor-pointer"
          >
            <span>Complete Sign-In & Launch OS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
