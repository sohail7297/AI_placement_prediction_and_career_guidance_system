import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, Sparkles } from "lucide-react";

function Hero() {
  return (
    <section className="relative overflow-hidden">

      <div className="max-w-7xl mx-auto min-h-screen px-6 flex flex-col lg:flex-row items-center justify-between">

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
          className="flex-1"
        >

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-8">

            <Sparkles size={18} className="text-cyan-400"/>

            <span className="text-cyan-300 text-sm">

              AI Powered Career Platform

            </span>

          </div>

          <h1 className="text-6xl lg:text-7xl font-black leading-tight">

            Build Your

            <br />

            <span className="bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 bg-clip-text text-transparent">

              Dream Career

            </span>

          </h1>

          <p className="mt-8 text-slate-400 text-xl max-w-xl leading-9">

            Predict placement chances, analyse your resume,
            prepare for interviews and receive AI powered
            career guidance in one intelligent platform.

          </p>

          <div className="mt-10 flex flex-wrap gap-5">

            <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 font-semibold flex items-center gap-3 hover:scale-105 duration-300">

              Start Assessment

              <ArrowRight size={20}/>

            </button>

            <button className="px-8 py-4 rounded-xl border border-slate-700 hover:border-cyan-500 duration-300">

              Explore Dashboard

            </button>

          </div>

          <div className="mt-10 flex items-center gap-6">

            <div>

              <h2 className="text-3xl font-bold text-cyan-400">

                95%

              </h2>

              <p className="text-slate-400">

                Prediction Accuracy

              </p>

            </div>

            <div>

              <h2 className="text-3xl font-bold text-violet-400">

                10K+

              </h2>

              <p className="text-slate-400">

                Students

              </p>

            </div>

            <div>

              <h2 className="text-3xl font-bold text-pink-400">

                50+

              </h2>

              <p className="text-slate-400">

                Recruiters

              </p>

            </div>

          </div>

        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity:0, scale:.8 }}
          animate={{ opacity:1, scale:1 }}
          transition={{ duration:1 }}
          className="flex-1 flex justify-center mt-20 lg:mt-0"
        >

          <div className="relative">

            <div className="absolute inset-0 rounded-full blur-3xl bg-gradient-to-r from-cyan-500 via-violet-600 to-pink-500 opacity-30 animate-pulse"/>

            <div className="relative w-[420px] h-[420px] rounded-full border border-cyan-500/30 bg-slate-900/60 backdrop-blur-xl flex items-center justify-center">

              <BrainCircuit
                size={180}
                className="text-cyan-400"
              />

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default Hero;