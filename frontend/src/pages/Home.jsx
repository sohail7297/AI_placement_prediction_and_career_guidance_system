import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">

      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-20 right-20 w-72 h-72 bg-pink-600/20 blur-[120px] rounded-full"></div>

      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32">

        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
          AI Career Intelligence Platform
        </h1>

        <p className="text-xl text-gray-400 max-w-3xl mb-10">
          Predict your placement chances using AI,
          analyze your skills, and receive career guidance
          tailored to your profile.
        </p>

        <Link
          to="/predictor"
          className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 font-semibold text-lg hover:scale-105 transition"
        >
          Start Assessment 🚀
        </Link>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 pb-24">

        <h2 className="text-4xl font-bold text-center mb-14">
          Platform Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="
          bg-white/5
          backdrop-blur-lg
          border border-white/10
          rounded-3xl
          p-8
          hover:scale-105
          transition-all
          duration-300
          ">
            <h3 className="text-xl font-semibold mb-3">
              🎯 Placement Prediction
            </h3>

            <p className="text-gray-400">
              AI analyzes 29 student attributes and predicts placement chances.
            </p>
          </div>

          <div className="
          bg-white/5
          backdrop-blur-lg
          border border-white/10
          rounded-3xl
          p-8
          hover:scale-105
          transition-all
          duration-300
          ">
            <h3 className="text-xl font-semibold mb-3">
              📊 Skill Analysis
            </h3>

            <p className="text-gray-400">
              Understand strengths and areas needing improvement.
            </p>
          </div>

          <div className="
          bg-white/5
          backdrop-blur-lg
          border border-white/10
          rounded-3xl
          p-8
          hover:scale-105
          transition-all
          duration-300
          ">
            <h3 className="text-xl font-semibold mb-3">
              🚀 Career Guidance
            </h3>

            <p className="text-gray-400">
              Get recommendations based on your profile and skills.
            </p>
          </div>

          <div className="
          bg-white/5
          backdrop-blur-lg
          border border-white/10
          rounded-3xl
          p-8
          hover:scale-105
          transition-all
          duration-300
          ">
            <h3 className="text-xl font-semibold mb-3">
              💼 Industry Readiness
            </h3>

            <p className="text-gray-400">
              Evaluate your readiness for placements and hiring rounds.
            </p>
          </div>

        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-5xl mx-auto px-6 pb-24">

        <h2 className="text-4xl font-bold text-center mb-12">
          How It Works
        </h2>

        <div className="grid md:grid-cols-4 gap-6 text-center">

          <div className="bg-slate-900 p-6 rounded-xl">
            1️⃣ Enter Details
          </div>

          <div className="bg-slate-900 p-6 rounded-xl">
            2️⃣ AI Analysis
          </div>

          <div className="bg-slate-900 p-6 rounded-xl">
            3️⃣ Prediction
          </div>

          <div className="bg-slate-900 p-6 rounded-xl">
            4️⃣ Career Guidance
          </div>

        </div>
      </section>

    </div>
  );
}

export default Home;