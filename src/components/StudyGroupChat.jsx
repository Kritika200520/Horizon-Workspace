import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  Users, 
  Sparkles, 
  UserPlus, 
  Search, 
  Plus, 
  Check, 
  Circle, 
  Bot, 
  Smile, 
  X, 
  ShieldCheck,
  Globe
} from 'lucide-react';

const STORAGE_KEY_GROUPS = 'horizon_chat_groups_v2';
const STORAGE_KEY_CONTACTS = 'horizon_chat_contacts_v2';

const DEFAULT_DIRECTORY = [
  { id: 'dir_1', name: 'Alex Vance', email: 'alex.vance@stanford.edu', major: 'Computer Science', status: 'Online' },
  { id: 'dir_2', name: 'Sophia Chen', email: 'sophia.chen@stanford.edu', major: 'Mathematics & Quantum', status: 'Online' },
  { id: 'dir_3', name: 'Rahul Sharma', email: 'rahul.sharma@stanford.edu', major: 'Electrical Engineering', status: 'Offline' },
  { id: 'dir_4', name: 'Emily Watson', email: 'emily.watson@stanford.edu', major: 'Data Science', status: 'Online' },
  { id: 'dir_5', name: 'Marcus Brody', email: 'marcus.b@stanford.edu', major: 'Physics & Astronomy', status: 'Offline' },
  { id: 'dir_6', name: 'Elena Rostova', email: 'elena.r@stanford.edu', major: 'Biomedical Engineering', status: 'Online' }
];

const INITIAL_GROUPS = [
  {
    id: 'grp_1',
    name: 'Quantum Physics Study Squad',
    icon: '⚛️',
    description: 'Preparing for Chapter 5 Quantum Wave Mechanics Exam',
    isGroup: true,
    members: ['Kritika S. Narayan', 'Alex Vance', 'Sophia Chen', 'Horizon Study Bot'],
    messages: [
      { id: 1, sender: 'Alex Vance', text: 'Hey team! Are we reviewing Quantum Mechanics derivatives at 4 PM?', time: '1:15 PM', isAI: false },
      { id: 2, sender: 'Sophia Chen', text: 'Yes! I just posted my note flashcards for Chapter 5.', time: '1:18 PM', isAI: false },
      { id: 3, sender: 'Horizon Study Bot', text: '✨ Tip: Quantum Physics exam in 7 days. Focus 2 Pomodoro sprints on Wave Functions today!', time: '1:20 PM', isAI: true }
    ]
  },
  {
    id: 'grp_2',
    name: 'CS101 Algorithms & Data Structures',
    icon: '💻',
    description: 'Graph algorithms, Dynamic Programming & LeetCode practice',
    isGroup: true,
    members: ['Kritika S. Narayan', 'Emily Watson', 'Rahul Sharma', 'Horizon Study Bot'],
    messages: [
      { id: 1, sender: 'Emily Watson', text: 'Who wants to practice Dijkstra algorithm problems together?', time: '2:10 PM', isAI: false },
      { id: 2, sender: 'Horizon Study Bot', text: '💡 Horizon AI recommendation: Dijkstra has O((V + E) log V) complexity with a min-priority queue!', time: '2:12 PM', isAI: true }
    ]
  }
];

