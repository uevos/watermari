import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Plus, Minus } from "lucide-react";

const ME_IMG = "/me.jpeg";
const ELENA_IMG = "/elena.png";

export default function App() {
  const goalMl = 2000;
  const [waterMl, setWaterMl] = useState(0);

  const progress = Math.min(waterMl / goalMl, 1);
  const remaining = Math.max(goalMl - waterMl, 0);
  const reachedGoal = progress >= 1;

  const status = useMemo(() => {
    if (reachedGoal) return "Goal reached. Elena unlocked.";
    if (progress >= 0.75) return "Almost there. Final stretch.";
    if (progress >= 0.5) return "Halfway. Keep going.";
    if (progress > 0) return "Good start. Add another glass.";
    return "Start at zero. First glass.";
  }, [progress, reachedGoal]);

  const add = (ml) => setWaterMl((v) => Math.max(0, Math.min(goalMl, v + ml)));

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#0b2748_0%,#020617_42%,#000_100%)] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-[2rem] bg-slate-950/95 shadow-2xl border border-slate-700/70 overflow-hidden">
        <div className="px-6 pt-7 pb-5 text-center">
          <h1 className="text-4xl font-black tracking-tight flex items-center justify-center gap-3">
            <span>💧</span>
            <span>WATER TRACKER</span>
            <span>💧</span>
          </h1>
          <p className="mt-2 text-slate-300 text-base">Stay hydrated, stay alive for court.</p>
        </div>

        <div className="px-5 pb-5 space-y-5">
          <section className="rounded-[2rem] border border-slate-700/80 bg-slate-900/60 shadow-inner p-4">
            <div className="grid grid-cols-2 gap-5 items-start">
              <div className="space-y-3">
                <div className="rounded-3xl border-2 border-cyan-400 bg-slate-950 overflow-hidden shadow-[0_0_24px_rgba(34,211,238,0.20)] h-44">
                  <img src={ME_IMG} alt="Start" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-5xl leading-none font-black text-cyan-400">{waterMl}</div>
                  <div className="text-lg font-bold text-cyan-300">ml</div>
                  <div className="text-xs uppercase tracking-widest text-slate-400 font-bold">Current</div>
                </div>
              </div>

              <div className="space-y-3 text-right">
                <div className={`rounded-3xl h-44 border-2 overflow-hidden flex items-center justify-center transition-all ${reachedGoal ? "border-cyan-400 bg-slate-950 shadow-[0_0_28px_rgba(34,211,238,0.30)]" : "border-dashed border-cyan-400/70 bg-slate-950/40"}`}>
                  {reachedGoal ? (
                    <motion.img
                      src={ELENA_IMG}
                      alt="Goal unlocked"
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 0.86 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 140, damping: 14 }}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <div className="text-6xl">🔒</div>
                      <div className="mt-2 text-xs uppercase tracking-widest">Locked</div>
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-5xl leading-none font-black text-white">2 L</div>
                  <div className="text-xs uppercase tracking-widest text-slate-400 font-bold">Goal</div>
                </div>
              </div>
            </div>

            <div className="relative mt-5 px-4 pt-7 pb-8">
              <div className="absolute left-4 right-4 top-2 flex justify-between text-sm text-slate-300 font-semibold">
                <span>0</span>
                <span>0.5 L</span>
                <span>1 L</span>
                <span>1.5 L</span>
                <span className="text-cyan-400">2 L</span>
              </div>

              <div className="relative h-4 rounded-full bg-slate-700 overflow-hidden shadow-inner">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-sky-400 shadow-[0_0_18px_rgba(56,189,248,0.65)]"
                  initial={false}
                  animate={{ width: `${progress * 100}%` }}
                  transition={{ type: "spring", stiffness: 130, damping: 18 }}
                />
              </div>

              <motion.div
                className="absolute top-[32px] w-9 h-9 -ml-4 rounded-full border-4 border-cyan-300 bg-slate-900 shadow-[0_0_18px_rgba(56,189,248,0.7)]"
                initial={false}
                animate={{ left: `calc(16px + ${progress} * (100% - 32px))` }}
                transition={{ type: "spring", stiffness: 130, damping: 18 }}
              />
            </div>

            <div className="mx-auto mt-1 w-fit rounded-3xl border border-slate-700 bg-slate-950/70 px-5 py-3 text-center">
              <p className="text-base font-semibold">💧 You’ve drunk <span className="text-cyan-400">{waterMl} ml</span></p>
              <p className="mt-1 text-xs text-slate-400">Remaining: {(remaining / 1000).toFixed(2)} L</p>
            </div>

            <p className="mt-4 text-center text-sm text-slate-300">{status}</p>
          </section>

          <section className="rounded-[2rem] border border-slate-700/80 bg-slate-900/60 p-4 space-y-4">
            <h2 className="text-center text-xl font-black tracking-wide">ADD / REMOVE WATER</h2>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => add(250)} className="rounded-3xl bg-gradient-to-br from-cyan-400 to-sky-600 text-white active:scale-95 transition p-5 font-black text-2xl shadow-lg flex items-center justify-center gap-2">
                <Plus className="w-6 h-6" />250 ml
              </button>
              <button onClick={() => add(-250)} className="rounded-3xl bg-gradient-to-br from-blue-800 to-indigo-950 text-white active:scale-95 transition p-5 font-black text-2xl shadow-lg flex items-center justify-center gap-2">
                <Minus className="w-6 h-6" />250 ml
              </button>
            </div>
            <button onClick={() => setWaterMl(0)} className="w-full rounded-3xl bg-slate-800 hover:bg-slate-700 active:scale-95 transition p-4 text-xl font-black flex items-center justify-center gap-3">
              <RotateCcw className="w-7 h-7" /> RESET
            </button>
          </section>

          <section className="rounded-[2rem] border border-slate-700/80 bg-slate-900/60 p-5 flex gap-4 items-center">
            <div className="text-5xl">🥤</div>
            <div>
              <p className="text-cyan-400 font-black">TIP</p>
              <p className="text-sm text-slate-300">Drink water regularly throughout the day. Elena unlocks only at 2 litres.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
