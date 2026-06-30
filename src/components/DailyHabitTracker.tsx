import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { Check, Plus, Trash2, Flame, Droplet, Moon, Footprints, PlusCircle, Sparkles, Trophy } from "lucide-react";

export interface DailyHabit {
  id: string;
  name: string;
  category: "water" | "steps" | "sleep" | "custom";
  target: string;
  completedDays: string[]; // Array of YYYY-MM-DD dates when completed
}

export default function DailyHabitTracker() {
  const { user } = useApp();
  const userId = user?.uid || "guest";
  const today = new Date().toISOString().split("T")[0];

  // Load habits from localStorage
  const [habits, setHabits] = useState<DailyHabit[]>(() => {
    try {
      const saved = localStorage.getItem(`fit_habits_${userId}`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Failed to parse habits, falling back to presets", e);
    }
    // Default presets
    return [
      {
        id: "preset-water",
        name: "Water Intake",
        category: "water",
        target: user?.waterGoal ? `${user.waterGoal} ML` : "2600 ML",
        completedDays: []
      },
      {
        id: "preset-steps",
        name: "Steps Goal",
        category: "steps",
        target: "10,000 Steps",
        completedDays: []
      },
      {
        id: "preset-sleep",
        name: "Sleep Hours",
        category: "sleep",
        target: "8 Hours",
        completedDays: []
      }
    ];
  });

  const [newHabitName, setNewHabitName] = useState("");
  const [newHabitTarget, setNewHabitTarget] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`fit_habits_${userId}`, JSON.stringify(habits));
    } catch (e) {
      console.warn("Failed to persist habits:", e);
    }
  }, [habits, userId]);

  // Handle toggle completion for today
  const toggleHabitForToday = (habitId: string) => {
    setHabits(prev =>
      prev.map(habit => {
        if (habit.id === habitId) {
          const isCompletedToday = habit.completedDays.includes(today);
          const updatedDays = isCompletedToday
            ? habit.completedDays.filter(d => d !== today)
            : [...habit.completedDays, today];
          return { ...habit, completedDays: updatedDays };
        }
        return habit;
      })
    );
  };

  // Add a new custom habit
  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;

    const newHabit: DailyHabit = {
      id: "habit-" + Math.random().toString(36).substring(7),
      name: newHabitName.trim(),
      category: "custom",
      target: newHabitTarget.trim() || "Daily",
      completedDays: []
    };

    setHabits(prev => [...prev, newHabit]);
    setNewHabitName("");
    setNewHabitTarget("");
    setShowAddForm(false);
  };

  // Delete custom habit
  const handleDeleteHabit = (id: string) => {
    setHabits(prev => prev.filter(h => h.id !== id));
  };

  // Calculate current completion streak for a habit
  const calculateStreak = (completedDays: string[]): number => {
    if (completedDays.length === 0) return 0;
    
    // Sort descending
    const sortedDates = [...completedDays].sort((a, b) => b.localeCompare(a));
    const todayDate = new Date(today);
    const yesterdayDate = new Date(today);
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterdayStr = yesterdayDate.toISOString().split("T")[0];

    // Check if habit is completed today or was completed yesterday to keep streak alive
    const hasCompletedToday = sortedDates.includes(today);
    const hasCompletedYesterday = sortedDates.includes(yesterdayStr);

    if (!hasCompletedToday && !hasCompletedYesterday) return 0;

    let streak = 0;
    let checkDate = hasCompletedToday ? todayDate : yesterdayDate;

    while (true) {
      const checkStr = checkDate.toISOString().split("T")[0];
      if (sortedDates.includes(checkStr)) {
        streak++;
        // Go to previous day
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  // Category Icons
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "water":
        return (
          <div className="h-8 w-8 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
            <Droplet className="w-4 h-4" />
          </div>
        );
      case "steps":
        return (
          <div className="h-8 w-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <Footprints className="w-4 h-4" />
          </div>
        );
      case "sleep":
        return (
          <div className="h-8 w-8 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
            <Moon className="w-4 h-4" />
          </div>
        );
      default:
        return (
          <div className="h-8 w-8 rounded-xl bg-slate-500/10 text-slate-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
        );
    }
  };

  const completedCount = habits.filter(h => h.completedDays.includes(today)).length;
  const totalCount = habits.length;
  const completionPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div id="daily-habit-tracker-container" className="bg-white dark:bg-slate-950 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-emerald-500" />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider font-mono flex items-center gap-1.5 border-b border-emerald-500/10 pb-0.5">
            <Trophy className="w-4 h-4 text-emerald-500" />
            Daily Habit Tracker
          </h3>
          <p className="text-[10px] text-slate-500 font-mono mt-0.5">Track your vital routines and check off completed goals</p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-mono uppercase bg-emerald-500 hover:bg-emerald-600 text-white transition shadow-sm font-bold self-start sm:self-auto"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          {showAddForm ? "Close Form" : "Add Custom Habit"}
        </button>
      </div>

      {/* Progress ring or bar */}
      <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-900/60 p-4 rounded-2xl mb-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">TODAY'S MOMENTUM:</span>
          <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight leading-tight mt-0.5">
            {completedCount} of {totalCount} Habits Checked
          </p>
        </div>
        <div className="w-full sm:w-1/2">
          <div className="flex justify-between text-[10px] font-mono text-slate-500 mb-1">
            <span>COMPLETION RATE</span>
            <span className="font-extrabold text-emerald-500">{completionPercent}%</span>
          </div>
          <div className="relative w-full h-3 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
            <div 
              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-500"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Habit Creation Form */}
      {showAddForm && (
        <form onSubmit={handleAddHabit} className="mb-5 p-4 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3">
          <div className="text-[11px] font-mono font-bold uppercase text-slate-700 dark:text-slate-300">
            Create Custom Fitness Habit
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Habit Name (e.g. Protein Shake)"
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
              className="px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full"
              maxLength={40}
              required
            />
            <input
              type="text"
              placeholder="Target Target (e.g. 150g, Daily)"
              value={newHabitTarget}
              onChange={(e) => setNewHabitTarget(e.target.value)}
              className="px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full"
              maxLength={30}
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 text-[10px] font-mono uppercase bg-slate-200 hover:bg-slate-300 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-[10px] font-mono uppercase bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition font-bold"
            >
              Save Habit
            </button>
          </div>
        </form>
      )}

      {/* Habits List */}
      <div className="space-y-3">
        {habits.map((habit) => {
          const isCompletedToday = habit.completedDays.includes(today);
          const streak = calculateStreak(habit.completedDays);

          return (
            <div
              key={habit.id}
              className={`p-3.5 rounded-2xl border flex items-center justify-between gap-4 transition-all duration-200 ${
                isCompletedToday
                  ? "bg-emerald-500/[0.02] border-emerald-500/20"
                  : "bg-slate-50/50 dark:bg-slate-900/10 border-slate-200 dark:border-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                {getCategoryIcon(habit.category)}
                <div className="text-left">
                  <span
                    className={`text-xs font-black uppercase font-sans tracking-tight block ${
                      isCompletedToday ? "text-emerald-500" : "text-slate-800 dark:text-slate-200"
                    }`}
                  >
                    {habit.name}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-mono text-slate-400">
                      Target: {habit.target}
                    </span>
                    {streak > 0 && (
                      <span className="flex items-center gap-0.5 text-[10px] font-mono font-bold text-orange-500">
                        <Flame className="w-3.5 h-3.5 fill-current" />
                        {streak}d Streak
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Delete button for custom habits */}
                {habit.category === "custom" && (
                  <button
                    onClick={() => handleDeleteHabit(habit.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition"
                    title="Delete Habit"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Checkbox button */}
                <button
                  type="button"
                  onClick={() => toggleHabitForToday(habit.id)}
                  className={`h-7 px-3 rounded-xl border flex items-center gap-1.5 transition text-[10px] font-mono uppercase font-black ${
                    isCompletedToday
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                      : "bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 border-slate-200 dark:border-slate-800 text-slate-500"
                  }`}
                >
                  {isCompletedToday ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3] text-emerald-500" />
                      Completed
                    </>
                  ) : (
                    "Mark Done"
                  )}
                </button>
              </div>
            </div>
          );
        })}

        {habits.length === 0 && (
          <div className="text-center p-8 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
            <p className="text-xs text-slate-500">No habits tracked. Click the button above to add custom daily targets!</p>
          </div>
        )}
      </div>
    </div>
  );
}