export default function StudyGroupChat({ user }) {
  const currentUser = user?.name || 'Guest Student';

  // Load Contacts & Groups from localStorage
  const [contacts, setContacts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONTACTS);
      return saved ? JSON.parse(saved) : DEFAULT_DIRECTORY.slice(0, 3);
    } catch {
      return DEFAULT_DIRECTORY.slice(0, 3);
    }
  });

  const [groups, setGroups] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_GROUPS);
      return saved ? JSON.parse(saved) : INITIAL_GROUPS;
    } catch {
      return INITIAL_GROUPS;
    }
  });

  const [activeChatId, setActiveChatId] = useState('grp_1');
  const [inputMsg, setInputMsg] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showAddPersonModal, setShowAddPersonModal] = useState(false);

  // New Group Form State
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupIcon, setNewGroupIcon] = useState('📚');
  const [selectedGroupMembers, setSelectedGroupMembers] = useState([]);

  // New Custom Person Form State
  const [newPersonName, setNewPersonName] = useState('');
  const [newPersonEmail, setNewPersonEmail] = useState('');
  const [newPersonMajor, setNewPersonMajor] = useState('');

  // Save changes & Real-Time Sync across tabs
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_GROUPS, JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY_GROUPS && e.newValue) {
        try { setGroups(JSON.parse(e.newValue)); } catch (err) {}
      }
      if (e.key === STORAGE_KEY_CONTACTS && e.newValue) {
        try { setContacts(JSON.parse(e.newValue)); } catch (err) {}
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const activeChat = groups.find(g => g.id === activeChatId) || groups[0];

  // Send Message Logic
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMsg.trim() || !activeChat) return;

    const userText = inputMsg.trim();
    const newMsg = {
      id: Date.now(),
      sender: currentUser,
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isAI: false
    };

    const updatedGroups = groups.map(g => {
      if (g.id === activeChat.id) {
        return { ...g, messages: [...g.messages, newMsg] };
      }
      return g;
    });

    setGroups(updatedGroups);
    setInputMsg('');

    // Trigger AI response if question or /ai mentioned
    if (userText.toLowerCase().includes('help') || userText.toLowerCase().includes('/ai') || userText.includes('?')) {
      setTimeout(() => {
        const aiMsg = {
          id: Date.now() + 1,
          sender: 'Horizon Study Bot',
          text: `✨ Study Assist: Got your note on "${userText.slice(0, 40)}...". Added to study summary & active recall queue!`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isAI: true
        };

        setGroups(prev => prev.map(g => {
          if (g.id === activeChat.id) {
            return { ...g, messages: [...g.messages, aiMsg] };
          }
          return g;
        }));
      }, 1000);
    }
  };

  // Add Contact from directory
  const handleAddContact = (person) => {
    if (contacts.some(c => c.id === person.id || c.email === person.email)) return;
    setContacts(prev => [...prev, person]);
  };

  // Add Custom Person manually
  const handleCreateCustomPerson = (e) => {
    e.preventDefault();
    if (!newPersonName.trim()) return;

    const newPerson = {
      id: 'custom_' + Date.now(),
      name: newPersonName.trim(),
      email: newPersonEmail.trim() || `${newPersonName.toLowerCase().replace(/\s+/g, '.')}@university.edu`,
      major: newPersonMajor.trim() || 'General Student',
      status: 'Online'
    };

    setContacts(prev => [...prev, newPerson]);
    setNewPersonName('');
    setNewPersonEmail('');
    setNewPersonMajor('');
    setShowAddPersonModal(false);
  };

  // Create Direct Chat with a contact
  const handleStartDirectChat = (contact) => {
    const existingDirect = groups.find(g => !g.isGroup && g.name === contact.name);
    if (existingDirect) {
      setActiveChatId(existingDirect.id);
      return;
    }

    const newDirect = {
      id: 'direct_' + Date.now(),
      name: contact.name,
      icon: '💬',
      description: `1-on-1 Direct Chat with ${contact.name}`,
      isGroup: false,
      members: [currentUser, contact.name],
      messages: [
        { id: 1, sender: contact.name, text: `Hey ${currentUser}! Let's study together.`, time: 'Just now', isAI: false }
      ]
    };

    setGroups(prev => [newDirect, ...prev]);
    setActiveChatId(newDirect.id);
  };

  // Create Group Chat Submit
  const handleCreateGroupSubmit = (e) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;

    const memberNames = [currentUser, ...selectedGroupMembers, 'Horizon Study Bot'];
    const newGroup = {
      id: 'grp_' + Date.now(),
      name: newGroupName.trim(),
      icon: newGroupIcon,
      description: `Study Group with ${memberNames.length} members`,
      isGroup: true,
      members: memberNames,
      messages: [
        { id: 1, sender: 'Horizon Study Bot', text: `🎉 Welcome to "${newGroupName.trim()}"! Start sharing notes, flashcards, and exam questions here.`, time: 'Just now', isAI: true }
      ]
    };

    setGroups(prev => [newGroup, ...prev]);
    setActiveChatId(newGroup.id);
    setNewGroupName('');
    setSelectedGroupMembers([]);
    setShowCreateGroupModal(false);
  };

  // Directory search filter
  const directoryResults = DEFAULT_DIRECTORY.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.major.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-stone-900 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-orange-600" />
            Classmates Search, Direct Chat & Group Creator
          </h2>
          <p className="text-xs text-stone-500 font-medium mt-1">Search classmates, start 1-on-1 direct messages, or launch study group rooms with Horizon AI</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddPersonModal(true)}
            className="px-4 py-2 rounded-2xl bg-white border border-stone-200 text-stone-800 hover:bg-stone-50 transition-all text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <UserPlus className="w-4 h-4 text-orange-500" />
            <span>Search & Add People</span>
          </button>

          <button
            onClick={() => setShowCreateGroupModal(true)}
            className="px-4 py-2 rounded-2xl bg-orange-500 text-white hover:bg-orange-600 transition-all text-xs font-black flex items-center gap-2 shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Group Chat</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Sidebar: Groups & Contacts List */}
        <div className="lg:col-span-4 glass-card p-5 rounded-3xl border border-stone-200 space-y-6 shadow-sm bg-white/80">
          
          {/* Search Classmates Directory */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-stone-400" />
              <input
                type="text"
                placeholder="Search classmates by name, email, major..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-input text-xs font-medium"
              />
            </div>

            {/* Live Search Results Popup if Searching */}
            {searchQuery.trim().length > 0 && (
              <div className="p-3 rounded-2xl bg-orange-50 border border-orange-200 space-y-2 max-h-56 overflow-y-auto">
                <div className="text-[10px] font-black uppercase tracking-wide text-orange-900">
                  Directory Results ({directoryResults.length})
                </div>
                {directoryResults.map(person => {
                  const isAdded = contacts.some(c => c.id === person.id || c.email === person.email);
                  return (
                    <div key={person.id} className="p-2 rounded-xl bg-white border border-stone-200 flex items-center justify-between gap-2 shadow-xs">
                      <div>
                        <div className="text-xs font-bold text-stone-900">{person.name}</div>
                        <div className="text-[10px] text-stone-500">{person.email} • {person.major}</div>
                      </div>
                      {isAdded ? (
                        <button
                          onClick={() => handleStartDirectChat(person)}
                          className="px-2.5 py-1 rounded-xl bg-orange-100 text-orange-900 text-[10px] font-bold"
                        >
                          Chat
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAddContact(person)}
                          className="px-2.5 py-1 rounded-xl bg-orange-500 text-white text-[10px] font-bold flex items-center gap-1"
                        >
                          <UserPlus className="w-3 h-3" />
                          <span>Add</span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Group Chats Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-orange-600" />
                Study Group Rooms
              </h3>
              <span className="text-[10px] font-bold text-orange-600 font-mono">{groups.filter(g => g.isGroup).length} Active</span>
            </div>

            <div className="space-y-2">
              {groups.filter(g => g.isGroup).map(grp => {
                const isActive = activeChatId === grp.id;
                return (
                  <div
                    key={grp.id}
                    onClick={() => setActiveChatId(grp.id)}
                    className={`p-3 rounded-2xl transition-all cursor-pointer flex items-center justify-between gap-3 border ${
                      isActive 
                        ? 'bg-orange-50 border-orange-400 shadow-sm' 
                        : 'bg-white border-stone-200 hover:border-orange-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center text-lg shadow-xs">
                        {grp.icon}
                      </div>
                      <div>
                        <div className="text-xs font-black text-stone-900">{grp.name}</div>
                        <div className="text-[10px] text-stone-500 line-clamp-1">{grp.description}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-stone-400">{grp.members.length} members</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Direct Messages Contacts Section */}
          <div className="space-y-3 pt-4 border-t border-stone-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-purple-600" />
                Direct 1-on-1 Messages
              </h3>
              <span className="text-[10px] font-bold text-purple-600 font-mono">{contacts.length} Friends</span>
            </div>

            <div className="space-y-2">
              {contacts.map(c => {
                const directGroup = groups.find(g => !g.isGroup && g.name === c.name);
                const isActive = activeChatId === directGroup?.id;

                return (
                  <div
                    key={c.id}
                    onClick={() => handleStartDirectChat(c)}
                    className={`p-2.5 rounded-2xl transition-all cursor-pointer flex items-center justify-between border ${
                      isActive 
                        ? 'bg-purple-50 border-purple-400 shadow-sm' 
                        : 'bg-white border-stone-200 hover:border-purple-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-900 flex items-center justify-center font-bold text-xs border border-purple-200">
                        {c.name[0]}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-stone-900">{c.name}</div>
                        <div className="text-[10px] text-stone-500 font-mono">{c.major || 'Classmate'}</div>
                      </div>
                    </div>
                    <Circle className="w-2.5 h-2.5 fill-emerald-500 text-emerald-500" />
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Active Chat Window */}
        <div className="lg:col-span-8 glass-card p-6 rounded-3xl border border-stone-200 flex flex-col justify-between min-h-[520px] shadow-sm bg-white/90">
          
          {/* Chat Window Header */}
          {activeChat && (
            <div className="pb-4 border-b border-stone-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-orange-100 flex items-center justify-center text-xl shadow-xs border border-orange-200">
                  {activeChat.icon || '💬'}
                </div>
                <div>
                  <h3 className="text-base font-black text-stone-900">{activeChat.name}</h3>
                  <div className="text-[11px] text-stone-500 font-medium flex items-center gap-2">
                    <span>{activeChat.isGroup ? `${activeChat.members?.length} Members` : '1-on-1 Direct Chat'}</span>
                    <span>•</span>
                    <span className="text-emerald-600 font-mono font-bold flex items-center gap-1">
                      <Circle className="w-2 h-2 fill-emerald-500" /> Active Sync
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-3 py-1.5 rounded-2xl bg-purple-50 border border-purple-200 text-purple-900 text-xs font-bold flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-purple-600 animate-bounce" />
                <span>Horizon AI Buddy Active</span>
              </div>
            </div>
          )}

          {/* Messages Feed */}
          <div className="my-4 space-y-4 max-h-[380px] overflow-y-auto pr-2">
            {activeChat?.messages?.map((msg) => {
              const isMe = msg.sender === currentUser;
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-2 text-[10px] text-stone-400 font-mono mb-1">
                    <span className="font-bold text-stone-600">{msg.sender}</span>
                    <span>•</span>
                    <span>{msg.time}</span>
                  </div>

                  <div
                    className={`p-3.5 rounded-2xl text-xs max-w-lg leading-relaxed ${
                      msg.isAI
                        ? 'bg-purple-100 text-purple-950 border border-purple-300 font-medium shadow-xs'
                        : isMe
                        ? 'bg-orange-500 text-white font-semibold shadow-xs'
                        : 'bg-stone-100 text-stone-800 border border-stone-200 font-medium'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="pt-4 border-t border-stone-200 flex gap-3 items-center">
            <input
              type="text"
              placeholder={`Message ${activeChat?.name}... (type /ai to ask Horizon AI)`}
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              className="flex-1 px-4 py-3 rounded-2xl glass-input text-xs font-medium"
            />
            <button
              type="submit"
              className="btn-primary px-6 py-3 rounded-2xl text-xs font-black flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </form>

        </div>

      </div>

      {/* CREATE GROUP CHAT MODAL */}
      {showCreateGroupModal && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="text-lg font-black text-stone-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-500" />
                Create New Study Group Chat
              </h3>
              <button onClick={() => setShowCreateGroupModal(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateGroupSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-stone-700 mb-1">Group Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Stanford Quantum Study Squad, CS101 Prep"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl glass-input text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-stone-700 mb-1">Choose Group Emoji Icon</label>
                <div className="flex gap-2">
                  {['📚', '⚛️', '⚡', '🎒', '💻', '🧠', '🎯', '🔥'].map(icon => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setNewGroupIcon(icon)}
                      className={`w-9 h-9 rounded-2xl text-lg flex items-center justify-center border ${
                        newGroupIcon === icon ? 'bg-orange-500 text-white border-orange-500' : 'bg-stone-50 border-stone-200'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-stone-700 mb-2">Select Contacts to Add</label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {contacts.map(contact => {
                    const isChecked = selectedGroupMembers.includes(contact.name);
                    return (
                      <label key={contact.id} className="p-3 rounded-2xl border border-stone-200 flex items-center justify-between cursor-pointer hover:bg-stone-50">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedGroupMembers(prev => [...prev, contact.name]);
                              } else {
                                setSelectedGroupMembers(prev => prev.filter(m => m !== contact.name));
                              }
                            }}
                            className="w-4 h-4 text-orange-500 rounded"
                          />
                          <div>
                            <div className="text-xs font-bold text-stone-900">{contact.name}</div>
                            <div className="text-[10px] text-stone-500">{contact.email}</div>
                          </div>
                        </div>
                        {isChecked && <Check className="w-4 h-4 text-orange-500" />}
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateGroupModal(false)}
                  className="px-5 py-2.5 rounded-2xl border border-stone-200 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-6 py-2.5 rounded-2xl text-xs font-black shadow-md"
                >
                  Create Group Chat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD PERSON MODAL */}
      {showAddPersonModal && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="text-lg font-black text-stone-900 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-orange-500" />
                Add Classmate or Friend
              </h3>
              <button onClick={() => setShowAddPersonModal(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomPerson} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-stone-700 mb-1">Classmate Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. David Kim, Elena Rostova"
                  value={newPersonName}
                  onChange={(e) => setNewPersonName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl glass-input text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-stone-700 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. david.kim@stanford.edu"
                  value={newPersonEmail}
                  onChange={(e) => setNewPersonEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl glass-input text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-stone-700 mb-1">Major / Course</label>
                <input
                  type="text"
                  placeholder="e.g. Physics, Computer Science"
                  value={newPersonMajor}
                  onChange={(e) => setNewPersonMajor(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl glass-input text-xs font-bold"
                />
              </div>

              <div className="pt-4 border-t border-stone-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddPersonModal(false)}
                  className="px-5 py-2.5 rounded-2xl border border-stone-200 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-6 py-2.5 rounded-2xl text-xs font-black shadow-md"
                >
                  Add Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
