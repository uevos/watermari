import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Droplets, RotateCcw, Plus, Minus } from "lucide-react";

const ME_IMG = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...";
const ELENA_IMG = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...";

export default function WaterDrinkerTracker() {
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
                <div className="rounded-3xl border-2 border-cyan-400 bg-slate-950 overflow-hidden h-44">
                  <img src={ME_IMG} alt="Start" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-5xl leading-none font-black text-cyan-400">{waterMl}</div>
                  <div className="text-lg font-bold text-cyan-300">ml</div>
                </div>
              </div>

              <div className="space-y-3 text-right">
                <div className={`rounded-3xl h-44 border-2 overflow-hidden flex items-center justify-center ${reachedGoal ? "border-cyan-400 bg-slate-950" : "border-dashed border-cyan-400/70 bg-slate-950/40"}`}>
                  {reachedGoal ? (
                    <motion.img
                      src={ELENA_IMG}
                      alt="Goal unlocked"
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
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
              <div className="relative h-4 rounded-full bg-slate-700 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-sky-400"
                  initial={false}
                  animate={{ width: `${progress * 100}%` }}
                />
              </div>
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
              <button onClick={() => add(250)} className="rounded-3xl bg-cyan-500 p-5 font-black text-2xl flex items-center justify-center gap-2">
                <Plus className="w-6 h-6" />250 ml
              </button>

              <button onClick={() => add(-250)} className="rounded-3xl bg-indigo-900 p-5 font-black text-2xl flex items-center justify-center gap-2">
                <Minus className="w-6 h-6" />250 ml
              </button>
            </div>

            <button onClick={() => setWaterMl(0)} className="w-full rounded-3xl bg-slate-800 p-4 text-xl font-black flex items-center justify-center gap-3">
              <RotateCcw className="w-7 h-7" /> RESET
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
