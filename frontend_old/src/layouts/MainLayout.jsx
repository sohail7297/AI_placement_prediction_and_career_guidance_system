import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      <main className="pt-24">

        {children}

      </main>

      <Footer />

    </div>
  );
}

export default MainLayout;