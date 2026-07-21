import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Plus, 
  Trash2,
  Sun
} from 'lucide-react';

export default function ClassTimetable({ timetableData, onAddClass, onDeleteClass }) {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [showAddModal, setShowAddModal] = useState(false);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const [subject, setSubject] = useState('');
  const [time, setTime] = useState('09:00 AM - 10:30 AM');
  const [room, setRoom] = useState('Hall 302');
  const [instructor, setInstructor] = useState('Prof. R. Sharma');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject) return;
    onAddClass({
      id: 'c_' + Math.random().toString(36).substr(2, 9),
      day: selectedDay,
      subject: subject.trim(),
      time,
      room,
      instructor
    });
    setSubject('');
    setShowAddModal(false);
  };

  const dayClasses = timetableData.filter(c => c.day === selectedDay);

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-stone-900 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-orange-600" />
            Weekly Class Timetable & Schedule
          </h2>
          <p className="text-xs text-stone-500 font-medium mt-1">Organize class slots, lecture halls, and professor contact details</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Class Slot</span>
        </button>
      </div>

      {/* Day Selector Pills */}
      <div className="flex overflow-x-auto gap-2 p-2 glass-panel rounded-2xl border border-stone-200 shadow-sm scrollbar-none">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedDay === day
                ? 'bg-orange-500 text-white shadow-md'
                : 'bg-white text-stone-700 hover:bg-orange-50 border border-stone-200'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Classes Grid */}
      <div className="space-y-4">
        {dayClasses.length === 0 ? (
          <div className="glass-card p-12 text-center rounded-3xl border border-stone-200 text-stone-400 text-xs font-medium">
            No classes scheduled for {selectedDay}. Click "Add Class Slot" to add one!
          </div>
        ) : (
          dayClasses.map((c) => (
            <div
              key={c.id}
              className="glass-card p-6 rounded-3xl border border-stone-200 hover:border-orange-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-orange-100 text-orange-900 border border-orange-200 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-orange-600" />
                    {c.time}
                  </span>
                  <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-purple-100 text-purple-900 border border-purple-200 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-purple-600" />
                    {c.room}
                  </span>
                </div>

                <h3 className="text-lg font-black text-stone-900">{c.subject}</h3>

                <div className="text-xs text-stone-600 font-medium flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-stone-400" />
                  <span>Instructor: {c.instructor}</span>
                </div>
              </div>

              <button
                onClick={() => onDeleteClass(c.id)}
                className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-md p-6 rounded-3xl border border-orange-200 shadow-2xl space-y-5">
            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-600" />
              Add Class Slot for {selectedDay}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Subject Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Advanced Calculus"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Time Slot</label>
                <input
                  type="text"
                  placeholder="09:00 AM - 10:30 AM"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Room / Hall</label>
                  <input
                    type="text"
                    placeholder="Hall 302"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Instructor</label>
                  <input
                    type="text"
                    placeholder="Prof. R. Sharma"
                    value={instructor}
                    onChange={(e) => setInstructor(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn-secondary px-4 py-2 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-5 py-2 rounded-xl text-xs font-bold"
                >
                  Save Class Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
