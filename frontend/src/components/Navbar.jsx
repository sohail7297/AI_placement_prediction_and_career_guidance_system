import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-5 backdrop-blur-md border-b border-purple-500/20">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        AI Career Intelligence
      </h1>

      <div className="flex gap-8">
        <Link
          to="/"
          className="hover:text-purple-400 transition"
        >
          Home
        </Link>

        <Link
          to="/predictor"
          className="hover:text-purple-400 transition"
        >
          Predictor
        </Link>
        <button className="px-4 py-2 rounded-xl bg-white/10">
         🌙
        </button>
      </div>
    </nav>
  );
}

export default Navbar;