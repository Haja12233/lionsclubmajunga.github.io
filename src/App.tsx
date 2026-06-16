import { useState, useEffect } from "react";
import Header from "./components/Header";
import MainSections from "./components/MainSections";
import Actions from "./components/Actions";
import News from "./components/News";
import JoinForm from "./components/JoinForm";
import Footer from "./components/Footer";
import DonateModal from "./components/DonateModal";
import { Heart, Sparkles, Send, MapPin, Phone, Mail, Award } from "lucide-react";

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Lazy initial state lookup
    return typeof window !== "undefined" && localStorage.getItem("theme") === "dark";
  });

  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [selectedActionId, setSelectedActionId] = useState<string | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleOpenDonate = () => {
    setIsDonateOpen(true);
  };

  const handleSelectAction = (id: string) => {
    setSelectedActionId(id);
  };

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors duration-300 ${
      darkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
    }`}>
      {/* Sticky Top Header Navigation */}
      <Header
        onOpenDonate={handleOpenDonate}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Sections: Hero, Mot du Président, Stats, Galerie, Partenaires, Témoignages */}
      <main className="relative">
        <MainSections
          onOpenDonate={handleOpenDonate}
          onSelectAction={handleSelectAction}
          darkMode={darkMode}
        />

        {/* Action cards + Detailed stories popup */}
        <Actions
          onOpenDonate={handleOpenDonate}
          selectedActionId={selectedActionId}
          resetSelectedAction={() => setSelectedActionId(null)}
          onSelectAction={handleSelectAction}
          darkMode={darkMode}
        />

        {/* Actualités (6 cards dynamic blog mockup + newsletter subscription) */}
        <News darkMode={darkMode} />

        {/* Section Nous Rejoindre (Information and candidates recruitment wizard form) */}
        <section id="rejoindre" className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold text-lions-blue dark:text-lions-gold uppercase tracking-widest bg-lions-blue/5 dark:bg-white/5 px-3 py-1 rounded-full w-fit mx-auto block">
                Nous Rejoindre
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight text-slate-905 dark:text-white">
                Faire Partie du Mouvement
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-sans">
                Chaque Lions actif apporte ses idées, sa bienveillance et ses compétences. Rejoignez la grande aventure de la solidarité.
              </p>
            </div>

            <JoinForm />
          </div>
        </section>
      </main>

      {/* Complete Footer Section with address/phone/email/credits */}
      <Footer darkMode={darkMode} />

      {/* Immersive Donation Simulator Modal */}
      <DonateModal
        isOpen={isDonateOpen}
        onClose={() => setIsDonateOpen(false)}
      />
    </div>
  );
}

